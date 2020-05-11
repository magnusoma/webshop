var productList = [];
var cart = [];
var cartEl = document.getElementById('cartIkon');
var productListOutput = document.getElementById('productContainer');

RenderProductlist();
RenderCart();

function AddToCart(index){
    cart = JSON.parse(window.localStorage.getItem("cart")) || [];
    if(AlreadyInCart(index) == "no"){
        const item = {name: productList[index].name, price: productList[index].price, qty: 1}
        cart.push(item);
    }else{
        cart[AlreadyInCart(index)].qty += 1;
    }

    window.localStorage.setItem("cart", JSON.stringify(cart));
    RenderCart();
}

function AlreadyInCart(index){
        var itemIndex = "no";
        for(var i = 0; i < cart.length; i++){
        if(cart[i].name == productList[index].name){itemIndex = i;}
        }
        return itemIndex;

    }

function RenderCart(){
    var totalQty = 0;
    cart = JSON.parse(window.localStorage.getItem("cart")) || [];
    for(const product of cart){
        totalQty += product.qty;
    }
    cartEl.innerHTML = `Cart: ${totalQty}`;
}

function RenderProductlist(){
    var htmlTxt;
    productListOutput.innerHTML = "";
    productList = JSON.parse(window.localStorage.getItem("productList")) || [];
    var i = 0;
    for(const product of productList){
        const productEl = document.createElement('div');
        productListOutput.appendChild(productEl);
        if(product.image){ 
            htmlTxt =
            `<h4 onclick="AddToCart('${i}');">${product.name}</h4>
            <img src="../${product.image}"/> 
            <p>Price: ${product.price}</p>`;
        }else{
            htmlTxt =
            `<h4 onclick="AddToCart('${i}');">${product.name}</h4>
            <p>Price: ${product.price}</p>`;
        }
        productEl.innerHTML = htmlTxt;
        i++;
    }

}

window.addEventListener("storage", function(event){
    if(event.key === "productList"){
        RenderProductlist();
        RenderCart();
    }
});