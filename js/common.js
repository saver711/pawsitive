"use strict";

function commonJs () {
  // /////////////////start nav

  // nav on scroll
  const nav = document.querySelector('.nav-container');

  
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 300) {
      nav.classList.add('showNav')
    } else{
      nav.classList.remove('showNav')
    }
  })


  // move .nav__under 
  class NavUnder {
    constructor(theItem){
      this.theItem = theItem
      this.parent = theItem.parentElement
      this.active = this.parent.querySelector('.active')
      this.allNavItems = this.parent.querySelectorAll('.nav__item')
    }

    mainPosition(){
      const activeElementMainOffset = this.active.offsetLeft,
            activeElementMainWidth = this.active.offsetWidth
      this.theItem.style.left = `${activeElementMainOffset}px`
      this.theItem.style.width = `${activeElementMainWidth}px`
    }

    onresize() {
      window.addEventListener('resize', ()=>{
        this.mainPosition();
      })
    }

    moveUnder() {
      const newActiveElementOffset = this.parent.querySelector('.active').offsetLeft,
      newActiveElementWidth = this.parent.querySelector('.active').offsetWidth

      this.theItem.style.left = `${newActiveElementOffset}px`
      this.theItem.style.width = `${newActiveElementWidth}px`
    }

    onmouseenter(){
      this.allNavItems.forEach(navItem=>{
        navItem.addEventListener('mouseenter', ()=>{
          this.allNavItems.forEach(navItem=>{
            navItem.classList.remove('active');
        })

        navItem.classList.add('active');


        this.moveUnder()
        })
      })
    }

    onmouseleave() {
      this.parent.addEventListener('mouseleave', ()=>{
        this.allNavItems.forEach(navItem=>{
          navItem.classList.remove('active');
      })

      this.active.classList.add('active')

        this.moveUnder();
      })
      
    }

    handleAll(){
      this.mainPosition();
      this.onresize()
      this.onmouseleave();
    }



  }
  const  navUnderItem = document.querySelector('.nav__under')
  
  const navUnder = new NavUnder(navUnderItem);
  navUnder.handleAll()

 function hoverOnNavItems() {
  if(window.innerWidth > 680.99) {
    navUnder.onmouseenter();
  }
 };
 hoverOnNavItems();

 window.addEventListener('resize', ()=>{
  hoverOnNavItems()
 })
  //nav dropdown
  const nav__icons = document.querySelectorAll(".nav__icon"),
    navs__nested = document.querySelectorAll(".nav__nested");

  nav__icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      // hide other dropdowns
      navs__nested.forEach((nested) => {
        if (nested !== icon.nextElementSibling) {
          nested.classList.remove("open");
        }
      });

      //show targeted dropdown
      icon.nextElementSibling.classList.toggle("open");

      //change other arrows
      nav__icons.forEach((generalIcon) => {
        if (generalIcon !== icon) {
          generalIcon.classList.remove("fa-angle-up");
          generalIcon.classList.add("fa-angle-down");
        }
      });

      //change targeted arrow
      if (icon.classList.contains("fa-angle-down")) {
        icon.classList.remove("fa-angle-down");
        icon.classList.add("fa-angle-up");
      } else {
        icon.classList.remove("fa-angle-up");
        icon.classList.add("fa-angle-down");
      }
    });
  });

  // /////////////////end nav

  // start nav form
  const formSplit__items = document.querySelectorAll(".formSplit__item"),
    nav__forms = document.querySelectorAll(".nav__form");
  formSplit__items.forEach((formSplit__item) => {
    formSplit__item.addEventListener("click", () => {
      // change active state
      formSplit__items.forEach((formSplit__item) => {
        formSplit__item.classList.remove("active");
      });
      formSplit__item.classList.add("active");

      //switch forms
      const targetedFormName = formSplit__item.getAttribute("data-target");

      nav__forms.forEach((nav__form) => {
        nav__form.style.display = "none";
      });

      document.forms[`${targetedFormName}`].style.display = "block";
    });
  });

  // click on login btn
  const nav__log = document.querySelector(".nav__log"),
    nav__formContainer = document.querySelector(".nav__form-container");
  if(nav__log){ // because it might be hidden
    // i can do like >> nav__log?.addEventLis.... //but it is not supported in old browsers so i made it with if()
    nav__log.addEventListener("click", () => { 
      if (!nav__formContainer.classList.contains("open"))
        nav__log.classList.add("clicked");
      setTimeout(() => {
        nav__formContainer.classList.add("open");
      }, 220);
  
      const loginEmail = document.getElementById("loginEmail");
      loginEmail.focus();
    });
  }

  // form__showPassword
  const form__showPasswordInputs = document.querySelectorAll(
    ".form__showPasswordInput"
  );

  form__showPasswordInputs.forEach((form__showPasswordInput) => {
    form__showPasswordInput.addEventListener("change", () => {
      if (form__showPasswordInput.checked) {
        form__showPasswordInput.parentElement.previousElementSibling.previousElementSibling.setAttribute(
          "type",
          "text"
        );
      } else {
        form__showPasswordInput.parentElement.previousElementSibling.previousElementSibling.setAttribute(
          "type",
          "password"
        );
      }
    });
  });

  // start form oop authentication
  // let checkValid = false;
  // class Auth{
  //   constructor(form){
  //     this.form = form
  //   }

  //   dealWithRequired(){
  //     const allRequired = this.form.querySelectorAll('.required');

  //     for(let i = 0; i < allRequired.length; i++){
  //       const field = allRequired[i],
  //             getFieldRegx = field.dataset.regex,
  //             fieldValue = field.value

  //       if(getFieldRegx) {
  //         const fieldRegx = new RegExp(getFieldRegx)
  //         if(fieldRegx.test(fieldValue)){
  //           console.log('ok');
  //           // checkValid = true
  //         } else{
  //           console.log(field);
  //         }
  //       }
        
  //     }
  //   }

  //   handleAll(){
  //     this.dealWithRequired()
  //   }
  // }


  // let myForms = document.querySelectorAll('.myForm')

  // myForms.forEach(myForm=>{
  //   myForm.addEventListener('click', (e)=>{
  //     const fromAuthObj = new Auth(myForm);
  //     fromAuthObj.handleAll();
  //     // if (checkValid){
  //     //   myForm.submit();
  //     // } else{
  //     //   e.preventDefault();
  //     // }
      
  //   })
  // })

    // end form oop authentication

  

  //start form authentication
  let checkValid = false;
  document.logInForm.addEventListener("submit", function (e) {
    e.preventDefault();
     formValidation(
      document.logInForm.loginEmail,
      document.logInForm.loginPassword
    );
    if(checkValid) document.logInForm.submit();
  });

  document.signUpForm.addEventListener("submit", function (e) {
    e.preventDefault();
    formValidation(
      document.signUpForm.signEmail,
      document.signUpForm.signPassword
    );
    if(checkValid) document.signUpForm.submit();
    // checkValid ?? document.signUpForm.submit(); // not supported in old browsers
  });
  function formValidation(theFormEmail, theFormPassword) {
    let uemail = theFormEmail,
      passid = theFormPassword;

    if (ValidateEmail(uemail)) {
      if (passid_validation(passid, 8)) {
      } else {
        return false;
      }
    } else {
      return false;
    }

    //
  }

  ////// email format
  function ValidateEmail(uemail) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (uemail.value.match(mailformat)) {
      uemail.nextElementSibling.style.display = "none";
      return true;
      
    } else {
      uemail.nextElementSibling.style.display = "block";
      uemail.focus();
      return false;
    }
  }

  /////////pass
  function passid_validation(passid, passLength) {
    let passid_len = passid.value.length;
    if (passid_len <= passLength) {
      passid.nextElementSibling.innerHTML = `Password length must be > ${passLength}`;
      passid.nextElementSibling.style.display = "block";
      passid.focus();
      return false;
    } else {
      passid.nextElementSibling.style.display = "none";
      checkValid = true;
      return true;
    }
  }

  //end form authentication

  // end nav form

  // start nav close and open
  const navHamburger = document.querySelector(".alternateNav i"),
    siteNav = document.querySelector(".nav");

  navHamburger.addEventListener("click", () => {
    siteNav.classList.add("open");
  });
  ///////////////////////////////// end Nav

  //
  //
  //
  //
  //
  //

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
            // translateOnScroll.style.transform = `translate(50%, calc(-50% + ${translateValue}px))`
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
  
    //  End translate on scroll

    // start  plusCart
  const plusCart__clickables = document.querySelectorAll(".plusCart__clickable");

  plusCart__clickables.forEach((plusCart__clickable) => {
    plusCart__clickable.addEventListener("click", () => {
      const plusCarts = document.querySelectorAll(".plusCart"),
        filteredplusCarts = Array.from(plusCarts).filter(
          (item) => item !== plusCart__clickable.parentElement
        ),
        plusIcon = plusCart__clickable.querySelector('.cart__plus');
      filteredplusCarts.forEach((plusCart) => {
        plusCart.classList.remove("active")
         const otherPlusIcon = plusCart.querySelector('.cart__plus');
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

      

      plusCart__clickable.parentElement.classList.toggle("active");
    });
  });

  // end  plusCart

    // start  svg animating
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
  
    // end  svg animating
  


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

  //1
  //
  //
  //
  //
};

window.onload = commonJs();