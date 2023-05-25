
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://foodapp-database-e2e5a-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field");
const addBtnEl = document.getElementById("add-btn");
const shoppingListEl = document.getElementById("shopping-list");

addBtnEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;
    if (inputValue === "") {
        return;
    }
    push(shoppingListInDB, inputValue);
    clearInputFieldEl()
    // appendItemToShoppingListLi(inputValue)
})

onValue(shoppingListInDB, function(snapshot) {
   if (snapshot.exists()) {
    let shoppingListArray = Object.entries(snapshot.val())
    clearShoppingListEl() 
    for (let i = 0; i < shoppingListArray.length; i++) {
        let currentItem = shoppingListArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        appendItemToShoppingListLi(currentItem)
    }
   } else {
        shoppingListEl.innerHTML = `<p>No Items here... yet</p>`
   }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function appendItemToShoppingListLi(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener("click", function() {
        let removeShoppingListLi = ref(database, `shoppingList/${itemID}`)
        remove(removeShoppingListLi)
    })
    shoppingListEl.append(newEl)
}