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

const API = "https://striveschool-api.herokuapp.com/api/product/"

let password = "sonoio"
let login = false

//Al caricamento della pagina vado a vedere se l'utente aveva già effettuato il login
window.onload = function () {
    if (localStorage.getItem("login") === 'true') {
        // inputContainer.classList.remove("d-none")
        // navEdit.classList.remove('pe-none')    INSERITE NELLA FUNCTION loginOk()
        // formAdmin.classList.add('d-none')
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
        // inputContainer.classList.remove("d-none")
        // navEdit.classList.remove('pe-none')   INSERITE NELLA FUNCTION loginOk()
        // formAdmin.classList.add('d-none')
        loginOk()
        alert('Admin verificato!')
        login = true
        localStorage.setItem("login", "true")
    }
    else {
        alert('Password errata!')
    }
}

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

//Controllo campi input e passaggio dei dati inseriti per eseguire la fecth di inserimento dati
function insertProduct() {
    if ((nameP.value !== "") && (descrP.value !== "") && (imgP.value !== "") && (brandP.value !== "") && (priceP.value !== "")) {
        const prodotto = { name: nameP.value, description: descrP.value, imageUrl: imgP.value, brand: brandP.value, price: priceP.value }
        if (confirm("Confermi l'inserimento del prodotto?"))
            uploadProduct(prodotto)
    } else {
        alert('Compila tutti i campi')
    }
}

async function loadProduct() {
    const risp = await fetch(API, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiMWI3YzM5MzI3YzAwMThkM2EyYjYiLCJpYXQiOjE2OTYyNzUzMjUsImV4cCI6MTY5NzQ4NDkyNX0.vww_zKkpOGlO7u-I13sFxDxHeNkvp-lo54e_5w5ag84"
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
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiMWI3YzM5MzI3YzAwMThkM2EyYjYiLCJpYXQiOjE2OTYyNzUzMjUsImV4cCI6MTY5NzQ4NDkyNX0.vww_zKkpOGlO7u-I13sFxDxHeNkvp-lo54e_5w5ag84"
            }
        })
        displayEditProduct()
    } else {
        alert('Nessuna eliminazione')
    }
}

function editProduct(e, idpro) {
    e.preventDefault()

    alert('Stai modificando il prodotto con id' + idpro)
    rowCont.innerHTML = ""
    addProduct()
    fetch(API + idpro, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiMWI3YzM5MzI3YzAwMThkM2EyYjYiLCJpYXQiOjE2OTYyNzUzMjUsImV4cCI6MTY5NzQ4NDkyNX0.vww_zKkpOGlO7u-I13sFxDxHeNkvp-lo54e_5w5ag84"
        }
    }).then(r => r.json())
        .then(selectedProduct)

    function selectedProduct(p) {
        console.log(p)
        const { name, description, imageUrl, brand, price } = p
        nameP.value = name
        descrP.value = description
        imgP.value = imageUrl
        brandP.value = brand
        priceP.value = price

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
            <div class="col-6 col-md-4 col-lg-3 d-flex flex-column align-items-center mb-2">
                <div id="${_id}" class="card w95">
                    <img src="${imageUrl}" class="card-img-top" height="180" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${brand}</p>
                        <p class="card-text text-truncate">${description}</p>
                        <p id="priceProduct">${price}€</p>
                        <a href="" onclick="editProduct(event, '${_id}')" class="btn btn-secondary">
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