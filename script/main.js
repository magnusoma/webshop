var productList = [];
var cart = [];
var cartEl = document.getElementById('cart');
var productListOutput = document.getElementById('productContainer');

RenderProductlist();
RenderCart();


function RegisterNewProduct(){
    event.preventDefault();
    const name = document.querySelector("[name='name']").value;
    const price = document.querySelector("[name='price']").value;
    //const image = document.querySelector("[name='image']").files[0].name;
    const product = {name, price};
    console.log(product);

    productList = JSON.parse(window.localStorage.getItem("productList")) || [];
    productList.push(product);
    console.log(productList);

    window.localStorage.setItem("productList", JSON.stringify(productList));
    event.target.reset();
    RenderProductlist();
}

function AddToCart(index){
    cart = JSON.parse(window.localStorage.getItem("cart")) || [];
    cart.push(productList[index]);
    window.localStorage.setItem("cart", JSON.stringify(cart));
    RenderCart();
}

function RenderCart(){
    cart = JSON.parse(window.localStorage.getItem("cart")) || [];
    cartEl.innerHTML = `Cart: ${cart.length}`;
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
    }
});