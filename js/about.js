"use strict";

window.onload = function () {
  commonJs();

  // start  invest__cart
  const invest__clickables = document.querySelectorAll(".invest__clickable");

  invest__clickables.forEach((invest__clickable) => {
    invest__clickable.addEventListener("click", () => {
      const invest__carts = document.querySelectorAll(".invest__cart"),
        filteredInvest__carts = Array.from(invest__carts).filter(
          (item) => item !== invest__clickable.parentElement
        ),
        plusIcon = invest__clickable.querySelector('.cart__plus');
      filteredInvest__carts.forEach((invest__cart) => {
        invest__cart.classList.remove("active")
         const otherPlusIcon = invest__cart.querySelector('.cart__plus');
         otherPlusIcon.classList.remove('fa-minus');
         otherPlusIcon.classList.add('fa-plus')
      }
        
      );

      if(plusIcon.classList.contains('fa-plus')) {
        plusIcon.classList.remove('fa-plus')
        plusIcon.classList.add('fa-minus')
      } else{
        plusIcon.classList.remove('fa-minus')
        plusIcon.classList.add('fa-plus')
      }

      

      invest__clickable.parentElement.classList.toggle("active");
    });
  });

  // end  invest__cart
  //1
  //
  //
  //
  //
};

