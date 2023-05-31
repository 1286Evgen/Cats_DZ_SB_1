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
        //console.log(data);
        if(data.length){
            for(let pet of data){
                create_card(pet, block);
            }
        }
    })

plus.addEventListener("click", function() {
    addForm.style.display = "flex";
})

addFormClose.addEventListener("click", function() {
    addForm.style.display = "none";
})

form1.addEventListener("submit", function(element) {
    element.preventDefault();   // останавливаем действие по умолчанию
    let body = {};
    let cat_id
    //console.log(form1.children); // выводим дочерние элементы формы
    //console.log(form1.elements); // выводим все свойства формы(input, textarea, select...)

    for (let i = 0; i < form1.elements.length; i++) {
        let inp = form1.elements[i];
        /*console.log(inp);
        // на сервер отправляется "name = value" (т.е свойство и его значение в объекте)
        console.log(inp.name);
        console.log(inp.value);*/
        if(inp.name) { //если элемент формы имеет атрибут name( значит это не кнопка)
            if(inp.type === "checkbox") {
                body[inp.name] = inp.checked;
            }
            else {
                body[inp.name] = inp.value;
            }
        }
    }
    /*fetch(path + "/show", {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function(result) {
            return result.json();
        })
        .then(function(data) {
            if(data.length){ 
                cat_id = (data[data.length -1]).id + 1; // устанавливаем номер id, на 1 больше чем у крайнего элемента
            }
            else {
                cat_id = 1;    // если вбазе нет котов, то id = 1, т.е это первый кот
            }
            body.id = cat_id;  // присваиваем id номер
        })*/

    console.log(body);
    fetch(path + "/add", {    
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(res => {
        if (res.ok) {
            form1.reset();
            addForm.style.display = "none";
            create_card(body, block);
        }
    })
});