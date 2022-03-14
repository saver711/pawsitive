"use strict";

window.onload = function () {
  commonJs();
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

  //  start translate on scroll
  const translateOnScrolls = document.querySelectorAll(".translateOnScroll");
  let translateValue = 0,
    scrollPos = 0;

  window.addEventListener("scroll", translateElementsOnScroll);

  function translateElementsOnScroll() {
 
    let st = window.scrollY || document.documentElement.scrollTop;

    if (st > scrollPos) {
      // downscroll code
      translateValue += 0.2;
      translateOnScrolls.forEach((translateOnScroll) => {
        const elementTopOffset = translateOnScroll.getBoundingClientRect().top;
        if (elementTopOffset > -200 && elementTopOffset < window.innerHeight) {
          translateOnScroll.style.transform = `translateY(${translateValue}px)`;
        }
      });
    } else {
      // upscroll code
      translateValue -= 0.2;
      translateOnScrolls.forEach((translateOnScroll) => {
        const elementTopOffset = translateOnScroll.getBoundingClientRect().top;
        if (elementTopOffset > -200 && elementTopOffset < window.innerHeight) {
          translateOnScroll.style.transform = `translateY(${translateValue}px)`;
        }
      });
    }
    scrollPos = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }

  //translateOnScroll.style.transform = `translateY(${translateValue}px)`;

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

  // start services sectio & svg animating
  const moving_svgs = document.querySelectorAll(".moving_svg");

  let original_path_style =
      "transform: scaleX(1) scaleY(1) translateX(0px) translateY(0px) rotate(0deg);",
    original_g_style =
      "transform: scaleX(1) scaleY(1) translateX(0px) translateY(0px) rotate(0deg);",
    original_image_style =
      "transform: scaleX(1) scaleY(1) translateX(0px) translateY(0px) rotate(0deg);";

  moving_svgs.forEach((moving_svg, i) => {
    //////////////////////////////\\\\\\path\\\\\\\////////////////
    // get original_path
    let original_path =
        moving_svg.firstElementChild.firstElementChild.firstElementChild,
      // get alternate_path
      alternate_path = original_path.nextElementSibling,
      //     get original d attr
      original_path_d_attr = original_path.getAttribute("d"),
      //     get alternate d attr
      alternate_path_d_attr = alternate_path.getAttribute("d"),
      //     get alternate style attr
      alternate_path_style_attr = alternate_path.getAttribute("style");

    //////////////////////////////\\\\\\g\\\\\\\////////////////
    // get original_g
    let original_g =
        moving_svg.firstElementChild.firstElementChild.nextElementSibling,
      // get alternate_g
      alternate_g = original_g.nextElementSibling,
      //     get alternate style attr
      alternate_g_style_attr = alternate_g.getAttribute("style");

    //////////////////////////////\\\\\\image\\\\\\\////////////////
    // get original_image
    let original_image = alternate_g.nextElementSibling.firstElementChild,
      // get alternate_image
      alternate_image = original_image.nextElementSibling,
      //     get alternate style attr
      alternate_image_style_attr = alternate_image.getAttribute("style");

    // on mouseenter
    moving_svg.addEventListener("mouseenter", () => {
      //////////////////////////////\\\\\path\\\\\\////////////////
      //     change original path d attr
      original_path.setAttribute("d", alternate_path_d_attr);

      //     change original path style attr
      original_path.setAttribute("style", alternate_path_style_attr);

      //////////////////////////////\\\\\\g\\\\\\\////////////////
      //     change original g style attr
      original_g.setAttribute("style", alternate_g_style_attr);

      //////////////////////////////\\\\\\image\\\\\\\////////////////
      //     change original image style attr
      original_image.setAttribute("style", alternate_image_style_attr);
    });

    moving_svg.addEventListener("mouseleave", () => {
      //////////////////////////////\\\\\path\\\\\\////////////////
      //     change original path d attr again
      original_path.setAttribute("d", original_path_d_attr);

      //     change original path style attr again
      original_path.setAttribute("style", original_path_style);

      //////////////////////////////\\\\\\g\\\\\\\////////////////

      //     change original g style attr again
      original_g.setAttribute("style", original_g_style);

      //////////////////////////////\\\\\\image\\\\\\\////////////////

      //     change original image style attr again
      original_image.setAttribute("style", original_image_style);
    });
  });

  // end services sectio & svg animating

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

