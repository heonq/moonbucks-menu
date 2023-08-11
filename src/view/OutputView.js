import $ from "../../utils/index.js";
const menuList = $("#espresso-menu-list");

export const OutputView = {
  updateCount() {
    const menuCount = menuList.querySelectorAll(".menu-list-item").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  },
  updateMenu(menuModel) {
    menuModel.menu = menuModel.getStorage();
    menuList.innerHTML = menuModel.menu[menuModel.category]
      .map(({ name, soldOut }, index) =>
        menuModel.menuItemTemplate(name, index, soldOut)
      )
      .join("");
    this.updateCount();
  },
};
