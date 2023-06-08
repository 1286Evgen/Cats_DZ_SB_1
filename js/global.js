let like = document.querySelector(".fa-heart");             // создаю переменную для лайка
let plus = document.querySelector(".add_cat_button");       // создаю переменную кнопки плюс (которая разворачивает форму добавления кота)
let block = document.querySelector(".page");                // создаю переменную для формы куда добавляются карточки с котами
let addForm = document.querySelector(".form_back");         // создаю переменную с блоком для формы добавления нового кота
let addFormClose = document.querySelector(".form-close");   // создаю переменную для кнопки закрытия формы добавления кота
let form1 = document.forms.add;                             // создаю переменную для формы добавления кота

let cats = localStorage.getItem("cats_data");               // создаю переменную для массива в скотами в локальном хранилище

let user = "1286Evgen";                                     // создаю переменную для имени пользователя
let path = `https://cats.petiteweb.dev/api/single/${user}`; // создаю переменную, куда записываю адрес удаленного хранилища данных