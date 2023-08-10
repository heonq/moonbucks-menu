import { $ } from "../../utils/index.js";
const menuList = $("#espresso-menu-list");

export const OutputView = {
  updateCount() {
    const menuCount = menuList.querySelectorAll(".menu-list-item").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  },
  updateMenu(menu) {
    menu.menu = menu.getStorage();
    menuList.innerHTML = menu.menu[this.category]
      .map(({ name, soldOut }, index) =>
        menu.menuItemTemplate(name, index, soldOut)
      )
      .join("");
    this.updateCount();
  },
};
