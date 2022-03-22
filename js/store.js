"use strict";

/* start selects */

const dropdownEls = document.querySelectorAll(".dropdown-el");

dropdownEls.forEach((dropdownEl) => {
  dropdownEl.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropdownEl.classList.toggle("expanded");

    if (dropdownEl.querySelector("#" + e.target.getAttribute("for"))) {
      dropdownEl.querySelector(
        "#" + e.target.getAttribute("for")
      ).checked = true;
    }
  });
});

document.addEventListener("click", ({ target }) => {
  dropdownEls.forEach((dropdownEl) => {
    dropdownEl.classList.remove("expanded");
  });
});

/* end selects */

/* start click on add to cart */
const store = document.getElementById("store"),
  addToCarts = document.querySelectorAll(".product__add");
let cartNum = document.getElementById("cart_num");

addToCarts.forEach((addToCart) => {
  const addToCartCircle = addToCart.lastElementChild;
  addToCart.addEventListener("click", () => {
    if (!addToCartCircle.classList.contains("show")) {
      addToCartCircle.classList.add("show");
      addToCart.firstElementChild.innerHTML = `Take it back`;
      cartNum.innerHTML++;
    } else {
      addToCartCircle.classList.remove("show");
      addToCart.firstElementChild.innerHTML = `add to card`;
      cartNum.innerHTML--;
    }
  });
});
/* end click on add to cart */

/* start cart */

const cart = document.getElementById("cart"),
  counter__ups = document.querySelectorAll(".counter__up"),
  counter__downs = document.querySelectorAll(".counter__down"),
  cash = document.querySelector("#cash"),
  payment__inps = document.querySelectorAll(".payment__inp"),
  slice__removes = document.querySelectorAll(".slice__remove"),
  totalPrice = document.querySelector("#totalPrice");

// update price function
function updatePrice() {
  const items = document.querySelectorAll(".slice:not(.hidden)");
  const itemPrices = [];
  items.forEach((item) => {
    const itemPrice =
      item.querySelector(".slice__price--num").innerHTML *
      item.querySelector(".counter__num").innerHTML;
    itemPrices.push(itemPrice);
  });
  if (cash.checked) {
    itemPrices.push(+cash.dataset.cost);
  }

  let total = 0;
  itemPrices.map((price) => {
    total += price;
  });

  totalPrice.innerHTML = total.toFixed(2);

  totalPrice.classList.add("animate");

  setTimeout(() => {
    totalPrice.classList.remove("animate");
  }, 1000);
}
if (cart) {
  updatePrice();
}
// cart.onclick = updatePrice

//remove slide
slice__removes.forEach((slice__remove) => {
  slice__remove.addEventListener("click", () => {
    slice__remove.closest(".slice").classList.add("hidden");
    updatePrice();
  });
});

// up and down
counter__ups.forEach((counter__up) => {
  counter__up.addEventListener("click", () => {
    counter__up.nextElementSibling.innerHTML++;
    if (counter__up.closest(".cart")) {
      updatePrice();
    }
    if (counter__up.closest("#productSec__text")) {
      updateProductPrice();
    }
  });
});

counter__downs.forEach((counter__down) => {
  counter__down.addEventListener("click", () => {
    if (counter__down.previousElementSibling.innerHTML > 1) {
      counter__down.previousElementSibling.innerHTML--;
      if (counter__down.closest(".cart")) {
        updatePrice();
      }
      if (counter__down.closest("#productSec__text")) {
        updateProductPrice();
      }
    }
  });
});

// cash state change
payment__inps.forEach((payment__inp) => {
  payment__inp.addEventListener("change", updatePrice);
});

/* start product page */

const productSec__text = document.getElementById("productSec__text"),
  productSec__price = document.getElementById("productSec__price"),
  selection__selects = document.querySelectorAll(".selection__select"),
  finalProductPrice = document.querySelector("#finalProductPrice"),
  counter__num = document.getElementById("counter__num");

// update price function
function updateProductPrice() {
  let total = 0;

  selection__selects.forEach((selection__select) => {
    total += +selection__select.value;
  });

  total = (+productSec__price.dataset.price + total) * +counter__num.innerHTML;

  finalProductPrice.innerHTML = total.toFixed(2);

  finalProductPrice.classList.add("animate");

  setTimeout(() => {
    finalProductPrice.classList.remove("animate");
  }, 1000);
}
if (productSec__text) {
  updateProductPrice();
}
// cart.onclick = updateProductPrice

// cash state change
selection__selects.forEach((selection__select) => {
  selection__select.addEventListener("change", () => {
    updateProductPrice();
  });
});

//////////////////////////
//add a review

//change form order
const allReviews = document.getElementById("allReviews"),
  btns = document.querySelectorAll(".review__reply"),
  productForm = document.getElementById("productForm"),
  productForm__title = document.getElementById("productForm__title")

if(allReviews) {
    let order = 1;
for (let child of allReviews.children) {
  child.style.order = order;
  order++;
}

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const parent = btn.closest(".review");

    if (!btn.classList.contains("came")) {
      let order2 = 1;
      for (let child of allReviews.children) {
        if (child === parent) {
          allReviews.lastElementChild.style.order = order2;
          btns.forEach((btn2) => {
            btn2.classList.remove("came");
            btn2.innerHTML = `reply`;
          });
          btn.classList.add("came");
          btn.innerHTML = `cancel reply`;
          productForm__title.innerHTML = `reply to ${btn.closest('.review__right').querySelector('.review__nm').innerHTML}`

          scroll({
            top: productForm.offsetTop,
            behavior: "smooth"
          });
        //   window.scroll(0, productForm.offsetTop);
        }
        order2++;
      }
    } else {
      allReviews.lastElementChild.style.order = order - 1;
      btn.classList.remove("came");
      btn.innerHTML = `reply`;
      productForm__title.innerHTML = `add review`
    }
  });
});
}


//stars animation
const productForm__stars = document.getElementById('productForm__stars');

if(productForm__stars){
    const AllProductForm__stars = Array.from(productForm__stars.children)
    AllProductForm__stars.forEach(star=>{
    
      star.addEventListener('click', ()=>{
        
        AllProductForm__stars.forEach(starsWillBeGray=>{
          starsWillBeGray.classList.remove('active')
        })
        const willBeActive = AllProductForm__stars.slice(0, AllProductForm__stars.indexOf(star)+1);
        willBeActive.forEach(starsWillBeActive=>{
          starsWillBeActive.classList.add('active')
        })
        productForm__stars.setAttribute('data-value', willBeActive.length)
        // console.log(willBeActive.length)
      })
    })
}
      
/* end product page */

/* end cart */
