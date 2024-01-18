let toggler = document.querySelector(".toggle");
let nav = document.querySelector("nav");
let close = document.querySelector(".close");

toggler.onclick = function () 
{
  nav.classList.add("open");
};

close.onclick = function ()
{
  this.parentElement.classList.remove("open");
};

document.onkeyup = function (e) 
{
  // console.log(e);
  if (e.key === "Escape") {
    nav.classList.remove("open");
  }
};


// scroller
let el = document.querySelector(".scroller");

 
window.addEventListener("scroll",() => {
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolltop = document.documentElement.scrollTop;
    el.style.width = `${(scrolltop/height)*100}%`;
    

});

/////////////////////////////////////
////// Catch the el
////////////////////////////////////

let cart_icon = document.querySelector("#cart")

let products_div = document.querySelector(".products")
let container_div_P = document.querySelector("#P-container")
let products_box_div = document.querySelector(".products-box")


let categories_div = document.querySelector(".categories")
let container_div_C = document.querySelector("#C-container")
let categories_box_div = document.querySelector(".categories-box")



/////////////////////////////////////
////// fetch productas 
////////////////////////////////////

let count = 4;
for(let i = 0 ; i<count ; i++ )
{
  fetch(`https://fakestoreapi.com/products/category/jewelery`)
  .then((result) =>
  {
    let mydata =  result.json();    
    return mydata;
  })
  .then((products) =>
  {
////// Create the els
  //////////////////

  let product_div = document.createElement("div")
  let img_div = document.createElement("div")
  let img = document.createElement("img")
  let info_div = document.createElement("div")
  let title_ = document.createElement("h3")
  let category_ = document.createElement("h4")
  let apout_ = document.createElement("p")
  let price_ = document.createElement("h4")
  let rate_ = document.createElement("h5")
  let button = document.createElement("button")


  ////// Create classNames
  //////////////////
  product_div.className = "product"
  img_div.className = "img"
  info_div.className = "info"
  

  // append src to img
  img.src = products[i].image

  /// append img to div
  img_div.appendChild(img)

  ////// Create text node and append it to els
  //////////////////
  title_.appendChild(document.createTextNode(products[i].title))
  category_.appendChild(document.createTextNode(products[i].category))
  // apout_.innerHTML= products[i].description
  price_.appendChild(document.createTextNode(products[i].price + "$"))
  rate_.appendChild(document.createTextNode((products[i].rating.count!== 0 ?`(${products[i].rating.count} reviews)`:"No Reviews Yet!")))
  rate_.appendChild(document.createTextNode((products[i].rating.count!==0 ? (products[i].rating.rate/products[i].rating.count).toFixed(1)+ "/5 ("+products[i].rating.count+" ratings)": "No rating yet")))
  button.appendChild(document.createTextNode("ADD To Cart"))
  
  /////// append el to el 
  ///***************  
  info_div.appendChild(title_)
  info_div.appendChild(category_)
  info_div.appendChild(apout_)
  info_div.appendChild(price_)
  info_div.appendChild(rate_)
  info_div.appendChild(button)
  

  product_div.appendChild(img_div)
  product_div.appendChild(info_div)

  products_box_div.appendChild(product_div)
  container_div_P.appendChild(products_box_div)
  products_div.appendChild(container_div_P)
  })  
}