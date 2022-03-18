"use strict";

/* start selects */

const dropdownEls = document.querySelectorAll(".dropdown-el");

dropdownEls.forEach((dropdownEl) => {
  dropdownEl.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropdownEl.classList.toggle("expanded");

    if(dropdownEl.querySelector("#" + e.target.getAttribute("for"))){
        dropdownEl.querySelector("#" + e.target.getAttribute("for")).checked = true;
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
const store = document.getElementById('store'),
        addToCarts = store.querySelectorAll('.product__add');
let cartNum = document.getElementById('cart_num');
        

addToCarts.forEach(addToCart=>{
    const addToCartCircle = addToCart.firstElementChild;
    addToCart.addEventListener('click', ()=>{
        if(!addToCartCircle.classList.contains('show')){
            addToCartCircle.classList.add('show');
            cartNum.innerHTML++
            console.log(cartNum.innerHTML);
        }
        
    })


})
/* end click on add to cart */