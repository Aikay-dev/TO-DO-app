/* let cart = [1, 2, 3]
function updateCart(){
    localStorage.setItem("TODOstore", JSON.stringify(cart))
}
 */

/* ADDING ITEMS TO LIST */

let inpBox = document.querySelector(".typebox")
let addButton = document.querySelector(".addbutton")
let itemCont = document.querySelector(".lists")
let listStore = []
let gotItems = localStorage.getItem("TODOstore")
let parsedGot = JSON.parse(gotItems)
if(parsedGot === null || parsedGot.length == 0){
    listStore = []
}else{
    listStore = parsedGot
}
addButton.addEventListener("click", () => {
    
    let typedText = inpBox.value
    let boiler = `<div class="item" data-type = "${typedText}">
    <div class="checkbox">
        <div class="inbox"><i class="fa-solid fa-check"></i></div>
    </div>
    <div class="text">${typedText}</div>
    <div class="delete">
        <i class="fa-solid fa-trash-can"></i>
    </div>
    </div>`
    
    if(typedText.length == 0){  
        alert ("fill the box before submitting")
    }else{
        itemCont.innerHTML += boiler
        listStore.push(typedText)
        localStorage.setItem("TODOstore", JSON.stringify(listStore))
        console.log(listStore);
        console.log(parsedGot);
        inpBox.value = ""
    }
})

/* loading items from store */

if(parsedGot === null || parsedGot.length == 0){

}else{

    for(let i = 0; i < parsedGot.length; i++){
        let typedText = parsedGot[i]
        let boiler = `<div class="item" data-type = "${typedText}">
    <div class="checkbox">
        <div class="inbox"><i class="fa-solid fa-check"></i></div>
    </div>
    <div class="text">${typedText}</div>
    <div class="delete">
        <i class="fa-solid fa-trash-can"></i>
    </div>
    </div>`
    itemCont.innerHTML += boiler
    }
}


/* REMOVE ITEMS FROM THE LIST */

let delbutton = document.querySelectorAll(".delete").forEach(item => {
    item.addEventListener("click", async () => {
        let delme = item.closest(".item")
        delme.classList.add("slideout")
        await new Promise((resolve) => setTimeout(resolve, 1200));
        delme.remove()
        let find2del = delme.dataset.type;
        let foundindx = parsedGot.indexOf(find2del);
        parsedGot.splice(foundindx, 1)
        localStorage.setItem("TODOstore", JSON.stringify(parsedGot))
        console.log(parsedGot);
    })
})

