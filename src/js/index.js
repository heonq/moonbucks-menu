import $ from "../../utils/index.js";
const menuInput = $("#espresso-menu-name");

class App {
  menuItemTemplate(menuName) {
    return `<li class="menu-list-item d-flex items-center py-2">
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
    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      this.menuItemTemplate(menuName)
    );
    menuInput.value = "";
    this.updateCount();
  }

  handleDelete(e) {
    if (confirm("메뉴를 삭제하시겠습니까?")) {
      e.target.closest("li").remove();
    }
    this.updateCount();
  }

  handleEdit(e) {
    const newName = prompt("수정할 이름을 입력해주세요.");
    e.target.closest("li").querySelector("span").innerText = newName;
  }

  updateCount() {
    const menuCount = $("#espresso-menu-list").querySelectorAll(
      ".menu-list-item"
    ).length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  }

  init() {
    $("#espresso-menu-form").addEventListener("submit", (e) =>
      e.preventDefault()
    );
    $("#espresso-menu-submit-button").addEventListener(
      "click",
      this.handleInput.bind(this)
    );
    menuInput.addEventListener("keypress", (e) => {
      if (e.key !== "Enter") return;
      this.handleInput().bind(this);
    });
    $("#espresso-menu-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-remove-button"))
        this.handleDelete(e).bind(this);
      if (e.target.classList.contains("menu-edit-button"))
        this.handleEdit(e).bind(this);
    });
  }
}

const app = new App();
app.init();
