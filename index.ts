let product:HTMLCollection=document.getElementsByClassName("product")
let price:any=document.getElementsByClassName("price")
let title:any=document.getElementsByClassName("title")
let image:any=document.getElementsByClassName("image")
let buy:any=document.getElementsByClassName("buy")
let total:any=document.getElementById("total")
let card:any=document.getElementById("card")
let BuyNow=document.querySelector(".BuyNow") as HTMLButtonElement

interface User {
    id: number;
    title: string;
    price:number;
    image: string;
    quantity:number
  }
let products:any[] =[]
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then((data:User []) => {
    for(let i=0;i<data.length;i++){
      data[i].quantity=1
      price[i].innerHTML=data[i].price.toFixed(2);
      title[i].innerHTML=data[i].title;
      image[i].src=data[i].image;
     buy[i].addEventListener("click",function():void{
      let newProduct = {
        Price:price[i].innerHTML,
        Title:title[i].innerHTML,
        Image:image[i].src,
        Quantity:data[i].quantity
        
      }
      products.push(newProduct)
      getTotal()
      showITem()
     })
    }
  })
  .catch(error => {
    console.error(error);
  });
let Total:number=0
function showITem():void{
  let item=``
  for (let i=0;i<products.length;i++){
      item+=`
        <img class="cardImage" src="${products[i].Image}" />
        <p class="cardTitle">${products[i].Title}</p>
        <p class = "cardPrice">${products[i].Price}</p>
        <button class="increase" onclick=increaseITems(${i})>+</button>
        <button class="deleteItem" onclick=deleteElement(${i})>X</button>
        <button class="decrease" onclick=decreaseITems(${i})>-</button>
        <hr></hr>
      `
  }
  card.innerHTML=item
}
function getTotal ():void{
  Total+=+products[products.length-1].Price
  total.innerHTML=+Total.toFixed(2)
}
function deleteElement(i:number):void{
  Total-=+products[i].Price*+products[i].Quantity
  total.innerHTML=+Total.toFixed(2)
  products.splice(i,1);
  showITem()
}
function increaseITems(i:number):void{
  products[i].Quantity++;
  Total+=+products[i].Price
  total.innerHTML=Total.toFixed(2)
}
function decreaseITems(i:number):void{
  products[i].Quantity--;
  if(products[i].Quantity<1){
    products[i].Quantity=1
  }
  else {
    Total-=+products[i].Price
    total.innerHTML=Total.toFixed(2)
  }
}
BuyNow.onclick=function (){
  alert(`your total is ${Total.toFixed(2)}`)
  card.innerHTML=``
  products=[]
  Total=0
  total.innerHTML=Total
}