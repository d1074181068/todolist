const add_btn = document.querySelector('.add-list');
const input_txt = document.querySelector('.txtinput');
const list = document.querySelector('.all-list');
const multi_del = document.querySelector('.multi-del');

add_btn.addEventListener('click', function () {
  add_li();
});
input_txt.addEventListener('keypress', function (event) {
  if (event.which == 13) {
    add_li();
  }
});
list.addEventListener('click', function (event) {
  check_checkbox(event);
});
multi_del.addEventListener('click', function () {
  const checkbox = document.querySelectorAll('.todo-check');
  checkbox.forEach(function (item) {
    if (item.checked == true) {
      item.parentNode.remove();
      multi_del.classList.remove('block');
    }
  });
});

function add_li() {
  if (input_txt.value == '') {
    alert('內容不可為空 !');
    return;
  }
  const todo_li = document.createElement('li');
  todo_li.classList.add('todo');
  todo_li.innerHTML = `
  <input type="checkbox" class="todo-check">
  <span class="item">${input_txt.value}</span>
  <button class="delete">
    <i class="fas fa-times"></i>
  </button>`;
  list.appendChild(todo_li);
  input_txt.value = '';
}
let check_count = 0;
function check_checkbox(event) {
  const target = event.target;
  if (target.classList.contains('fa-times')) {
    target.parentNode.parentNode.remove();
    /*這邊我是做單一刪除的，我的叉叉是用fontawesome引入的，當點擊到list清單的時候 
        如果event目前的target class包含fontawesome的那個class的時候就做刪除 */
  } else if (target.classList.contains('todo-check')) {
    if (multi_del.getAttribute('class') == 'multi-del') {
      multi_del.classList.add('block');
    }
    /* 我自己的寫法，助教建議在做這個checkbox檢查時，不要用foreach做
        const checkbox = document.querySelectorAll(".todo-check");
        
        checkbox.forEach(function(item) {
            if (item.checked == true) {
                check_count += 1;
            }
        });
        if (check_count == 0) {
            multi_del.classList.remove("block");
        } */

    //助教的寫法 V V V V
    if (target.checked) {
      check_count += 1;
      console.log(check_count);
    } else {
      check_count -= 1;
      console.log(check_count);
    }

    if (check_count === 0) {
      multi_del.classList.remove('block');
    } else if (!multi_del.classList.contains('block')) {
      multi_del.classList.add('block');
    }
  }
}
