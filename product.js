const params = new URLSearchParams(window.location.search);
const idProduct = params.get("idP")

// console.log(idProduct)

fetch("https://striveschool-api.herokuapp.com/api/product/" + idProduct, {
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3ZjlkMzc3Y2RhYTAwMTQ2ZGYzODIiLCJpYXQiOjE2OTgxNjcyNTIsImV4cCI6MTY5OTM3Njg1Mn0.F1WGzQ8_kui5LLDefDSgxqBx32KYZ1bXeRTRTc4mE-w"
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