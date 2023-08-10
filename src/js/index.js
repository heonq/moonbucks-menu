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
  }
  init() {
    $("#espresso-menu-form").addEventListener("submit", (e) =>
      e.preventDefault()
    );
    $("#espresso-menu-submit-button").addEventListener(
      "click",
      this.handleInput.bind(this)
    );
  }
}

const app = new App();
app.init();
