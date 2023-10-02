//Endpoint https://striveschool-api.herokuapp.com/api/product/

const api='https://striveschool-api.herokuapp.com/api/product/'

async function loadProduct() {
    const risp = await fetch(api, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiMWI3YzM5MzI3YzAwMThkM2EyYjYiLCJpYXQiOjE2OTYyNzUzMjUsImV4cCI6MTY5NzQ4NDkyNX0.vww_zKkpOGlO7u-I13sFxDxHeNkvp-lo54e_5w5ag84"
        }
    })
    const prodotti = await risp.json()
    return prodotti
}

window.onload = async function () {
    const AllProducts = await loadProduct()
    console.log(AllProducts)
}

let prova={name:'Magic', description:'super',brand:'Honor', imageUrl:'https://images.pexels.com/photos/1647976/pexels-photo-1647976.jpeg',price:99}

console.log(prova)

// insertProduct(prova)


async function insertProduct(dataInsert) {
    const addProduct = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method:'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiMWI3YzM5MzI3YzAwMThkM2EyYjYiLCJpYXQiOjE2OTYyNzUzMjUsImV4cCI6MTY5NzQ4NDkyNX0.vww_zKkpOGlO7u-I13sFxDxHeNkvp-lo54e_5w5ag84"
        },
        body: JSON.stringify(dataInsert)
        
    })
    return addProduct
}