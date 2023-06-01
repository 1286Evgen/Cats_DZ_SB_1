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

    fetch(path + "/ids")
        .then(res => res.json())
        .then(ids => { 
            body.id = ids[ids.length -1] + 1;
            console.log(body);
            return (
                fetch(path + "/add", {    
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
                })
            )
        })
        
        .then(res => {
        if (res.ok) {
            form1.reset();
            addForm.style.display = "none";
            create_card(body, block);
        }
        else {
            return res.json();
        }
        })
        .catch(err => {
        if(err.message) {
            alert(err.message);
        }})
})
