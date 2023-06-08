let create_card = function(pet, tag) {                              // функция для создания карточки кота 
    let card = document.createElement("div");                       // создаем элемент карточку
    card.className = "cat_card";                                    // добавляем элементу карточка класс

    let cat_name = document.createElement("h2");                    // создаем элемент заголовок h2 для имени кота
    cat_name.innerText = pet.name;                                  // вкладываем в элемент заголовок текст с именем кота
    let heart = document.createElement("i");                        // создаем элемент для сердечка(лайк)
    heart.className = "fa-heart";                                   // добавляем сердечку класс "сердечко" из удуленной библиотеке
    heart.classList.add(pet.favorite ? 'fa-solid': 'fa-regular');   // добавляем класс сердечку или "любимчик" или нет (т.е закрашиваем сердечко или нет)
    heart.addEventListener('click', function() {                    // привязываем событие "клик" и функцию-закрашивания к иконке сердечко 
        setLike(heart, pet.id, !pet.favorite)
    });
    cat_name.append(heart);                                         // добавляем в заголовок с именем кота сердечко(лайк)
    let card_image = document.createElement("div");                 // создаем элемент для формы с фото кота
    card_image.className = "card_image";                            // добавляем класс для элемента с фото
    if(pet.image) {                                                 // если в базе есть фото кота, 
        card_image.style.backgroundImage = `url(${pet.image})`      // то делаем фон блока это фото
    }
    else {
        card_image.style.backgroundImage = "url(cat_unknown.png)"   // или фоном делаем картику по умолчанию
    }

    let but_info = document.createElement("button");                // создаю элемент кнопка (информация о коте)
    but_info.className = "but_info but_card button_change";         // задаем кнопке классы
    but_info.innerText = "о кисе";                                  // добавляем текст в кнопку
    but_info.addEventListener("click", element => {                 // привязываем действие на кнопку по клику, 
        location.assign(`info.html?${pet.id}`);                     // затем записываем в location id кота
    });

    let but_del = document.createElement("button");                 // создаю элемент кнопка (удаление кота)
    but_del.className = "but_del but_card button_change";           // задаем кнопке классы
    but_del.innerText = "удалить";                                  // добавляем текст в кнопку
    but_del.addEventListener('click', (element) => {                // привязываем действие на кнопку по клику,
        del_cat(pet.id, card)                                       // запускаем функцию удаления кота(в нее передаем id кота и сам блок карточку)
    });

    card.append(cat_name, card_image, but_info, but_del);           // все элементы добавляем в карточку
    tag.append(card);                                               // саму карточку добавляем на страницу
}

function setLike(el, id, like) {                                    // функция добавления лайка
    el.classList.toggle("fa-solid");                                // toggle если у элемента есть указанный класс то он его удалит, или наоборот
    el.classList.toggle("fa-regular");                              // toggle если у элемента есть указанный класс то он его удалит, или наоборот

    fetch(path + "/update/" + id, {                                 // делаю fetch запрос для изменения информации в базе о лайке
        method: "put",                                              // указываю метод запроса
        // без headers на сервер прийдет undefined
        headers: {
            "Content-Type": "application/json"                      // указываю тип запроса
        },
        body: JSON.stringify({favorite: like})                      // содержимое запроса преобразовываю из объекта в строку
    })
    .then(res => res.json())                                        // ответ преобразовываю в объект
    .then(data => {
        console.log(data);                                          // результат вывожу в консоль
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
    })
}

function del_cat(id, element) {                                     // функция удаления карточки кота
    fetch((path+"/delete/"+id), {                                   // делаю fetch запрос
        method: "delete"                                            // указываю метод delete
    })
    .then(res => {
        if(res.status === 200){                                     // если статус ответа = 200
            element.remove();                                       // елемент(т.е карточку) удаляю
        }
    })
    fetch(path + "/show", {                                         // делаю fetch запрос для актуализации данных в Local Storege(локальном хранилище браузера)
        metod: "get",                                               // метод запроса
        headers: {
            "Content-Type": "application/json"                      // форма получения информации
        }
    })
        .then(function(result) {
            return result.json();                                   // возвращаю ответ преобразованный в объект
        })
        .then(function(data) {
            localStorage.setItem("cats_data", JSON.stringify(data)); // обновляю в LS данные о коте(предворительно преобразовав их в строку)
        })
}