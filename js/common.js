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

  //start form authentication
  let checkValid = false;
  document.logInForm.addEventListener("submit", function (e) {
    e.preventDefault();
     formValidation(
      document.logInForm.loginEmail,
      document.logInForm.loginPassword
    );
    if(checkValid) document.logInForm.submit();
    // checkValid ?? document.logInForm.submit(); // not supported in old browsers
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

