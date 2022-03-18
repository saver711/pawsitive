"use strict";

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


/* 
const others = Array.from(dropdownEls).filter(e=>{
        e !== dropdownEl
    })
    others.forEach((el) => {
      el.classList.remove("expanded");
    });
*/