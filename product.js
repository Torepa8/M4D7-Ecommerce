const params = new URLSearchParams(window.location.search);
const idProduct = params.get("idP")

// console.log(idProduct)

fetch("https://striveschool-api.herokuapp.com/api/product/" + idProduct, {
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiMWI3YzM5MzI3YzAwMThkM2EyYjYiLCJpYXQiOjE2OTc5MzQ2NzUsImV4cCI6MTY5OTE0NDI3NX0.fX9QwwR6dJ38iOaDgeB5B1IHixO7O3_EmAxpypOKWrE"
    }
})
    .then(r => r.json())
    .then(loadProductDeatils)

const productDetails = document.querySelector("#productDetails")
const nameProduct=document.querySelector("#nameProduct")

function loadProductDeatils(product) {
    const { name, description, brand, imageUrl, price}=product
    // console.log(product)
    nameProduct.innerHTML=`${brand} - ${name} `

    productDetails.innerHTML= /*html*/ `
        <div class="col-6">
            <img src="${imageUrl}" height="300">
        </div>
        <div class="col-6">
            <p> ${description} </p>
            <p> ${price} €</p>
        </div>
        

    `
}