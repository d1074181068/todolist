let todo_isdo = [];
let todo_notdo = [];
const todo_input = document.querySelector('.todo-input');
const btn = document.querySelector('.btn_add');
const list = document.querySelector('.list');
const item_span = document.querySelector('.list_footer > p');
const tab = document.querySelector('.tab');
const tab_li = document.querySelectorAll('.tab > li');
const delete_complete = document.querySelector('.list_footer > a');
btn.addEventListener('click', () => {
    add_todo();
});
todo_input.addEventListener('keypress', (event) => {
    //鍵盤控制
    if (event.which == '13') {
        add_todo();
    }
});

//增加list監聽判斷是點到 delete還是checkbox
list.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('delete')) {
        del_todo(event);

        //判斷上排選單點到哪去做專屬的render
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

//刪除已完成項目
delete_complete.addEventListener('click', () => {
    todo_isdo.splice(0, todo_isdo.length);
    if (tab_li[0].classList.contains('active')) {
        renderall();
    } else if (tab_li[1].classList.contains('active')) {
        render_notdo();
    } else if (tab_li[2].classList.contains('active')) {
        render_isdo();
    }
});

//checkbox勾選
function ischecked(event) {
    const target = event.target;
    /*抓出她的文字然後去notdo的陣列中找出來刪除，
        並把勾選的這組列的isdo改成true然後推去isdo(因為被勾選起來就是做好的)
      */
    let todo_txt = target.nextSibling.nextSibling.textContent;
    todo_notdo.forEach((item, index) => {
        if (item.content == todo_txt) {
            item.isdo == true;
            todo_isdo.push(item);
            todo_notdo.splice(index, 1);
        }
    });
}

//checkbox不勾選 (邏輯同上)
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

function add_todo() {
    /*先去判斷 有沒有輸入過了*/
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

    /*先去判斷 有沒有輸入過了*/
    if (isdo_repeat == false && notdo_repeat == false) {
        //建立物件直接推入notdo
        let obj = {};
        const input_txt = todo_input.value;
        obj.content = input_txt;
        obj.isdo = false;
        todo_notdo.push(obj);

        //當目前上排選單點到已完成 做她的專屬刷新 其他照常
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
    /*先去找isdo陣列中有沒有這個字串，
          有的話直接刪除陣列中資料
          沒有的話一定在另一個陣列 然後找出來刪除
      */
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
    //提取notdo 的所有資料 建立li
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
    //提取 isdo 的所有資料 建立li
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
    //上排選單樣式
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