/* ADDING ITEMS TO LIST */

let inpBox = document.querySelector(".typebox");
let addButton = document.querySelector(".addbutton");
let itemCont = document.querySelector(".lists");
let listStore = [];
let gotItems = localStorage.getItem("TODOstore");
let parsedGot = JSON.parse(gotItems);
let delbutton;
let container = document.querySelector(".container");
if (parsedGot === null || parsedGot.length == 0) {
  listStore = [];
  parsedGot = listStore;
  container.classList.add("emptylist");
  container.classList.add("whiteback");
} else {
  listStore = parsedGot;
}
addButton.addEventListener("click", clickHandle);
inpBox.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    clickHandle();
  }
});

function clickHandle() {
  let typedText = inpBox.value;
  let datadone = false;
  let boiler = `<div class="item" data-type = "${typedText}" data-class = "${datadone}">
    <div class="checkbox">
        <div class="inbox"><i class="fa-solid fa-check"></i></div>
    </div>
    <div class="text">${typedText}</div>
    <div class="delete">
        <i class="fa-solid fa-trash-can"></i>
    </div>
    </div>`;

  if (typedText.length == 0) {
    alert("fill the box before submitting");
  } else {
    container.classList.remove("emptylist");
    container.classList.remove("whiteback");
    itemCont.innerHTML += boiler;
    listStore.push([typedText, datadone]);
    localStorage.setItem("TODOstore", JSON.stringify(listStore));
    inpBox.value = "";

    delbutton = document.querySelectorAll(".delete").forEach((item) => {
      item.addEventListener("click", async () => {
        let delme = item.closest(".item");
        delme.classList.add("slideout");
        await new Promise((resolve) => setTimeout(resolve, 1200));
        let find2del = delme.dataset.type;
        let foundindx = parsedGot.indexOf(find2del);
        parsedGot.splice(foundindx, 1);
        delme.remove();
        localStorage.setItem("TODOstore", JSON.stringify(parsedGot));

        if (parsedGot === null || parsedGot.length === 0) {
          container.classList.add("emptylist");
          container.classList.add("whiteback");
        }
      });
    });

    /* HANDLING THE GREEN CHECK FOR NEWLY ADDED ITEMS */

    let check = document.querySelectorAll(".inbox").forEach((item) => {
      item.addEventListener("click", () => {
        item.classList.toggle("green");
        if (item.classList.contains("green")) {
          item.closest(".item").dataset.class = true;
          let dat2edit = item.closest(".item").dataset.type;
          for (let i = 0; i < parsedGot.length; i++) {
            if (parsedGot[i][0].includes(dat2edit) === true) {
              if (parsedGot[i][1] === true) {
                parsedGot[i][1] = false;
                localStorage.setItem("TODOstore", JSON.stringify(parsedGot));
              } else {
                parsedGot[i][1] = true;
                localStorage.setItem("TODOstore", JSON.stringify(parsedGot));
              }
            }
          }
        } else {
          item.closest(".item").dataset.class = false;
          let dat2edit = item.closest(".item").dataset.type;
          for (let i = 0; i < parsedGot.length; i++) {
            if (parsedGot[i][0].includes(dat2edit) === true) {
              parsedGot[i][1] = false;
              localStorage.setItem("TODOstore", JSON.stringify(parsedGot));
            }
          }
        }
      });
    });
  }
}
/* loading items from store */

if (parsedGot === null || parsedGot.length == 0) {
  if (parsedGot.length === 0) {
    container.classList.add("emptylist");
    container.classList.add("whiteback");
  }
} else {
  for (let i = 0; i < parsedGot.length; i++) {
    let typedText = parsedGot[i][0];
    let state = parsedGot[i][1];
    if (state === true) {
      let boiler = `<div class="item" data-type = "${typedText}" data-class = "${state}">
    <div class="checkbox ">
        <div class="inbox green"><i class="fa-solid fa-check"></i></div>
    </div>
    <div class="text">${typedText}</div>
    <div class="delete">
        <i class="fa-solid fa-trash-can"></i>
    </div>
    </div>`;
      itemCont.innerHTML += boiler;
    } else {
      let boiler = `<div class="item" data-type = "${typedText}" data-class = "${state}">
    <div class="checkbox">
        <div class="inbox"><i class="fa-solid fa-check"></i></div>
    </div>
    <div class="text">${typedText}</div>
    <div class="delete">
        <i class="fa-solid fa-trash-can"></i>
    </div>
    </div>`;
      itemCont.innerHTML += boiler;
    }
  }
}

/* REMOVE ITEMS FROM THE LIST */

delbutton = document.querySelectorAll(".delete").forEach((item) => {
  item.addEventListener("click", async () => {
    let delme = item.closest(".item");
    delme.classList.add("slideout");
    await new Promise((resolve) => setTimeout(resolve, 1200));
    let find2del = delme.dataset.type;
    let foundindx = parsedGot.indexOf(find2del);
    parsedGot.splice(foundindx, 1);
    delme.remove();
    localStorage.setItem("TODOstore", JSON.stringify(parsedGot));

    if (parsedGot.length === 0) {
      container.classList.add("emptylist");
      container.classList.add("whiteback");
    }
  });
});


/* HANDLING GREEN CHECK CLICK FOR ALREADY EXSITING ITEMS */
let check = document.querySelectorAll(".inbox").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("green");
    if (item.classList.contains("green")) {
      item.closest(".item").dataset.class = true;
      let dat2edit = item.closest(".item").dataset.type;
      for (let i = 0; i < parsedGot.length; i++) {
        if (parsedGot[i][0].includes(dat2edit) === true) {
          if (parsedGot[i][1] === true) {
            parsedGot[i][1] = false;
            localStorage.setItem("TODOstore", JSON.stringify(parsedGot));
          } else {
            parsedGot[i][1] = true;
            localStorage.setItem("TODOstore", JSON.stringify(parsedGot));
          }
        }
      }
    } else {
      item.closest(".item").dataset.class = false;
      let dat2edit = item.closest(".item").dataset.type;
      for (let i = 0; i < parsedGot.length; i++) {
        if (parsedGot[i][0].includes(dat2edit) === true) {
          parsedGot[i][1] = false;
          localStorage.setItem("TODOstore", JSON.stringify(parsedGot));
        }
      }
    }
  });
});
