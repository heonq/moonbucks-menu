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

  menuItemTemplate(menuName, index) {
    return `<li data-menu-index=${index} class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menuName}</span>
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
      .map(({ name }, index) => this.menuItemTemplate(name, index))
      .join("");
    this.updateCount();
  }

  handleDelete(e) {
    if (confirm("메뉴를 삭제하시겠습니까?")) {
      const index = e.target.closest("li").dataset.menuIndex;
      console.log(index);
      this.menu[this.category].splice(index, 1);
      localStorage.setItem("menu", JSON.stringify(this.menu));
    }
    this.updateMenu();
  }

  handleEdit(e) {
    const newName = prompt("수정할 이름을 입력해주세요.");
    e.target.closest("li").querySelector("span").innerText = newName;
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
      this.handleInput.bind(this)
    );
    menuInput.addEventListener("keypress", (e) => {
      if (e.key !== "Enter") return;
      this.handleInput();
    });
    menuList.addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-remove-button"))
        this.handleDelete(e);
      if (e.target.classList.contains("menu-edit-button")) this.handleEdit(e);
    });
  }
}

const app = new App();
app.init();
