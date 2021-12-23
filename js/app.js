"use strict";

document.addEventListener('DOMContentLoaded', function () {
  initAccordion('.js-accordion-wrap');
  initPopup();
  toggleBlock('.js-open-edit', '.js-close-edit', '.js-edit-wrap');
  maskCard();
  validNum();
  initSelect();
  initSwiper();
  initTabs();
  toggleInfo();
  toggleInner();
});

function initAccordion(wrapEl) {
  var close = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var wrap = document.querySelector(wrapEl);
  if (!wrap) return;
  var blockList = wrap.querySelectorAll('.js-accordion'),
      btnList = wrap.querySelectorAll('.js-accordion-btn'),
      contentList = wrap.querySelectorAll('.js-accordion-content');
  blockList.forEach(function (el) {
    var btn = el.querySelector('.js-accordion-btn'),
        content = el.querySelector('.js-accordion-content'),
        descr = content.querySelector('.js-accordions-descr'),
        height = descr.offsetHeight,
        margin = +window.getComputedStyle(descr).marginTop.replace('px', '');
    btn.addEventListener('click', function (e) {
      var target = e.target;

      if (target && target.classList.contains('active')) {
        target.classList.remove('active');
        content.style.maxHeight = 0;
      } else {
        if (close) {
          btnList.forEach(function (btn) {
            return btn.classList.remove('active');
          });
          contentList.forEach(function (content) {
            return content.style.maxHeight = 0;
          });
        }

        btn.classList.add('active');
        content.style.maxHeight = "".concat(height + margin + 50, "px");
      }
    });
  });
}

function initPopup() {
  var opener = document.querySelectorAll('[data-trigger]'),
      closeList = document.querySelectorAll('.js-popup-close'),
      popupList = document.querySelectorAll('[data-popup]'),
      mask = document.querySelector('.js-mask');
  if (!opener.length || !closeList.length) return;
  opener.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var popupSel = btn.getAttribute('data-trigger'),
          popup = document.querySelector("[data-popup=\"".concat(popupSel, "\"]"));
      closeAllPopups(popup);
      openPopup("[data-popup=\"".concat(popupSel, "\"]"));
    });
  });
  closeList.forEach(function (close) {
    close.addEventListener('click', function () {
      closeAllPopups();
    });
  });

  if (mask) {
    popupList.forEach(function (popup) {
      popup.addEventListener('click', function (e) {
        var target = e.target;

        if (target && !target.closest('.popup__wrap') && !target.closest('.menu')) {
          closeAllPopups();
        }
      });
    });
    mask.addEventListener('click', function (e) {
      var target = e.target;

      if (target && !target.closest('.popup__wrap')) {
        closeAllPopups();
      }
    });
  }
}

function openPopup(selector) {
  var popup = document.querySelector(selector),
      mask = document.querySelector('.js-mask');

  if (selector !== "[data-popup=\"burger\"]") {
    fadeIn(popup);
    fadeIn(mask);
  } else {
    popup.classList.add('active');
    document.querySelector('body').classList.add('overflow');
  }
}

function closeAllPopups() {
  var popupList = document.querySelectorAll('[data-popup]'),
      mask = document.querySelector('.js-mask');

  if (popupList.length) {
    popupList.forEach(function (el) {
      var attr = el.getAttribute('data-popup');

      if (attr === 'burger') {
        el.classList.remove('active');
      } else {
        el.style.display = 'none';
      }
    });
  }

  if (mask) {
    mask.style.display = 'none';
  }

  document.querySelector('body').classList.remove('overflow');
}

function toggleBlock(open, close, parentEl) {
  var parentList = document.querySelectorAll(parentEl);
  if (!parentList.length) return;
  parentList.forEach(function (parent) {
    var btnOpen = parent.querySelector(open),
        btnClose = parent.querySelector(close);
    btnOpen.addEventListener('click', function (e) {
      var target = e.target;
      target.closest(parentEl).classList.add('active');
    });

    if (btnClose) {
      btnClose.addEventListener('click', function (e) {
        var target = e.target;
        target.closest(parentEl).classList.remove('active');
      });
    }
  });
}

function maskCard() {
  var inputList = document.querySelectorAll('.js-mask-card');
  inputList.forEach(function (input) {
    input.addEventListener('input', function (e) {
      var target = e.target;
      inputNum(target);
      document.addEventListener('keydown', function (event) {
        var value = target.value;

        if (event.code != 'Backspace') {
          if (value.length === 4 || value.length === 11 || value.length === 18) {
            target.value = value + ' - ';
          }
        }
      });
    });
  });
}

function validNum() {
  var inputList = document.querySelectorAll('.js-input-num');
  if (!inputList.length) return;
  inputList.forEach(function (input) {
    input.addEventListener('input', function (e) {
      var target = e.target;
      inputNum(target);
    });
  });
}

function inputNum(input) {
  input.value = input.value.replace(/[A-Za-zА-Яа-яЁё]/gi, '');
}

