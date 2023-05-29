let like = document.querySelector(".fa-heart");
let plus = document.querySelector(".add_cat_button");
let block = document.querySelector(".page");

let user = "1286Evgen";
let path = `https://cats.petiteweb.dev/api/single/${user}`;

//let form = document.querySelector(".add_form");

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
    })
}

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
        console.log(data);
        if(data.length){
            for(let pet of data){
                create_card(pet, block);
            }
        }
    })

/*like.addEventListener('click', function(element) {
    fetch(path + "/show", {
        metod: "GET"
    })
    .then(function(result) {
        return result.json();
    })
    .then(function(data) {
        !data.favorite ? element.classList.add("fa-solid"): element.classList.add("fa-regular");
    })
});

//Открываю форму
/*plus.addEventListener('click', function(element) {
    form.classList.toggle("active")});*/

