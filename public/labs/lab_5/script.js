function mapInit() {
  const mymap = L.map('mapid').setView([38.9897, -76.9378], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibGluZHNleWNhc3RpbiIsImEiOiJja202bGExYnMwcDV5Mm5wbXNwdndhbDF1In0.4r8JF2fpYCZiWrwVFu7X_g'
  }).addTo(mymap);
  console.log('mymap', mymap)
  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
          
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  //console.log('window loaded');//
  const form = document.querySelector('.userform');
  const search = document.querySelector('#zip');
  const targetList = document.querySelector('.target-list');

  const request = await fetch('/api');
  const data = await request.json();

  console.table(data);

  search.addEventListener('input', (event) => {
      event.preventDefault();
      console.log('input detected', search.value);
      const display = data.filter((record) => record.zip === search.value);
      const topfive = display.slice(0,5)
      topfive.forEach((row) => {
          
          const appendItem = document.createElement("li");
          appendItem.classList.add('block')
          appendItem.classList.add('list-item');
          appendItem.innerHTML = row.category + ' - ' + row.name + ' - ' + row.city + ', ' + row.zip;
          targetList.append(appendItem);
      
      });
      
      console.log('input', event.target.value);
  });

}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);

}
window.onload = windowActions;

 