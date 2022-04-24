let todo_isdo = [];
let todo_notdo = [];
const todo_input = document.querySelector('.todo-input');
const btn = document.querySelector('.btn_add');
const list = document.querySelector('.list');
const item_span = document.querySelector('.list_footer > p');
const tab = document.querySelector('.tab');
const tab_li = document.querySelectorAll('.tab > li');
const delete_complete = document.querySelector('.list_footer > a');
// const todo_item = document.querySelector('.todo');
btn.addEventListener('click', () => {
  add_todo();
});
todo_input.addEventListener('keypress', (event) => {
  if (event.which == '13') {
    add_todo();
  }
});

list.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('delete')) {
    del_todo(event);
    if (tab_li[0].classList.contains('active')) {
      renderall();
    } else if (tab_li[1].classList.contains('active')) {
      render_notdo();
    } else if (tab_li[2].classList.contains('active')) {
      render_isdo();
    }
  } else if (target.classList.contains('check')) {
    if (target.checked) {
      ischecked(event);
    } else {
      notchecked(event);
    }

    item_span.textContent = `${todo_notdo.length} 個待完成項目`;
  }
});

delete_complete.addEventListener('click', () => {
  todo_isdo.splice(0, todo_isdo.length);
  renderall();
});

function ischecked(event) {
  const target = event.target;
  let todo_txt = target.nextSibling.nextSibling.textContent;
  todo_notdo.forEach((item, index) => {
    if (item.content == todo_txt) {
      item.isdo == true;
      todo_isdo.push(item);
      todo_notdo.splice(index, 1);
    }
  });
}
function notchecked(event) {
  const target = event.target;
  let todo_txt = target.nextSibling.nextSibling.textContent;
  todo_isdo.forEach((item, index) => {
    if (item.content == todo_txt) {
      item.isdo == false;
      todo_notdo.push(item);
      todo_isdo.splice(index, 1);
    }
  });
}
/* function do_or_not() {
  todo_isdo = todo.filter((item) => {
    return item.isdo == true;
  });
  todo_notdo = todo.filter((item) => {
    return item.isdo == false;
  });
} */
function add_todo() {
  const isdo_repeat = todo_isdo.some((item) => {
    return item.content == todo_input.value;
  });
  const notdo_repeat = todo_notdo.some((item) => {
    return item.content == todo_input.value;
  });
  if (todo_input.value == '') {
    alert('你的待辦事項還未填寫 !');
    return;
  }
  if (isdo_repeat == false && notdo_repeat == false) {
    let obj = {};
    const input_txt = todo_input.value;
    obj.content = input_txt;
    obj.isdo = false;
    todo_notdo.push(obj);
    if (tab_li[2].classList.contains('active')) {
      render_isdo();
    } else {
      renderall();
    }
    todo_input.value = '';
  } else {
    alert('你已輸入過這項待辦事項');
  }
}

function del_todo(event) {
  const target = event.target;
  if (target.classList.contains('delete')) {
    const findisdo_del_item = todo_isdo.findIndex((item) => {
      return (
        item.content ==
        target.previousSibling.previousSibling.lastChild.previousSibling
          .textContent
      );
    });
    if (findisdo_del_item == -1) {
      const del_item = todo_notdo.findIndex((item) => {
        return (
          item.content ==
          target.previousSibling.previousSibling.lastChild.previousSibling
            .textContent
        );
      });
      todo_notdo.splice(del_item, 1);
    } else {
      todo_isdo.splice(findisdo_del_item, 1);
    }
  }
}

function renderall() {
  list.innerHTML = '';
  todo_notdo.forEach((item, index) => {
    let li = document.createElement('li');
    li.classList.add('todo');
    li.setAttribute('data-id', index);
    li.innerHTML = `
        <label class="checkbox" for="">
            <input type="checkbox" class="check"/>
            <span>${item.content}</span>
        </label>
        <a href="#" class="delete"></a>`;

    list.appendChild(li);
  });

  todo_isdo.forEach((item, index) => {
    let li = document.createElement('li');
    li.classList.add('todo');
    li.setAttribute('data-id', index);
    li.innerHTML = `
        <label class="checkbox" for="">
            <input type="checkbox" class="check" checked="checked"/>
            <span>${item.content}</span>
        </label>
        <a href="#" class="delete"></a>`;
    list.appendChild(li);
  });
  item_span.textContent = `${todo_notdo.length} 個待完成項目`;
}

function render_isdo() {
  list.innerHTML = '';
  todo_isdo.forEach((item, index) => {
    let li = document.createElement('li');
    li.classList.add('todo');
    li.setAttribute('data-id', index);
    li.innerHTML = `
        <label class="checkbox" for="">
            <input type="checkbox" class="check" checked="checked"/>
            <span>${item.content}</span>
        </label>
        <a href="#" class="delete"></a>`;
    list.appendChild(li);
    item_span.textContent = `${todo_notdo.length} 個待完成項目`;
  });
}

function render_notdo() {
  list.innerHTML = '';
  todo_notdo.forEach((item, index) => {
    let li = document.createElement('li');
    li.classList.add('todo');
    li.setAttribute('data-id', index);
    li.innerHTML = `
        <label class="checkbox" for="">
            <input type="checkbox" class="check"/>
            <span>${item.content}</span>
        </label>
        <a href="#" class="delete"></a>`;
    list.appendChild(li);
    item_span.textContent = `${todo_notdo.length} 個待完成項目`;
  });
}

tab.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('notdo')) {
    if (
      tab_li[0].classList.contains('active') ||
      tab_li[2].classList.contains('active')
    ) {
      tab_li[0].classList.remove('active');
      tab_li[2].classList.remove('active');
    }
    target.classList.add('active');
    render_notdo();
  } else if (target.classList.contains('isdo')) {
    if (
      tab_li[0].classList.contains('active') ||
      tab_li[1].classList.contains('active')
    ) {
      tab_li[0].classList.remove('active');
      tab_li[1].classList.remove('active');
    }
    target.classList.add('active');
    render_isdo();
  } else if (target.classList.contains('all')) {
    if (
      tab_li[1].classList.contains('active') ||
      tab_li[2].classList.contains('active')
    ) {
      tab_li[1].classList.remove('active');
      tab_li[2].classList.remove('active');
    }
    target.classList.add('active');
    renderall();
  }
});
