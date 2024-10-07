let select = function () {
  let selectHeader = document.querySelectorAll(".select__header");
  let selectItem = document.querySelectorAll(".select__item");
  let selectElements = document.querySelectorAll(".select");
  selectHeader.forEach((item) => {
    item.addEventListener("click", selectToggle);
  });
  selectItem.forEach((item) => {
    item.addEventListener("click", selectChoose);
  });

  function selectToggle() {
    this.parentElement.classList.toggle("is-active");
  }

  function selectChoose() {
    let text = this.innerText;
    let select = this.closest(".select");
    let textCurrent = this.closest(".select").querySelector(".select__current");
    textCurrent.innerText = text;
    select.classList.remove("is-active");
  }

  document.addEventListener("click", (e) => {
    selectElements.forEach((select) => {
      if (!select.contains(e.target)) {
        select.classList.remove("is-active");
      }
    });
  });
};
select();
