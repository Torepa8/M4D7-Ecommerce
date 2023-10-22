const passAdmin = document.querySelector('#passwordAdmin')
const inputContainer = document.querySelector('#inputContainer')
const rowCont = document.querySelector('#rowContainer')
const navEdit = document.querySelector('#navEdit')
const nameP = document.querySelector('#nameP')
const descrP = document.querySelector('#descriptionP')
const imgP = document.querySelector('#imageP')
const brandP = document.querySelector('#brandP')
const priceP = document.querySelector('#priceP')
const formAdmin = document.querySelector('#formAdmin')
const buttAddEdit = document.querySelector('#buttAddEdit')

let addORedit = "add"

const API = "https://striveschool-api.herokuapp.com/api/product/"

let password = "sonoio"
let login = false

//Al caricamento della pagina vado a vedere se l'utente aveva già effettuato il login
window.onload = function () {
    if (localStorage.getItem("login") === 'true') {
        loginOk()
    }
    displayEditProduct()
}

function loginOk() {
    inputContainer.classList.remove("d-none")
    navEdit.classList.remove('pe-none')
    formAdmin.classList.add('d-none')
}

//Questa funzione controlla la password admin per poter aggiungere, modificare o eliminare i prodotti
function controlloPassword(ev) {
    ev.preventDefault()

    if (passAdmin.value === password) {
        loginOk()
        alert('Admin verificato!')
        login = true
        localStorage.setItem("login", "true")
    }
    else {
        alert('Password errata!')
    }
}

//fx per inserire i prodotti sul server
async function uploadProduct(inputData) {
    const addProduct = await fetch(API, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiMWI3YzM5MzI3YzAwMThkM2EyYjYiLCJpYXQiOjE2OTY0MTU2NjksImV4cCI6MTY5NzYyNTI2OX0.wcciYsvcV8Y8cHbI5OP8nm04BU44GDgf3uWkiU2RpTU"
        },
        body: JSON.stringify(inputData)
    }).finally(alert("Prodotto Inserito"))
    return addProduct
}

//fx per modificare i prodotti
async function addEditProduct(inputData) {
    const idname = nameP.name
    const addProduct = await fetch(API + idname, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiMWI3YzM5MzI3YzAwMThkM2EyYjYiLCJpYXQiOjE2OTc5MzQ2NzUsImV4cCI6MTY5OTE0NDI3NX0.fX9QwwR6dJ38iOaDgeB5B1IHixO7O3_EmAxpypOKWrE"
        },
        body: JSON.stringify(inputData)
    }).finally(alert("Prodotto Modificato"))
    window.location.reload(true);
    return addProduct
}



//Controllo campi input e passaggio dei dati inseriti per eseguire la fecth di inserimento dati
function insertProduct() {
    if ((nameP.value !== "") && (descrP.value !== "") && (imgP.value !== "") && (brandP.value !== "") && (priceP.value !== "")) {
        const prodotto = { name: nameP.value, description: descrP.value, imageUrl: imgP.value, brand: brandP.value, price: priceP.value }
        if (addORedit === "add") {
            if (confirm("Confermi l'inserimento del prodotto?"))
                uploadProduct(prodotto)
        }
        else {
            if (confirm("Confermi la modifica del prodotto?"))
                addEditProduct(prodotto)
        }
    }
    else {
        alert('Compila tutti i campi')
    }
}

//fx per caricare i prodotti dal server
async function loadProduct() {
    const risp = await fetch(API, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiMWI3YzM5MzI3YzAwMThkM2EyYjYiLCJpYXQiOjE2OTc5MzQ2NzUsImV4cCI6MTY5OTE0NDI3NX0.fX9QwwR6dJ38iOaDgeB5B1IHixO7O3_EmAxpypOKWrE"
        }
    })
    const prodotti = await risp.json()
    return prodotti
}

//Eliminazione prodotto
async function deleteProduct(e, idpro) {
    e.preventDefault()
    // alert(idpro)

    if (confirm('Sei sicuro di eliminare il prodotto?')) {
        fetch(API + idpro, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiMWI3YzM5MzI3YzAwMThkM2EyYjYiLCJpYXQiOjE2OTc5MzQ2NzUsImV4cCI6MTY5OTE0NDI3NX0.fX9QwwR6dJ38iOaDgeB5B1IHixO7O3_EmAxpypOKWrE"
            }
        })
        displayEditProduct()
    } else {
        alert('Nessuna eliminazione')
    }
}

function editProduct(e, idpro) {
    e.preventDefault()

    alert('Stai modificando il prodotto con id ' + idpro)
    if (confirm("Sei sicuro di voler modificare il prodotto selezionato?")) {

        addORedit = "edit"
        buttAddEdit.innerHTML = "Edit Product"
        // rowCont.innerHTML = ""
        // addProduct()
        fetch(API + idpro, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiMWI3YzM5MzI3YzAwMThkM2EyYjYiLCJpYXQiOjE2OTc5MzQ2NzUsImV4cCI6MTY5OTE0NDI3NX0.fX9QwwR6dJ38iOaDgeB5B1IHixO7O3_EmAxpypOKWrE"
            }
        }).then(r => r.json())
            .then(selectedProduct)

        function selectedProduct(p) {
            console.log(p)
            const { _id, name, description, imageUrl, brand, price } = p
            nameP.name = _id
            nameP.value = name
            descrP.value = description
            imgP.value = imageUrl
            brandP.value = brand
            priceP.value = price
            console.log(nameP.name)
        }
    }
    else{
        alert("Nessuna modifica apportata")
    }
}

function addProduct() {
    // window.location.reload(true);
}

async function displayEditProduct() {
    // rowCont.innerHTML = ""
    rowCont.innerHTML = /*html*/ `
        
        <span class="loader m-4"></span>
        `

    const AllProducts = await loadProduct()
    console.log(AllProducts)
    document.querySelector('.loader').remove()
    AllProducts.forEach(element => {
        const { _id, name, description, brand, imageUrl, price } = element
        rowCont.innerHTML += /*html*/ `
            <div class="col-12 col-md-6 d-flex flex-column align-items-center mb-2">
                <div id="${_id}" class="card w95">
                    <img src="${imageUrl}" class="card-img-top" height="180" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${brand}</p>
                        <p class="card-text text-truncate">${description}</p>
                        <p id="priceProduct">${price}€</p>
                        <a href="#navEdit" onclick="editProduct(event, '${_id}')" class="btn btn-secondary">
                        <i class="bi bi-pencil-square"></i>
                        </a>
                        <a href="" onclick="deleteProduct(event, '${_id}')" class="btn btn-danger">
                        <i class="bi bi-trash3-fill"></i>
                        </a>
                    </div>
                </div>
            </div>
        `
    })
}