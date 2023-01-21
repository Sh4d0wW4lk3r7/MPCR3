var s,db,p,b1,g,f,c,pc,gs,sr,sr2,t,c1,c2,ca,pi,f1,gc,obstacle1Image,obstacle2Image,fg,gcg,og1,l,f10
function preload(){
b1=loadImage("background (1).png")
sr=loadImage("sr.png") 
sr2=loadImage("sr2.png")
t=loadImage("t.jpg")
f1=loadImage("fuel.png")
gc=loadImage("coin.png")
obstacle1Image=loadImage("obstacle1.png")
obstacle2Image=loadImage("obstacle2.png")
l=loadImage("life.png")
f10=loadImage("fuel1.png")
og5=loadImage("blast.png")


}
function setup() {
  c=createCanvas(windowWidth,windowHeight);
  // s = createSprite(300, 300);
  db=firebase.database()
  // db.ref("sprite").on("value",getdata,showerror)
  g=new Game()
  g.getstate()
  g.start()
  
  
}

function draw() {
  // console.log(gs)
  background(b1);
  if(gs==1){
  g.play()  
  }
  if(pc==2){
  g.update(1)  
  }
  // if (keyDown("up")) {
  //   move((x = 0), (y = -3));
  // }
  // if (keyDown("down")) {
  //   move((x = 0), (y = 3));
  // }
  // if (keyDown("left")) {
  //   move((x = -3), (y = 0));
  // }
  // if (keyDown("right")) {
  //   move((x = 3), (y = 0));
  // }
  // drawSprites();
}

// function move(x, y) {
//   // s.x += x;
//   // s.y += y;
//   db.ref("sprite").update({x:p.x+x,y:p.y+y})
// }
// function getdata(a){
// p=a.val()  
// s.x=p.x
// s.y=p.y
// }
// function showerror(e){
// console.log(e)  
// }