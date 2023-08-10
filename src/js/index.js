import $ from "../../utils/index.js";
const menuInput = $("#espresso-menu-name");
const menuList = $("#espresso-menu-list");

class App {
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

  handleCategory(e) {
    if (e.target.classList.contains("cafe-category-name"))
      this.category = e.target.dataset.categoryName;
    $(".mt-1").innerText = `${e.target.innerText} 메뉴 관리`;

    this.updateMenu();
  }

  handleInput() {
    const menuName = menuInput.value;
    if (menuName === "") return;
    this.menu[this.category].push({ name: menuName });
    localStorage.setItem("menu", JSON.stringify(this.menu));
    menuInput.value = "";
    this.updateMenu();
  }

  updateMenu() {
    this.menu = JSON.parse(localStorage.getItem("menu"));
    menuList.innerHTML = this.menu[this.category]
      .map(({ name, soldOut }, index) =>
        this.menuItemTemplate(name, index, soldOut)
      )
      .join("");
    this.updateCount();
  }

  handleDelete(e) {
    if (confirm("메뉴를 삭제하시겠습니까?")) {
      const index = e.target.closest("li").dataset.menuIndex;
      this.menu[this.category].splice(index, 1);
      localStorage.setItem("menu", JSON.stringify(this.menu));
    }
    this.updateMenu();
  }

  handleSoldOut(e) {
    const index = e.target.closest("li").dataset.menuIndex;
    this.menu[this.category][index].soldOut =
      !this.menu[this.category][index].soldOut;
    localStorage.setItem("menu", JSON.stringify(this.menu));
    this.updateMenu();
  }

  handleEdit(e) {
    const newName = prompt("수정할 이름을 입력해주세요.");
    const index = e.target.closest("li").dataset.menuIndex;
    this.menu[this.category][index].name = newName;
    localStorage.setItem("menu", JSON.stringify(this.menu));
    this.updateMenu();
  }

  updateCount() {
    const menuCount = menuList.querySelectorAll(".menu-list-item").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  }

  init() {
    this.updateMenu();
    $("#espresso-menu-form").addEventListener("submit", (e) =>
      e.preventDefault()
    );
    $("#espresso-menu-submit-button").addEventListener(
      "click",
      this.handleInput
    );
    menuInput.addEventListener("keypress", (e) => {
      if (e.key !== "Enter") return;
      this.handleInput();
    });
    menuList.addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-remove-button"))
        this.handleDelete(e);
      if (e.target.classList.contains("menu-edit-button")) this.handleEdit(e);
      if (e.target.classList.contains("menu-sold-out-button"))
        this.handleSoldOut(e);
    });
    $("nav").addEventListener("click", (e) => this.handleCategory(e));
  }
}

const app = new App();
app.init();
