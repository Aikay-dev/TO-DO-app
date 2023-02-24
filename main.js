
/* ADDING ITEMS TO LIST */

let inpBox = document.querySelector(".typebox")
let addButton = document.querySelector(".addbutton")
let itemCont = document.querySelector(".lists")
let listStore = []
let gotItems = localStorage.getItem("TODOstore")
let parsedGot = JSON.parse(gotItems)
let delbutton
let container = document.querySelector(".container")
if(parsedGot === null || parsedGot.length == 0){
    listStore = []
    parsedGot = listStore
    container.classList.add("emptylist")
    container.classList.add("whiteback")
}else{
    listStore = parsedGot
}
addButton.addEventListener("click", () => {
    
    let typedText = inpBox.value
    let datadone = false
    let boiler = `<div class="item" data-type = "${typedText}" data-class = "${datadone}">
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
        container.classList.remove("emptylist")
        container.classList.remove("whiteback")
        itemCont.innerHTML += boiler
        listStore.push([typedText, datadone])
        localStorage.setItem("TODOstore", JSON.stringify(listStore))
        console.log(listStore);
        console.log(parsedGot);
        inpBox.value = ""

        delbutton = document.querySelectorAll(".delete").forEach(item => {
            item.addEventListener("click", async () => {
                let delme = item.closest(".item")
                delme.classList.add("slideout")
                await new Promise((resolve) => setTimeout(resolve, 1200));   
                let find2del = delme.dataset.type;
                let foundindx = parsedGot.indexOf(find2del);
                parsedGot.splice(foundindx, 1)
                delme.remove()
                localStorage.setItem("TODOstore", JSON.stringify(parsedGot))
                console.log(parsedGot);
                console.log(item.closest(".item"));
    
                if(parsedGot === null || parsedGot.length === 0){
                    container.classList.add("emptylist")
                    container.classList.add("whiteback")
                }
    
                console.log(parsedGot);
            })
        })

        let check = document.querySelectorAll(".inbox").forEach( item => {
            item.addEventListener("click", () => {
                item.classList.toggle("green")
                if(item.classList.contains("green")){
                    item.closest(".item").dataset.class = true
                }else{
                    item.closest(".item").dataset.class = false
                    console.log(item.closest(".item").dataset.class);
                }
            })
        })
        
    }




})

/* loading items from store */

if(parsedGot === null || parsedGot.length == 0){

    if(parsedGot.length === 0){
        container.classList.add("emptylist")
        container.classList.add("whiteback")
    }

}else{
    

    for(let i = 0; i < parsedGot.length; i++){
        let typedText = parsedGot[i][0]
        let state = parsedGot[i][1]
        let boiler = `<div class="item" data-type = "${typedText}" data-class = "${state}">
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

delbutton = document.querySelectorAll(".delete").forEach(item => {
    item.addEventListener("click", async () => {
        let delme = item.closest(".item")
        delme.classList.add("slideout")
        await new Promise((resolve) => setTimeout(resolve, 1200));   
        let find2del = delme.dataset.type;
        let foundindx = parsedGot.indexOf(find2del);
        parsedGot.splice(foundindx, 1)
        delme.remove()
        localStorage.setItem("TODOstore", JSON.stringify(parsedGot))
        console.log(parsedGot);
        console.log(item.closest(".item"));

        if(parsedGot.length === 0){
            container.classList.add("emptylist")
            container.classList.add("whiteback")
        }
    })
})


let check = document.querySelectorAll(".inbox").forEach( item => {
    item.addEventListener("click", () => {
        item.classList.toggle("green")
        if(item.classList.contains("green")){
            item.closest(".item").dataset.class = true
            console.log(item.closest(".item").dataset.class);
            console.log(item.closest(".item").dataset.type);
            let dat2edit = item.closest(".item").dataset.type
            console.log(parsedGot);
            for(let i = 0; i < parsedGot.length; i++){
                if(parsedGot[i][0].includes(dat2edit) === true){
                    if(parsedGot[i][1] === true){
                        parsedGot[i][1] = false
                        localStorage.setItem("TODOstore", JSON.stringify(parsedGot))
                        console.log("here1");
                        console.log(parsedGot[i][1]);
                    }else{
                        parsedGot[i][1] = true
                        localStorage.setItem("TODOstore", JSON.stringify(parsedGot))
                        console.log("here");
                        console.log(parsedGot[i][1]);
                    }
                };
            }

        }else{
            item.closest(".item").dataset.class = false
            let dat2edit = item.closest(".item").dataset.type
            console.log(parsedGot);
            for(let i = 0; i < parsedGot.length; i++){
                if(parsedGot[i][0].includes(dat2edit) === false){
                    if(parsedGot[i][1] === false){
                        parsedGot[i][1] = true
                        localStorage.setItem("TODOstore", JSON.stringify(parsedGot))
                        console.log("here1");
                        console.log(parsedGot[i][1]);
                    }else{
                        parsedGot[i][1] = false
                        localStorage.setItem("TODOstore", JSON.stringify(parsedGot))
                        console.log("here");
                        console.log(parsedGot[i][1]);
                    }
                };
            }
        }
    })
})

