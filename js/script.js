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