import $ from "../../utils/index.js";
import { OutputView } from "./OutputView.js";
const menuInput = $("#espresso-menu-name");
const menuList = $("#espresso-menu-list");

export const InputView = {
  formPreventDefault() {
    $("#espresso-menu-form").addEventListener("submit", (e) =>
      e.preventDefault()
    );
  },
  handleSubmit(menu) {
    $("#espresso-menu-submit-button").addEventListener("click", () => {
      menu.handleInput();
      OutputView.updateMenu(menu);
    });
  },
  handleKeypress(menu) {
    menuInput.addEventListener("keypress", (e) => {
      if (e.key !== "Enter") return;
      menu.handleInput();
      OutputView.updateMenu(menu);
    });
  },
  handleMenuButton(menu) {
    menuList.addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-remove-button")) {
        menu.handleDelete(e);
        OutputView.updateMenu(menu);
      }
      if (e.target.classList.contains("menu-edit-button")) {
        menu.handleEdit(e);
        OutputView.updateMenu(menu);
      }
      if (e.target.classList.contains("menu-sold-out-button")) {
        menu.handleSoldOut(e);
        OutputView.updateMenu(menu);
      }
    });
  },
  handleCategory(menu) {
    $("nav").addEventListener("click", (e) => {
      menu.handleCategory(e);
      OutputView.updateMenu(menu);
    });
  },

  init(menu) {
    OutputView.updateMenu(menu);
    this.formPreventDefault();
    this.handleSubmit(menu);
    this.handleKeypress(menu);
    this.handleMenuButton(menu);
    this.handleCategory(menu);
  },
};
