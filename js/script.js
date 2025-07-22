var cart = [];

function buy_verify(){
    location.href = "../index.html";
    console.log("Redirecting to Google for verification.");
    
}
function close_buyingmenu(){
    $('#buyingmenu').css('visibility', 'hidden');
    console.log("Buying menu closed.");
}

function buy(itemId){
    cart[itemId] = (cart[itemId] || 0) + 1;
    console.log("Item " + itemId + " added to cart. Total: " + cart[itemId]);
    $('#buyingmenu').css('visibility', 'visible');
}

window.addEventListener('load', function () {
var $button = document.querySelector('.toggle-menu-button');
var $menu = document.querySelector('.header-site-menu');
$button.addEventListener('click', function () {
if ($menu.classList.contains('is-show')) {
$menu.classList.remove('is-show');
}
else {
$menu.classList.add('is-show');
}
});
});