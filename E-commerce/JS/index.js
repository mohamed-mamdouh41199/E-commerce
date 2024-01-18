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


// ------------
// fetch data
// let count = 6;
// fetch(`https://fakestoreapi.com/products?limit=${count}`)
// .then((result) =>
// {
//     // console.log(result)  //--> TO CHECK THE FETCH IS OK 
//     let mydata =  result.json();    
//     return mydata;
// })

// .then((products) =>
// {
//   console.log(products)
//   for(let i = 0 ; i < count ; i++ )
//   {  
//     console.log("---------------------------------------");
//     console.log(`-----product ${i+1} details:------`);
//     console.log(products[i].id)
//     console.log(products[i].title)
//     console.log(products[i].price)
//     console.log(products[i].description)
//     console.log(products[i].category)
//     console.log(products[i].image)
//     console.log(products[i].rating["count"])
//     console.log(products[i].rating["rate"])
//   } 
// })

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


///////////////////////////////
// //// cart
//////////////
cart_icon.onclick = function()
{
  fetch(`https://fakestoreapi.com/carts/user/2`)
.then((result) =>
{
    // console.log(result)  //--> TO CHECK THE FETCH IS OK 
    let mydata =  result.json();    
    return mydata;
})
.then((cart) =>
{
  console.log("-----Cart:------");
  console.log(cart)
})
}

/////////////////////////////////////
////// Create the Products
////////////////////////////////////

// get random number from 0 to 13
let r = Math.ceil(Math.random()*(10-1)+1)
let count = r+6;

for(let i = r ; i<count ; i++ )
{
  fetch(`https://fakestoreapi.com/products?limit=${count}`)
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
  // info_div.appendChild(price_)
  // info_div.appendChild(rate_)
  // info_div.appendChild(button)
  

  product_div.appendChild(img_div)
  product_div.appendChild(info_div)

  products_box_div.appendChild(product_div)
  container_div_P.appendChild(products_box_div)
  products_div.appendChild(container_div_P)
  })  
}

/////////////////////////////////////
////// Create the Categories
////////////////////////////////////
img_src_arr = ['./assets/images/E.jpg' , './assets/images/J.jpg' , './assets/images/M.jpg' , './assets/images/W.jpg']
html_srs_arr = ['./electronics.html' , './jew.html' , './men.html' , './women.html']

for(let i = 0 ; i<4 ; i++ )
{
  fetch(`https://fakestoreapi.com/products/categories`)
  .then((result) =>
  {
    let mydata =  result.json();    
    return mydata;
  })
  .then((categories) =>
  {

  ////// Create the els
  //////////////////

  let category_div = document.createElement("div")
  let img_div = document.createElement("div")
  let img = document.createElement("img")
  let text_div = document.createElement("div")
  let anchor = document.createElement("a")
  let title_ = document.createElement("h3")
  
  


  ////// Create classNames
  //////////////////
  category_div.className = "category"
  img_div.className = "img"
  text_div.className = "text"
  
  ////// Create attributes
  //////////////////
  // category_div.setAttribute("onclick" , `goto(${html_srs_arr[i]})`)

  // append src to img
  img.src = img_src_arr[i]

  // append page src 
  anchor.href = html_srs_arr[i]

  // append img to div
  img_div.appendChild(img)

  // append anchor to category div
  // category_div.appendChild(anchor)


  ////// Create text node and append it to els
  //////////////////
  
  title_.appendChild(document.createTextNode(categories[i].charAt(0).toUpperCase()+categories[i].slice(1)))

  anchor.appendChild(title_)
  

  
  /////// append el to el 
  ///***************  
  text_div.appendChild(anchor)
  img_div.appendChild(text_div)

  

  category_div.appendChild(img_div)
  // product_div.appendChild(info_div)

  categories_box_div.appendChild(category_div)
  container_div_C.appendChild(categories_box_div)
  categories_div.appendChild(container_div_C)
  })  
}

function goto(src)
{
  console.log(src)
}