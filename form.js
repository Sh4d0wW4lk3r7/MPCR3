class Form {
  constructor() {
    this.input = createInput().attribute("placeholder", "Enter your name");
    this.playbutton = createButton("PLAY");
    this.titleimage = createImg("title.png", "Game title");
    this.greeting = createElement("h1");
  }
  setposition() {
    this.titleimage.position(100, 50);
    this.input.position(width / 2 - 100, height / 2 - 100);
    this.playbutton.position(width / 2 - 20, height / 2 - 30);
    this.greeting.position(width / 2, height / 2);
  }
  setstyle() {
    this.titleimage.class("gametitle");
    this.input.class("input");
    this.playbutton.class("play");
    this.greeting.class("greet");
  }
  display() {
    this.setposition();
    this.setstyle();
    this.handleMousePressed()
  }
  handleMousePressed() {
    this.playbutton.mousePressed(() => {
      this.input.hide();
      this.playbutton.hide();
      var m = `Hello ${this.input.value()}
    <br> Waiting for new player to join`;
      this.greeting.html(m);
      pc += 1;
      p.name = this.input.value();
      p.index = pc;
      console.log(pc,p)
      p.updateplayer();
      p.updatepc();
    });
  }
  hide(){
  this.greeting.hide()
  this.playbutton.hide()
  this.input.hide()
  this.titleimage.hide()  
  }
}
