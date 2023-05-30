

//let form = document.querySelector(".add_form");



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


