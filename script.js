//Endpoint https://striveschool-api.herokuapp.com/api/product/

const api = 'https://striveschool-api.herokuapp.com/api/product/'
const nameProduct = document.querySelector('#nameProduct')
const descrProduct = document.querySelector('#descrProduct')
const brandProduct = document.querySelector('#brandProduct')
const imgProduct = document.querySelector('#imgProduct')
const priceProduct = document.querySelector('#priceProduct')
const rigaCard = document.querySelector('#rigaCard')

async function loadProduct() {
    const risp = await fetch(api, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3ZjlkMzc3Y2RhYTAwMTQ2ZGYzODIiLCJpYXQiOjE2OTgxNjcyNTIsImV4cCI6MTY5OTM3Njg1Mn0.F1WGzQ8_kui5LLDefDSgxqBx32KYZ1bXeRTRTc4mE-w"
        }
    })
    const prodotti = await risp.json()
    return prodotti
}

window.onload = async function () {
    rigaCard.innerHTML += /*html*/ `
    <span class="loader"></span>
    `
    try {
        const AllProducts = await loadProduct()
        console.log(AllProducts)
        document.querySelector('.loader').remove()
        AllProducts.forEach(element => {
        const { _id, name, description, brand, imageUrl, price } = element

            rigaCard.innerHTML += /*html*/ `
        <div class="col-6 col-md-4 col-lg-3 d-flex flex-column align-items-center mb-2">
        <a href="product.html?idP=${_id}">
            <div class="card w95">
                <img src="${imageUrl}" class="card-img-top" height="180" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${brand}</p>
                    <p class="card-text text-truncate">${description}</p>
                    <p id="priceProduct">${price}€</p>
                    <a href="#" class="btn btn-primary">Add To Cart</a>
                </div>
            </div>
        </a>
        </div>
    `
        })

    }
    catch (error){
        alert('Errore nel caricamento')
        document.querySelector('.loader').remove()
    }
}


// let prova = { name: 'Honor Magic 5', description: 'super', brand: 'Honor', imageUrl: 'https://images.pexels.com/photos/1647976/pexels-photo-1647976.jpeg', price: 99 }

// console.log(prova)

// insertProduct(prova)



async function insertProduct(dataInsert) {
    const addProduct = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3ZjlkMzc3Y2RhYTAwMTQ2ZGYzODIiLCJpYXQiOjE2OTgxNjcyNTIsImV4cCI6MTY5OTM3Njg1Mn0.F1WGzQ8_kui5LLDefDSgxqBx32KYZ1bXeRTRTc4mE-w"
        },
        body: JSON.stringify(dataInsert)
    })
    return addProduct
}