(function () {

    let listArray = [];
    let nameList = ''
    //создает и возвращает заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    //создаем в dom дереве
    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        button.disabled = true;


        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        input.addEventListener('input', function (e) {
            e.preventDefault();
            if (input.value.length > 0) {
                button.disabled = false;
            } else if (input.value.length == 0) {
                button.disabled = true;
            }
        });


        return {
            form,
            input,
            button,
        };
    }

    //создаем и возвращаем список элементов
    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(obj) {
        let item = document.createElement('li');
        // кнопки помещаем в элемент
        let buttonGroup = document.createElement('div')
        let doneButton = document.createElement('button')
        let deleteButton = document.createElement('button')

        // с помощью flex
        //устанавливаем стили

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
        item.textContent = obj.name


        buttonGroup.classList.add('btn-group', 'btn-group-sm')
        doneButton.classList.add('btn', 'btn-success')
        doneButton.textContent = 'Готово'
        deleteButton.classList.add('btn', 'btn-danger')
        deleteButton.textContent = 'Удалить'

        item.id = obj.id

        if (obj.done == true) {
            item.classList.add("list-group-item-success")
        }

        // кнопки обединение
        buttonGroup.append(doneButton)
        buttonGroup.append(deleteButton)
        item.append(buttonGroup)

        // добавляем к кнопкам функционал
        doneButton.addEventListener('click', function () {
            for (const item of listArray) {
                if (item.id == obj.id) {
                    item.done = !item.done
                    break
                }
            }
            seveList(listArray)
            item.classList.toggle('list-group-item-success')
        })



        deleteButton.addEventListener('click', function () {
            if (confirm('Вы уверены?')) {
                for (let i = 0; i < listArray.length; i++) {
                    if (item.id == obj.id) {
                        listArray.splice(i, 1)
                        break
                    }
                }
                //сохранение
                seveList(listArray)
                item.remove()
            }
        })

        //доступ к приложению
        return {
            item,
            doneButton,
            deleteButton,
        }
    }

    function getNewID(arr) {
        let max = 0
        for (const item of arr) {
            if (item.id > max) max = item.id
        }
        return max + 1
    }

    function createTodoApp(container, title = 'Список дел', nameList) {

        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();


        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        listName = nameList

        let localData = localStorage.getItem(listName)

        if (localData !== "" && localData !== null) {
            listArray = JSON.parse(localData)
        }

        if (listArray.length > 0) {
            for (const oneObj of listArray) {
                let todoItem = createTodoItem(oneObj);
                todoList.append(todoItem.item)
            }
        }

        todoItemForm.form.addEventListener('submit', function (e) {
            // чтобы страница не перезагружалась
            e.preventDefault();
            if (!todoItemForm.input.value) {
                return
            }

            let obj = {
                id: getNewID(listArray),
                name: todoItemForm.input.value,
                done: false
            }

            listArray.push(obj)
            console.log(listArray);

            let todoItem = createTodoItem(obj)

            // добавляем новое дело из поля ввода
            todoList.append(todoItem.item)


            // очищаем поле вводы чтоб не очищать вручную
            todoItemForm.input.value = ''
            todoItemForm.button.disabled = true;
            seveList(listArray)
        })
    }

    //Сохраняет данные после обновления 
    function seveList(arr) {
        localStorage.setItem(listName, JSON.stringify(arr))
    }


    window.createTodoApp = createTodoApp
})();