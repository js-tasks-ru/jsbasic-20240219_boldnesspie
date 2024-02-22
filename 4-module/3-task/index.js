function highlight(table) {
  const rows = table.querySelectorAll('tbody tr');
  
  for(let row of rows) {
    let cells = row.cells;

    for(let i = 1; i < cells.length; i++) {
      let currentTd = cells[i];
      let currentRow = currentTd.parentElement;

      if( i === 1) {
        if (Number(currentTd.textContent) < 18) {
          currentRow.style.textDecoration = 'line-through';
        }
      }

      if (i === 2) {
        if (currentTd.textContent === 'm') {
          currentRow.classList.add('male')
          
        } else {
          currentRow.classList.add('female');
        } 
      }

      if(i === 3) {
        if (currentTd.dataset.available === 'true') {
          currentRow.classList.add('available') 

        } else if (currentTd.dataset.available === 'false') {
            currentRow.classList.add('unavailable')

        } else {
          currentRow.hidden = true;
        }
      }
    }
  }
}
