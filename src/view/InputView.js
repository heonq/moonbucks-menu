import { $ } from "../../utils/index.js";
const menuInput = $("#espresso-menu-name");
const menuList = $("#espresso-menu-list");

export const InputView = {
  formPreventDefault() {
    $("#espresso-menu-form").addEventListener("submit", (e) =>
      e.preventDefault()
    );
  },
  handleSubmit(model) {
    $("#espresso-menu-submit-button").addEventListener(
      "click",
      model.handleInput
    );
  },
  handleKeypress(model) {
    menuInput.addEventListener("keypress", (e) => {
      if (e.key !== "Enter") return;
      model.handleInput();
    });
  },
  handleMenuButton(model) {
    menuList.addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-remove-button"))
        model.handleDelete(e);
      if (e.target.classList.contains("menu-edit-button")) model.handleEdit(e);
      if (e.target.classList.contains("menu-sold-out-button"))
        model.handleSoldOut(e);
    });
  },
  handleCategory(model) {
    $("nav").addEventListener("click", (e) => model.handleCategory(e));
  },
};
