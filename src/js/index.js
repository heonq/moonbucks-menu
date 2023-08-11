import Controller from "./Controller.js";

class App {
  constructor() {
    this.controller = new Controller();
  }

  play() {
    this.controller.init();
  }
}

const app = new App();
app.play();
