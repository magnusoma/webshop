var cart = [];
var cartEl = document.getElementById('cartContainer');

RenderCart();


/* AddToCart(index){
    cart = JSON.parse(window.localStorage.getItem("cart")) || [];
    cart.push(productList[index]);
    window.localStorage.setItem("cart", JSON.stringify(cart));
    RenderCart();
}*/

function RenderCart(){
    var totalPrice = 0;
    var totalQty = 0;
    const cartTable = document.createElement('table');
    cartEl.appendChild(cartTable);
    cartTable.innerHTML =
    `<tr>
    <th>Items</th>
    <th>Price</th>
    <th>Antall</th>
    </tr>`;

    cart = JSON.parse(window.localStorage.getItem("cart")) || [];
    for (var i = 0; i < cart.length; i++) {
        totalPrice += parseInt(cart[i].price);
        totalQty += parseInt(cart[i].qty);
        var productRow = document.createElement('tr');
        cartTable.appendChild(productRow);
        productRow.innerHTML += 
        `<td>${cart[i].name}</td>
        <td>${cart[i].price}</td>
        <td>${cart[i].qty}</td>`;
    }

    var footerRow = document.createElement('tr');
        cartTable.appendChild(footerRow);
        footerRow.innerHTML += 
        `<td>Total</td>
        <td>${totalPrice}</td>
        <td>${totalQty}</td>`;
}

/*function RenderProductlist(){
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

}*/

window.addEventListener("storage", function(event){
    if(event.key === "productList"){
        RenderProductlist();
        RenderCart();
    }
});