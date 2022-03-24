"use strict";

window.onload = function () {



  // /////////////////start inspiration
  //inspiration card vars
  const close = document.querySelector(".inspiration__close"),
    inspiration = document.querySelector(".inspiration");

  //close inspiration card onclick
  close.addEventListener("click", () => {
    inspiration.classList.add("gone");
    setTimeout(() => {
      inspiration.remove();
    }, 700);
  });

  //auto close inspiration card
  let autoCloseIspirationCard = setTimeout(closeInspirationFun, 2300);
  function closeInspirationFun() {
    inspiration.classList.add("gone");
    setTimeout(() => {
      inspiration.remove();
    }, 700);
  }

  inspiration.addEventListener("mouseenter", () => {
    clearTimeout(autoCloseIspirationCard);
  });

  inspiration.addEventListener("mouseleave", () => {
    autoCloseIspirationCard = setTimeout(closeInspirationFun, 2300);
  });

  // /////////////////end inspiration

  //
  //
  //
  //
  //
  //

  

  //start prices
  class Prices {
    constructor(container) {
      this.container = container;
      this.spans = `<div class="price_card__price--column">
      <div class="price_card__price--nums">
        <span class="price_card__price--digit">0</span>
        <span class="price_card__price--digit">1</span><span class="price_card__price--digit">2</span><span
          class="price_card__price--digit">3</span><span class="price_card__price--digit">4</span><span
          class="price_card__price--digit">5</span><span class="price_card__price--digit">6</span><span
          class="price_card__price--digit">7</span><span class="price_card__price--digit">8</span><span
          class="price_card__price--digit">9</span>
      </div>
      
    </div>`;
        this.containerDataset = this.container.dataset.price
        this.containerDatasetArr = this.containerDataset.split('')
    }

    loopingIntoDataLength() {
      for(let i = 0; i < this.containerDatasetArr.length; i++){
        this.container.innerHTML+= this.spans;
        
        window.addEventListener('scroll', ()=>{
          const numsOffset = this.container.querySelectorAll('.price_card__price--nums')[0].getBoundingClientRect().top,
        windowHeight = window.innerHeight;
          if(numsOffset - windowHeight <= 0){
            this.container.querySelectorAll('.price_card__price--nums')[i].classList.add('animate')
        this.container.querySelectorAll('.price_card__price--nums.animate')[i].style.transform = `translateY(${-4.2 * Number(this.containerDatasetArr[i])}em)`
          }
        })
      }
    }

    handleAll() {
      this.loopingIntoDataLength();
      // this.transformNums()
    }
  }

  let pricesAnimations = document.querySelectorAll(".price_card__price");

  pricesAnimations.forEach((pricesAnimation) => {
    const Prices_price = new Prices(pricesAnimation);
    Prices_price.handleAll();
  });

  // end prices

  /* start popup */
  const popupOver = document.getElementById('popupOver'),
        popupLeft = document.getElementById('popupLeft'),
        popupRight = document.getElementById('popupRight'),
        popup = document.getElementById('popup'),
        popupClose = document.getElementById('popupClose')

  popupOver.addEventListener('click', ()=>{
    popupOver.classList.add('hide')
    popupLeft.classList.add('animate')
    popupRight.classList.add('animate')
  })

  // hide popup
  popup.addEventListener('click', ({target})=>{
    if(!target.closest('.popup__inner')){
      popup.style.display = `none`
    }
  })

  popupClose.addEventListener('click', ()=>{
    popupClose.closest('#popup').style.display = `none`
  })
  /* end popup */

  //1
  //
  //
  //
  //
};

