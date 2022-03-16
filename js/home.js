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

  // start slider oop
  class Slides {
    constructor(container) {
      this.container = container;
      this.slides__elemntsArr = [];
      this.slideIndex = 1;
      (this.touchstartX = 0),
        (this.touchendX = 0),
        (this.dragStart = 0),
        (this.dragEnd = 0),
        (this.wheelStart = 0);
      this.sliderAutoplay = setInterval(this.nextSlide, 2000);
      this.scrollTop = 0;
      this.scrollLeft = 0;
    }

    createDots() {
      const dotsContainer = this.container.querySelector(".container-dots");
      this.slides__elemntsArr.map((slides__elmnt) => {
        let dot = document.createElement("div");
        dot.classList.add("dot");
        dotsContainer.appendChild(dot);
      });

      dotsContainer.firstElementChild.dataset.active = "true";
    }

    letSlidesInArr() {
      const slides__elmnts = this.container.querySelectorAll(".slides__elmnt");
      slides__elmnts.forEach((slides__elmnt) => {
        this.slides__elemntsArr.push(slides__elmnt);
      });
    }

    updateImageAndDot() {
      /* ...........Updating.............. */
      const slides = this.container.querySelector(".slides");
      const activeSlide = slides.querySelector("[data-active]");

      slides.children[this.slideIndex - 1].dataset.active = true;
      activeSlide && delete activeSlide.dataset.active;

      /* ...........Updating Dots.............. */
      const containerDots = this.container.querySelector(".container-dots");
      const activeDot = containerDots.querySelector("[data-active]");
      containerDots.children[this.slideIndex - 1].dataset.active = true;
      activeDot && delete activeDot.dataset.active;
    }

    moveDot(index) {
      this.slideIndex = index;
      this.updateImageAndDot();
    }

    triggerMoveDotWhenClickOnDot() {
      const dots = this.container
        .querySelector(".container-dots")
        .querySelectorAll("*")
        .forEach((dot, index) => {
          dot.addEventListener("click", () => {
            this.moveDot(index + 1);
          });
        });
    }

    nextSlide = () => {
      if (this.slideIndex !== this.slides__elemntsArr.length) {
        ++this.slideIndex;
      } else if (this.slideIndex === this.slides__elemntsArr.length) {
        this.slideIndex = 1;
      }
      this.updateImageAndDot();
    };

    // Slide Previous Button Click Event
    prevSlide = () => {
      if (this.slideIndex !== 1) {
        --this.slideIndex;
      } else if (this.slideIndex === 1) {
        this.slideIndex = this.slides__elemntsArr.length;
      }
      this.updateImageAndDot();
    };

    triggerNextOrPrevFunOnNextOrPrevIsClicked() {
      const nextBtn = this.container.querySelector(".next");
      nextBtn.addEventListener("click", this.nextSlide);
      const prevBtn = this.container.querySelector(".prev");
      prevBtn.addEventListener("click", this.prevSlide);
    }

    //start mousewheel

    handleMouseWheel() {
      this.container.addEventListener("wheel", (e) => {
        this.wheelStart = e.deltaY;
        this.handleGesture();
        this.wheelStart = 0;
      }, {passive: true});
    }

    // end mousewheel

    disableScroll() {
      // Get the current page scroll position
      this.scrollTop = window.scrollY || document.documentElement.scrollTop;
      (this.scrollLeft =
        window.scrollX || document.documentElement.scrollLeft),
        // if any scroll is attempted,
        // set this to the previous value
        (window.onscroll = (e) => {
          // e.preventDefault();
          window.scrollTo(this.scrollLeft, this.scrollTop);
        });
      document.body.classList.add("stop-scrolling");
    }

    enableScroll() {
      document.body.classList.remove("stop-scrolling");
      window.onscroll = function () {};
    }

    // //sliderAutoplay
    sliderAutoPlay() {
      this.container.addEventListener("mouseenter", () => {
        clearInterval(this.sliderAutoplay);
        this.disableScroll();
      });
      this.container.addEventListener("mouseleave", () => {
        this.enableScroll();
        this.sliderAutoplay = setInterval(this.nextSlide, 2000);
      });
    }

    // // start touch sliding & drag & wheel
    handleGesture() {
      if (
        this.touchendX < this.touchstartX ||
        this.dragEnd < this.dragStart ||
        this.wheelStart > 0
      )
        this.nextSlide();
      if (
        this.touchendX > this.touchstartX ||
        this.dragEnd > this.dragStart ||
        this.wheelStart < 0
      )
        this.prevSlide();
    }

    interActions() {
      //touch start
      this.container.addEventListener("touchstart", (e) => {
        clearInterval(this.sliderAutoplay);
        this.touchstartX = e.changedTouches[0].screenX;
      }, {passive: true});
      //drag start
      this.container.addEventListener("mousedown", (e) => {
        clearInterval(this.sliderAutoplay);
        this.dragStart = e.clientX;
      });
      //touch end
      this.container.addEventListener("touchend", (e) => {
        this.sliderAutoplay = setInterval(this.nextSlide, 2000);
        this.touchendX = e.changedTouches[0].screenX;
        this.handleGesture();
      }, {passive: true});
      //drag end
      this.container.addEventListener("mouseup", (e) => {
        this.dragEnd = e.clientX;
        this.handleGesture();
      });
    }

    handleAll() {
      this.letSlidesInArr();
      this.createDots();
      this.triggerMoveDotWhenClickOnDot();
      this.triggerNextOrPrevFunOnNextOrPrevIsClicked();
      this.sliderAutoPlay();
      this.interActions();
      this.handleMouseWheel();
    }
  }

  const slides = document.querySelectorAll(".container-slider");

  slides.forEach((slide) => {
    const createdSlideVar = new Slides(slide);
    createdSlideVar.handleAll();
  });

  //end slider oop



  // hide popups when i click outside them
  window.addEventListener("click", ({ target }) => {
    // start manage nav dropdowns
    if (
      !target.classList.contains("nav__nested") &&
      !target.classList.contains("fa-angle-up") &&
      !target.classList.contains("nav__nested--item") &&
      !target.classList.contains("nav__nested--items-box")
    ) {
      navs__nested.forEach((nested) => {
        nested.classList.remove("open");
      });

      nav__icons.forEach((icon) => {
        icon.classList.remove("fa-angle-up");
        icon.classList.add("fa-angle-down");
      });
    }
    // end manage nav dropdowns

    //start nav__form
    if (target.closest(".nav__form-container") || target.closest(".nav__user"))
      return;
    else nav__formContainer.classList.remove("open");
    setTimeout(() => {
      if(nav__log) nav__log.classList.remove("clicked");
      
    }, 400);

    //end nav__form
    if (
      (!target.closest(".nav__close") && target.closest(".nav")) ||
      target.closest(".fa-bars")
    )
      return;
    else siteNav.classList.remove("open");
    //start side nav

    // end side nav
    //
    //
    //
    //
  });

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

  //1
  //
  //
  //
  //
};

