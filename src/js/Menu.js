import $ from "../../utils/index.js";
const menuInput = $("#espresso-menu-name");

export default class Menu {
  menu;
  category;

  constructor() {
    this.menu = {
      espresso: [],
      frappuccino: [],
      blended: [],
      teavana: [],
      desert: [],
    };
    this.category = "espresso";
  }

  handleCategory(e) {
    if (e.target.classList.contains("cafe-category-name"))
      this.category = e.target.dataset.categoryName;
    $(".mt-1").innerText = `${e.target.innerText} 메뉴 관리`;
  }

  handleInput() {
    const menuName = menuInput.value;
    if (menuName === "") return;
    this.menu[this.category].push({ name: menuName });
    this.setStorage();
    menuInput.value = "";
  }

  handleDelete(e) {
    if (confirm("메뉴를 삭제하시겠습니까?")) {
      const index = e.target.closest("li").dataset.menuIndex;
      this.menu[this.category].splice(index, 1);
      this.setStorage();
    }
  }
  handleSoldOut(e) {
    const index = e.target.closest("li").dataset.menuIndex;
    this.menu[this.category][index].soldOut =
      !this.menu[this.category][index].soldOut;
    this.setStorage();
  }

  handleEdit(e) {
    const newName = prompt("수정할 이름을 입력해주세요.");
    const index = e.target.closest("li").dataset.menuIndex;
    this.menu[this.category][index].name = newName;
    this.setStorage();
  }

  setStorage() {
    localStorage.setItem("menu", JSON.stringify(this.menu));
  }

  getStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  }

  menuItemTemplate(menuName, index, soldOut) {
    return `<li data-menu-index=${index} class="menu-list-item d-flex items-center py-2">
        <span class=  "${
          soldOut ? "sold-out" : ""
        } w-100 pl-2 menu-name">${menuName}</span>
        <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
      >
        품절
      </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
        >
          수정
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        >
          삭제
        </button>
      </li>`;
  }
}
