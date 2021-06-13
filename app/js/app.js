document.addEventListener("DOMContentLoaded", function (e) {
  const body = document.querySelector('body');
  const app = document.querySelector(".app");
  let numValue;

  const btns = [
    7,
    8,
    9,
    "/",
    "DEL",
    4,
    5,
    6,
    "*",
    "C",
    1,
    2,
    3,
    "-",
    "(",
    0,
    ".",
    "=",
    "+",
    ")",
  ];

  app.innerHTML = `
  <div class="app__top"><input class="app__input" readonly></div>
  <div class="app__bottom">
    <div class="app__btn-wrap"></div>
    <div class="app__menu-wrap"></div>
  </div>
  `;

  for (let i = 0; i < btns.length; i++) {
    document.querySelector(".app__btn-wrap").innerHTML += `
    <button class="app__btn">${btns[i]}</button>`;
  };

  document.querySelectorAll(".app__btn").forEach(function (el, i, arr) {
    el.style.width = '20%';
  });

  document.querySelector(".app__menu-wrap").innerHTML += `
  <div class="app__toggle-menu"></div>
  `;

  document.querySelector(".app__toggle-menu").innerHTML += `
  <ul class="ul"></ul>
  <button class="clear" tooltip="Очистить память" tooltip-position="left">clear</button>
  `;

  document.querySelector(".app__btn-wrap").innerHTML += `
  <button class="app__toggle-btn"></button>
  `;

  getStateApp();

  const toggleBtn = document.querySelector(".app__toggle-btn");

  app.addEventListener("click", function (e) {
    if (e.target === toggleBtn) {
      document
        .querySelector(".app__menu-wrap")
        .classList.toggle("app__menu-wrap--hidden");
      document
        .querySelector(".app__toggle-btn")
        .classList.toggle("app__toggle-btn--icon");
    };

    document.querySelectorAll(".app__btn").forEach(function (el, i, arr) {
      if (e.target === arr[i]) {
        numValue = e.target.textContent;
        calc(e);
        err(e);
        memory(e);
      };
    });
    clearMemory(e);
    updateApp();
  });

  const input = document.querySelector(".app__input");

  function err(e) {
    if (input.value === 'undefined') {
      input.value = '';
    };
  };

  let resTemplate;

  function calc(e) {
    try {
      if (e.target.textContent !== "DEL") {
        input.value += numValue;
      } else {
        let inputStr = input.value;
        input.value = inputStr.slice(0, -1);
      };
  
      if (e.target.textContent === "=") {
        var res = eval(input.value.slice(0, -1));
        resTemplate = `${input.value}${ Number.isInteger(res) === true ? input.value = res : input.value = res.toFixed(1) }`;  
        Number.isInteger(res) === true ? input.value = res : input.value = res.toFixed(1);
      };
  
      if (e.target.textContent === "C") {
        input.value = "";
      };

      if (input.value === "Infinity") {
        input.value = "∞";
      };

    } catch (error) {
      input.value = '(Что-то пошло не так, проверьте выражение)';
      resTemplate = 'Ошибка';
    };

  };

  function memory(e) {
    let ul = document.querySelector('.ul');

    let instance = `<li class="instance">${resTemplate}</li>`;

    if (e.target.textContent === '=' && input.value !== '') {
      ul.innerHTML += instance;
    };
  };

  function clearMemory(e) {
    const clear = document.querySelector('.clear');
    if (e.target === clear) {
      document.querySelectorAll('.instance').forEach(function(el, i, arr){
        arr[i].remove();
      });
    };
  };

  setInterval (colorChange, 7000);

  function colorChange() {
    let arrColor = [
      '#696969',
      '#FF00FF',
      '#4B0082',
      '#E6E6FA',
      '#E6E6FA',
      '#D8BFD8',
      '#DDA0DD',
      '#9932CC',
      '#6495ED',
      '#F8F8FF',
      '#FFE4E1',
      '#696969',
      '#000000',
      '#2F4F4F',
      '#BC8F8F'
    ]

    let randomColor = Math.floor(Math.random() * arrColor.length);
    body.style.backgroundColor = `${arrColor[randomColor]}`;
  };

  function updateApp() {
    let state = app.innerHTML;
    localStorage.setItem('state', state);
  };

  function getStateApp() {
    if (localStorage.getItem('state') !== null) {
      app.innerHTML = localStorage.getItem('state');
    };
  };

}); // end script
