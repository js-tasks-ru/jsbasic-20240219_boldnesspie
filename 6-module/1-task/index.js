/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    this.elem.innerHTML = `<thead><tr>
                            <th>Имя</th>
                            <th>Возраст</th>
                            <th>Зарплата</th>
                            <th>Город</th>
                            <th></th>
                           </tr></thead>`;

    this.rows = rows.map(user => {
      let row = document.createElement('tr');
      for (let key in user) {
        row.insertAdjacentHTML('beforeend', `<td>${user[key]}</td>`)
      }

      row.insertAdjacentHTML('beforeend', `<td><button>X</button></td>`);
      return row;
    })
    
    let tbody = document.createElement('tbody');
    tbody.append(...this.rows);
    this.elem.append(tbody);

    this.elem.addEventListener('click', event => {
      let target = event.target;
      if(target.tagName === 'BUTTON') target.closest('tr').remove();
    });
  }
}
