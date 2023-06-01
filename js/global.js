let like = document.querySelector(".fa-heart");
let plus = document.querySelector(".add_cat_button");
let block = document.querySelector(".page");
let addForm = document.querySelector(".form_back");
let addFormClose = document.querySelector(".form-close");
let form1 = document.forms.add;

let cats = localStorage.getItem("cats_data")// массив в скотами в локальном хранилище
if(cats) {
    try {
        cats = JSON.parse(cats);
        console.log(cats);
        for(let i = 0; i< cats.length; i++) {
            create_card(cats[i], block);
        }
    }
    catch(error) {
        cats = null;
    }
}

let user = "1286Evgen";
let path = `https://cats.petiteweb.dev/api/single/${user}`;