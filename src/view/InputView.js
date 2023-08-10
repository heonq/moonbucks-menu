import { $ } from "../../utils/index.js";
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
      OutputView.updateMenu();
    });
  },
  handleKeypress(menu) {
    menuInput.addEventListener("keypress", (e) => {
      if (e.key !== "Enter") return;
      menu.handleInput();
      OutputView.updateMenu();
    });
  },
  handleMenuButton(menu) {
    menuList.addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-remove-button"))
        menu.handleDelete(e);
      if (e.target.classList.contains("menu-edit-button")) menu.handleEdit(e);
      if (e.target.classList.contains("menu-sold-out-button"))
        menu.handleSoldOut(e);
    });
  },
  handleCategory(menu) {
    $("nav").addEventListener("click", (e) => menu.handleCategory(e));
  },
};