function initSelect() {
  var wrapList = document.querySelectorAll('.js-select');
  if (!wrapList.length) return;
  wrapList.forEach(function (wrap) {
    var btn = wrap.querySelector('.js-select-btn'),
        list = wrap.querySelector('.js-select-menu');
    btn.addEventListener('click', function (e) {
      var target = e.target;
      target.classList.toggle('active');
      list.classList.toggle('active');
    });
    list.addEventListener('click', function (e) {
      var target = e.target,
          item = e.currentTarget.querySelectorAll('li');

      if (target && target.closest('li')) {
        var text = target.closest('li').textContent;
        btn.textContent = text;
        item.forEach(function (el) {
          return el.classList.remove('active');
        });
        target.closest('li').classList.add('active');
        btn.classList.toggle('active');
        list.classList.toggle('active');
      }
    });
  });
  document.addEventListener('click', function (e) {
    var target = e.target;

    if (target && !target.closest('.js-select')) {
      var btnList = document.querySelectorAll('.js-select-btn'),
          menuLise = document.querySelectorAll('.js-select-menu');
      btnList.forEach(function (el) {
        return el.classList.remove('active');
      });
      menuLise.forEach(function (el) {
        return el.classList.remove('active');
      });
    }
  });
}

function initTabs() {
  var tabList = document.querySelectorAll('.js-tab-wrap');
  if (!tabList.length) return;
  tabList.forEach(function (tab) {
    var buttons = tab.querySelectorAll('.js-tab-buttons li'),
        contentList = tab.querySelectorAll('.js-tab-content');
    buttons.forEach(function (btn, i) {
      btn.addEventListener('click', function (e) {
        var target = e.currentTarget;
        buttons.forEach(function (el) {
          return el.classList.remove('active');
        });
        contentList.forEach(function (el) {
          return el.classList.remove('active');
        });
        target.classList.add('active');
        contentList[i].classList.add('active');
      });
    });
    buttons[0].click();
  });
}

function initSwiper() {
  var width = document.documentElement.offsetWidth;
  var baseSettings = {
    slidesPerView: 1.02,
    spaceBetween: 8,
    breakpoints: {
      400: {
        slidesPerView: 1.3
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 10
      }
    }
  }; //signals

  var forexSlider = new Swiper('.js-slide-forex', baseSettings);
  var indexalsSlider = new Swiper('.js-slide-index', baseSettings);
  var educationSlider = new Swiper('.js-slide-education', baseSettings);
  var monthlySlider = new Swiper('.js-slide-monthly', baseSettings);

  if (forexSlider && indexalsSlider && educationSlider && monthlySlider) {
    if (width >= 1024) {
      forexSlider.disable();
      indexalsSlider.disable();
      educationSlider.disable();
      monthlySlider.disable();
    }

    window.addEventListener('resize', function () {
      var width = document.documentElement.offsetWidth;

      if (width >= 1024) {
        forexSlider.disable();
        indexalsSlider.disable();
        educationSlider.disable();
        monthlySlider.disable();
      } else {
        forexSlider.enable();
        indexalsSlider.enable();
        educationSlider.enable();
        monthlySlider.enable();
      }
    });
  }
}

function toggleInfo() {
  var btnList = document.querySelectorAll('.js-info-btn'),
      contentList = document.querySelectorAll('.js-info-content');
  if (!btnList.length) return;
  btnList.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var target = e.currentTarget,
          width = document.documentElement.offsetWidth;
      var content = target.previousElementSibling;

      if (width >= 768) {
        if (target && target.classList.contains('active')) {
          target.classList.remove('active');
          fadeOut(content);
        } else {
          closeContent();
          btnList.forEach(function (el) {
            return el.classList.remove('active');
          });
          target.classList.add('active');
          fadeIn(content);
        }
      } else {
        target.classList.remove('active');
        fadeOut(target.closest('.js-info-content'));
      }
    });
  });
  document.addEventListener('click', function (e) {
    var target = e.target;

    if (target && !target.closest('.js-info-wrap')) {
      closeContent();
      btnList.forEach(function (el) {
        return el.classList.remove('active');
      });
    }
  });

  function closeContent() {
    contentList.forEach(function (el) {
      var opacity = window.getComputedStyle(el).opacity;
      if (opacity === '1') fadeOut(el);
    });
  }
}

function fadeOut(el) {
  var timing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var opacity = 1;
  var start = performance.now();
  requestAnimationFrame(function anim() {
    var newTime = performance.now(),
        progress = (newTime - start) * 100 / timing;
    el.style.opacity = opacity;
    opacity = 1 - 1 * progress / 100;

    if (newTime - start <= timing && opacity >= 0) {
      requestAnimationFrame(anim);
    } else {
      el.style.display = 'none';
      el.style.opacity = 0;
    }
  });
}

function fadeIn(el) {
  var timing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  el.style.display = 'block';
  var opacity = 0.01;
  var start = performance.now();
  requestAnimationFrame(function anim() {
    var newTime = performance.now(),
        progress = (newTime - start) * 100 / timing;
    el.style.opacity = opacity;
    opacity = 1 * progress / 100;
    if (newTime - start <= timing && opacity <= 1) requestAnimationFrame(anim);else el.style.opacity = 1;
  });
}

function toggleInner() {
  var showList = document.querySelectorAll('.js-form-show');
  if (!showList.length) return;
  showList.forEach(function (show) {
    var parent = show.closest('form'),
        hide = parent.querySelector('.js-form-hide'),
        content = parent.querySelector('.js-form-inner');
    show.addEventListener('click', function (e) {
      e.target.classList.add('hide');
      hide.classList.remove('hide');
      content.classList.remove('hide');
    });
    hide.addEventListener('click', function (e) {
      e.target.classList.add('hide');
      show.classList.remove('hide');
      content.classList.add('hide');
    });
  });
}