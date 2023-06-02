let create_card = function(pet, tag) {                          // функция для создания карточки кота 
    let card = document.createElement("div");                   // создаем элемент карточку
    card.className = "cat_card";                                // добавляем элементу карточка класс

    let cat_name = document.createElement("h2");                // создаем элемент h2 для имени кота
    cat_name.innerText = pet.name;
    let heart = document.createElement("i");                    // создаем элемент для сердечка(лайк)
    heart.className = "fa-heart";                               // добавляем сердечку класс
    heart.classList.add(pet.favorite ? 'fa-solid': 'fa-regular');
    heart.addEventListener('click', function() { 
        setLike(heart, pet.id, !pet.favorite)
    });
    cat_name.append(heart);                                     // добавляем в заголовок с именем кота сердечко(лайк)
    let card_image = document.createElement("div");             // создаем элемент для формы с фото кота
    card_image.className = "card_image";                        // добавляем класс для элемента с фото
    if(pet.image) {
        card_image.style.backgroundImage = `url(${pet.image})`
    }
    else {
        card_image.style.backgroundImage = "url(cat_unknown.png)"
    }

    let but_info = document.createElement("button");                // создаю элемент для блока кнопок
    but_info.className = "but_card button_change";
    but_info.innerText = "о кисе";

    let but_del = document.createElement("button");                // создаю элемент для блока кнопок
    but_del.className = "but_card button_change";
    but_del.innerText = "удалить";
    but_del.addEventListener('click', (element) => {del_cat(pet.id, card)});

    card.append(cat_name, card_image, but_info, but_del);                 // все элементы добавляем в карточку
    tag.append(card);
}

function setLike(el, id, like) {
    el.classList.toggle("fa-solid");
    el.classList.toggle("fa-regular");

    fetch(path + "/update/" + id, {
        method: "put",
        // без headers на сервер прийдет undefined
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({favorite: like})
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        fetch(path + "/show", {
            metod: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function(result) {
                return result.json();
            })
            .then(function(data) {
                localStorage.setItem("cats_data", JSON.stringify(data));
            })
    })
}

function del_cat(id, element) {
    fetch((path+"/delete/"+id), {
        method: "delete"
    })
    .then(res => {
        if(res.status === 200){
            element.remove();
        }
    })
    fetch(path + "/show", {
        metod: "get",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(function(result) {
        return result.json();
    })
    .then(function(data) {
        localStorage.setItem("cats_data", JSON.stringify(data));
    })
}