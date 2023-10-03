const passAdmin=document.querySelector('#passwordAdmin')
const inputContainer=document.querySelector('#inputContainer')

function controlloPassword(){
    alert(passAdmin.value)
    if(passAdmin.value==="sonoio"){
        inputContainer.classList.add("d-flex")
        alert('OK')
    }
}



// function dataInsert(){
//     if(login){
//         const dati={ name: ${}, description: 'super', brand: 'Honor', imageUrl: 'https://images.pexels.com/photos/1647976/pexels-photo-1647976.jpeg', price: 99 }


//     }
// }