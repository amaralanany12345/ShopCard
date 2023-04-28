"use strict";
let product = document.getElementsByClassName("product");
let price = document.getElementsByClassName("price");
let title = document.getElementsByClassName("title");
let image = document.getElementsByClassName("image");
let buy = document.getElementsByClassName("buy");
let total = document.getElementById("total");
let card = document.getElementById("card");
let BuyNow = document.querySelector(".BuyNow");
let products = [];
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then((data) => {
    for (let i = 0; i < data.length; i++) {
        data[i].quantity = 1;
        price[i].innerHTML = data[i].price.toFixed(2);
        title[i].innerHTML = data[i].title;
        image[i].src = data[i].image;
        buy[i].addEventListener("click", function () {
            let newProduct = {
                Price: price[i].innerHTML,
                Title: title[i].innerHTML,
                Image: image[i].src,
                Quantity: data[i].quantity
            };
            products.push(newProduct);
            getTotal();
            showITem();
        });
    }
})
    .catch(error => {
    console.error(error);
});
let Total = 0;
function showITem() {
    let item = ``;
    for (let i = 0; i < products.length; i++) {
        item += `
        <img class="cardImage" src="${products[i].Image}" />
        <p class="cardTitle">${products[i].Title}</p>
        <p class = "cardPrice">${products[i].Price}</p>
        <button class="increase" onclick=increaseITems(${i})>+</button>
        <button class="deleteItem" onclick=deleteElement(${i})>X</button>
        <button class="decrease" onclick=decreaseITems(${i})>-</button>
        <hr></hr>
      `;
    }
    card.innerHTML = item;
}
function getTotal() {
    Total += +products[products.length - 1].Price;
    total.innerHTML = +Total.toFixed(2);
}
function deleteElement(i) {
    Total -= +products[i].Price * +products[i].Quantity;
    total.innerHTML = +Total.toFixed(2);
    products.splice(i, 1);
    showITem();
}
function increaseITems(i) {
    products[i].Quantity++;
    Total += +products[i].Price;
    total.innerHTML = Total.toFixed(2);
}
function decreaseITems(i) {
    products[i].Quantity--;
    if (products[i].Quantity < 1) {
        products[i].Quantity = 1;
    }
    else {
        Total -= +products[i].Price;
        total.innerHTML = Total.toFixed(2);
    }
}
BuyNow.onclick = function () {
    alert(`your total is ${Total.toFixed(2)}`);
    card.innerHTML = ``;
    products = [];
    Total = 0;
    total.innerHTML = Total;
};
