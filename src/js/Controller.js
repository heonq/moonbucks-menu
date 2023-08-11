import Menu from "./Menu.js";
import { InputView } from "../view/InputView.js";

export default class Controller {
  constructor() {
    this.menu = new Menu();
  }
  init() {
    InputView.init(this.menu);
  }
}
