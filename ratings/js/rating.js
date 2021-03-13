window.onload = function(){
  //This creates an event on loading .xls
  document.getElementById('upload').addEventListener('change', handleFileSelect, false);
}


const main = function(){
  let classNames = ['year', 'title', 'director', 'title-type', 'genres', 'my-rating', 'imdb-raiting', 'runtime'];
  let objKeynames = ['Year', 'Original Title', 'Directors', 'Title Type', 'Genres', 'Your Rating', 'IMDb Rating', 'Runtime (mins)'];
  console.log(importString[0]);
  let tableRoot = document.getElementById('table');
  let tableSize = importString[0].length;
  for (let i = 0; i < tableSize; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < 8; j++) {
      let cell = document.createElement('td');
      cell.textContent = importString[0][i][objKeynames[j]];
      row.appendChild(cell);
      tableRoot.appendChild(row);
    }
  }
  document.getElementById('amount').innerHTML = tableRoot.querySelectorAll('tr').length;
};