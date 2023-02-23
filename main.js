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
if(gotItems === null || []){
    
}
addButton.addEventListener("click", () => {
    
    let typedText = inpBox.value
    let boiler = `<div class="item">
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
        inpBox.value = ""
    }
})