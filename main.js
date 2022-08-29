//cart
let cartIcon = document.querySelector('.ViewCart');
let cart = document.querySelector('.Cart');
let closeCart = document.querySelector('.Close_cart');
//opens cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};
//closes cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};
// cart working js
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}
else{
    ready();
}
//making functions
function ready(){
    //Remove Items from cart
    var removeCartButtons = cart.getElementsByClassName("Delete_product");
for (var i =0; i<removeCartButtons.length; i++){
    var button = removeCartButtons[i];
   button.addEventListener("click", removeCartItem);
}
}
//remove Items from cart
function removeCartItem(event){
var buttonClicked = event.target
buttonClicked.parentElement.remove();
UpdateTotal();
}
//Add To Cart
var addToCartButtons = document.getElementsByClassName("AddToCart");
for(var i = 0; i < addToCartButtons.length; i++){
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCart);
}
function addToCart(event){
    var button = event.target;
    var shopItems = button.parentElement;
    var title = shopItems.querySelector(".product_title").innerText;
    var price = shopItems.querySelector(".Price").innerText;
    var productImage = shopItems.querySelector(".product_image").src;
    addProductToCart(title, price, productImage);
    UpdateTotal();
}
function addProductToCart(title, price, productImage){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("Cart_box");
    var cartItems = document.querySelector(".Cart_content");
    var CartItemImg = cartItems.getElementsByClassName("Cart_image");
    for(var i= 0; i<CartItemImg.length; i++){
       if(CartItemImg[i].src == productImage){
            alert("You have already added this item");
            return;
       }
    }
var cartBoxContent = `
        <img src= "${productImage}" alt=" " class="Cart_image">
          <div class="Product_detail">
            <div class="Product_title">${title}</div>
            <div class="Product_price">${price}</div>
            <input type="number" value='1' class="Product_quantity">
          </div>
          <img src="icon/bin.png" class="Delete_product" alt="RemoveFromCart"></img>`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.appendChild(cartShopBox);
cartShopBox.querySelector(".Delete_product").addEventListener("click", removeCartItem);
cartShopBox.querySelector(".Product_quantity").addEventListener("change", quantityChanged);
}
//update quantites
var quantityInputs = document.getElementsByClassName("Product_quantity")
for(var i= 0; i<quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
}
function quantityChanged(event){
    input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    UpdateTotal();
}
// Update total
function UpdateTotal(){
    var cartContent = cart.querySelector(".Cart_content");
    var cartBoxes = cartContent.getElementsByClassName("Cart_box");
   var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var productPrice = parseInt(cartBox.querySelector(".Product_price").innerText);
        var productQuantity = cartBox.querySelector(".Product_quantity").value;
        total = total + (productPrice*productQuantity);
    }
document.getElementsByClassName("Total_price")[0].innerText = total;
}