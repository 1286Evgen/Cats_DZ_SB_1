
if(cats) {                                                          // проверяем есть ли в Local Storege данные с котами  
    try {                                                           // если данные есть, то пробуем 
        cats = JSON.parse(cats);                                    // распарсить эти данные
        for(let i = 0; i< cats.length; i++) {                       // перебираем данные о котах
            create_card(cats[i], block);                            // создаем карточки котов
        }
    }
    catch(error) {                                                  // отлавливаем ошибки
        cats = null;                                                // если есть ошибки обнуляем в LS информацию о котах
    }
}
else {                                                              // если не получилась отработать с Local Storege, то
    fetch(path + "/show", {                                         // делаем fetch запрос 
        metod: "get",                                               // определяем метод запроса
        headers: {
            "Content-Type": "application/json"                      // определяем тип ответа нам нужный
        }
    })
        .then(function(result) {                                    // затем запускаем функцию, которая:
            return result.json();                                   // возвращает результат преобразованный в json объект 
       
        })
        .then(function(data) {                                      // затем запускаем функцию, которая:
            for(let pet of data){                                   // перебираем полуенный объект
                create_card(pet, block);                            // запускаем функцию создания карточки (параметры которой: данные кота, блок в который их прописываем)
            }
            localStorage.setItem("cats_data", JSON.stringify(data)); // записываем в Local Storedge результат запроса преобразованный в строку
        })
}

plus.addEventListener("click", function() {                         // задаем действия при нажатии на кнопку "плюс" 
    addForm.style.display = "flex";                                 // вызываем функию которая разворачивает форму для добавдения кота
})

addFormClose.addEventListener("click", function() {                 // задаем действия при нажатии на кнопку "крестик" в форме 
    addForm.style.display = "none";                                 // вызываем функию которая сворачивает форму для добавдения кота
})

form1.addEventListener("submit", function(element) {
    element.preventDefault();                                       // останавливаем действие по умолчанию
    let body = {};                                                  // создаем объект для добавления данных о новом коте
    //console.log(form1.children); // выводим дочерние элементы формы
    //console.log(form1.elements); // выводим все элементы формы(input, textarea, select...)

    for (let i = 0; i < form1.elements.length; i++) {               // перебираем данные введенные в поля формы
        let inp = form1.elements[i];                                // присваеваем переменной данные конкретного поля формы
        /*console.log(inp);
        // на сервер отправляется "name = value" (т.е свойство и его значение в объекте)
        console.log(inp.name);
        console.log(inp.value);*/
        if(inp.name) {                                              //если элемент формы имеет атрибут name(значит это не кнопка)
            if(inp.type === "checkbox") {                           // если элемент имеет тип "checkbox", то это "переключатель"
                body[inp.name] = inp.checked;                       // в объект формы вписываем значения переключателя
            }
            else {
                body[inp.name] = inp.value;                         // иначе в объект вписываем значение поля
            }
        }
    }

    // для атоматического определения следующего id для нового кота:
    fetch(path + "/ids")                                            // делаем fetch запрос всех id котов
    .then(res => res.json())                                        // результат запроса преобразуем в объект
    .then(ids => { 
        body.id = ids[ids.length -1] + 1;                           // вычисляем следующий id и добавляем его значение в объект с данными о новом коте
        console.log(body);
        return (
            fetch(path + "/add", {                                  // делаем fetch запрос 
            method: "post",                                         // определяем метод запроса
            headers: {
                "Content-Type": "application/json"                  // определяем тип данных запроса
            },
            body: JSON.stringify(body)                              // в тело запроса передаем преобразованные в строку данные о новом коте 
            })
        )
    }) 
    .then(res => {                                                  // затем обработываю результат запроса
    if (res.ok) {                                                   // если запрос успешен:
        form1.reset();                                              // сбрасываем все поля формы
        addForm.style.display = "none";                             // добавляю стиль "display: none"
        create_card(body, block);                                   // запускаем функцию создания карточки
        fetch(path + "/show", {                                     // делаю fetch запрос для актуализации данных в Local Storege(локальном хранилище браузера)
            metod: "get",                                           // метод запроса
            headers: {
                "Content-Type": "application/json"                  // форма получения информации
            }
        })
            .then(function(result) {
                return result.json();                               // возвращаю ответ преобразованный в объект
            })
            .then(function(data) {
                localStorage.setItem("cats_data", JSON.stringify(data)); // обновляю в LS данные о коте(предворительно преобразовав их в строку)
            })
    }
    else {                                                          // если запрос не успешен
        return res.json();                                          // возвращаю результат запроса, преобразованный в объект
    }
    })
    .catch(err => {                                                 // отлавливаю ошибку
    if(err.message) {                                               // если есть сообщение об ошибке
        alert(err.message);                                         // вывожу диалоговое окно с ошибкой
    }})
})