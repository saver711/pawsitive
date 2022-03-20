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
        addToCarts = store?.querySelectorAll('.product__add');
let cartNum = document.getElementById('cart_num');
        

addToCarts?.forEach(addToCart=>{
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


/* start cart */

const cart = document.getElementById('cart');
if(cart){
    const cash = cart.querySelector('#cash'),
    payment__inps = cart.querySelectorAll('.payment__inp'),
    slice__removes = cart.querySelectorAll('.slice__remove'),
    counter__ups = cart.querySelectorAll('.counter__up'),
    counter__downs = cart.querySelectorAll('.counter__down'),
    totalPrice = cart.querySelector('#totalPrice')


// update price function
function updatePrice(){
    const items = cart.querySelectorAll('.slice:not(.hidden)')
    const itemPrices = [];
    items.forEach(item=>{
        const itemPrice = item.querySelector('.slice__price--num').innerHTML * item.querySelector('.counter__num').innerHTML
        itemPrices.push(itemPrice)
    })
    if(cash.checked) {
        itemPrices.push(+cash.dataset.cost)
    }

    let total = 0;
    itemPrices.map(price=>{
        total += price 
    })
    
    // console.log(total);
    totalPrice.innerHTML = total.toFixed(2);

    totalPrice.classList.add('animate');

    setTimeout(()=>{
        totalPrice.classList.remove('animate');
    }, 1000)
}
updatePrice();

// cart.onclick = updatePrice


//remove slide
slice__removes.forEach(slice__remove=>{
    slice__remove.addEventListener('click', ()=>{
        slice__remove.closest('.slice').classList.add('hidden');
        updatePrice();
    });

    
})

// up and down
counter__ups.forEach(counter__up=>{
    counter__up.addEventListener('click', ()=>{
        counter__up.nextElementSibling.innerHTML++
        updatePrice();
    })
})

counter__downs.forEach(counter__down=>{
    counter__down.addEventListener('click', ()=>{
        if(counter__down.previousElementSibling.innerHTML > 1){
            counter__down.previousElementSibling.innerHTML--
            updatePrice();
        }
        
    })
})

// cash state change
payment__inps.forEach(payment__inp=>{
    payment__inp.addEventListener('change', updatePrice)
})

}

/* end cart */