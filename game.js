class Game {
  constructor() {
    this.reset = createButton("reset");
    this.l1 = createElement("h2");
    this.l2 = createElement("h2");
    this.rank = 0;
    this.flag=false
    this.cflag=false
  }
  start() {
    f = new Form();
    f.display();
    p = new Player();
    pc = p.getCount();
    c1 = createSprite(width / 2 - 130, height - 62);
    c1.addImage("car1",sr);
    c1.addImage("blast",og5)
    c2 = createSprite(width / 2 + 110, height - 63);
    c2.addImage("car2",sr2);
    c2.addImage("blast",sr2)
    c1.scale = 0.091;
    c2.scale = 0.09;
    ca = [c1, c2];
    fg = new Group();
    gcg = new Group();
    og1 = new Group();
    this.addsprites(fg, 5, f1, 0.02);
    this.addsprites(gcg, 20, gc, 0.05);
    var obstaclesPositions = [
      { x: width / 2 + 200, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 200, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image },
    ];
    this.addsprites(
      og1,
      obstaclesPositions.length,
      obstacle1Image,
      0.05,
      obstaclesPositions
    );
  }
  getstate() {
    db.ref("gamestate").on("value", (b) => {
      gs = b.val();
    });
  }
  update(a) {
    db.ref("/").update({ gamestate: a });
  }
  play() {
    f.hide();
    this.showleaderboard();
    Player.getplayerinfo();
    p.getcar1();
    if (pi != undefined) {
      image(t, 0, -height * 5, width, height * 6);
      var i = 0;
      // console.log(pi)
      this.showlife();
      this.showfuel()
      for (var plr in pi) {
        // console.log(pi[p].name)
        i += 1;
        var x = pi[plr].positionx;
        var y = pi[plr].positiony;
        var lf=pi[plr].life
        if(lf<=0){
        ca[i-1].changeImage("blast")
        gs=2
        this.gameover()
        }
        ca[i - 1].x = x;
        ca[i - 1].y = y;
        // console.log(i,p.index)
        if (i == p.index) {
          ellipse(x, y, 100, 100);
          this.getfuel(i);
          this.getcoin(i);
          if (ca[i - 1].position.y >= -2484)
            camera.position.y = ca[i - 1].position.y - 240;  
         this.dodgeobstacle(i)   
         this.dodgecars(i)
        }
        
      }

      this.move();
      const fl = -2954;
      if (p.positiony < fl) {
        gs = 2;
        p.rank += 1;
        Player.updatecar1(p.rank);
        p.updateplayer();
        this.showrank();
      }

      drawSprites();
    }
  }
  move() {
    // console.log(typeof(p))
    if (keyIsDown(UP_ARROW)) {
      p.flag = 1;
      this.flag=true
      p.positiony -= 10;
      p.updateplayer();
    }
    if (keyIsDown(LEFT_ARROW)) {
      p.flag = 1;
      p.positionx -= 10;
      p.updateplayer();
      this.cflag=true
    }
    if (keyIsDown(RIGHT_ARROW)) {
      p.flag = 1;
      p.positionx += 10;
      p.updateplayer();
      this.cflag=false
    }
    if (keyIsDown(DOWN_ARROW)) {
      p.flag = 1;
      p.positiony += 10;
      p.updateplayer();
    }
  }
  showleaderboard() {
    this.reset.position(width - 100, 100);
    this.reset.mousePressed(() => {
      db.ref("/").update({ playercount: 1, gamestate: 0, car1: 0 });
      window.location.reload();
    });
    this.l1.position(50, 50);
    this.l2.position(50, 100);
    this.l1.html("abcd: 000");
    this.l2.html("xyz,000");
    var plr=Object.values(pi)
    var lbl1,lbl2
    if((plr[0].rank==0 && plr[1].rank==0)||plr[0].rank==1){
    lbl1=plr[0].rank+"&emsp"+plr[0].name+"&emsp"+plr[0].score
    lbl2=plr[1].rank+"&emsp"+plr[1].name+"&emsp"+plr[1].score
    }
else{
  lbl2=plr[0].rank+"&emsp"+plr[0].name+"&emsp"+plr[0].score
  lbl1=plr[1].rank+"&emsp"+plr[1].name+"&emsp"+plr[1].score 
}
this.l1.html(lbl1);
this.l2.html(lbl2);
  } 

  addsprites(grp, ns, si, s, pts = []) {
    for (var i = 0; i < ns; i++) {
      if (pts.length > 0) {
        var x = pts[i].x;
        var y = pts[i].y;
        si = pts[i].image;
      } else {
        var x = random(width / 2 + 110, width / 2 - 130);
        var y = random(-height * 4, height - 400);
      }
      var sp = createSprite(x, y);
      // console.log(sp,si)
      sp.addImage(si);
      sp.scale = s;
      grp.add(sp);
    }
  }
  getfuel(i) {
    ca[i - 1].overlap(fg, (s1, s2) => {
      s2.remove();
      p.fuel = 200;
      p.updateplayer(); 
    });
    if(p.fuel>0 && this.flag){
      p.fuel-=1
      }
      if(p.fuel<=0){
      gs=2
      this.gameover() 
      }
  }
  getcoin(i) {
    ca[i - 1].overlap(gcg, (s1, s2) => {
      s2.remove();
      p.score += 5;
      p.updateplayer();
    });
  }
  showrank() {
    swal({
      title: `Rank ${"\n"} ${p.rank}`,
      image: "https://cdn-icons-png.flaticon.com/512/880/880605.png",
      imageSize: "100x100",
      confirmButtonText: "Okay",
    });
  }
  showlife() {
    push();
    image(l, width / 2-100,p.positiony-100, 25, 25);
    fill("white")
    rect(width/2-75,p.positiony-100,200,25)
    fill("black")
    rect(width/2-75,p.positiony-100,p.life,25)
    pop();
  }
  showfuel() {
    push();
    image(f10, width / 2-100,p.positiony-135, 25, 25);
    fill("black")
    rect(width/2-75,p.positiony-135,200,25)
    fill("white")
    rect(width/2-75,p.positiony-135,p.fuel,25)
    // console.log(height-p.positiony,p.positiony)
    pop();
  }
  gameover(){
  swal({
  title:"Game Over",
  imageUrl:"https://cdn-icons-png.flaticon.com/512/1634/1634070.png",  
  imageSize:"100x100",
  confirmButtonText:"Thanks for playing"
  })  
  }
  dodgeobstacle(i){
  if(ca[i-1].collide(og1)){
  if(this.cflag){
  p.positionx+=100  
  }
  else{
  p.positionx-=100  
  }  
  if(p.life>0){
  p.life-=200/4
  }  
  p.updateplayer()  
  }
  }
  dodgecars(i){
  if(i==1) {
  if(ca[i-1].collide(ca[1])){
    if(this.cflag){
      p.positionx+=100  
      }
      else{
      p.positionx-=100  
      }  
      if(p.life>0){
      p.life-=200/4
      }  
      p.updateplayer()  
  } }else{
    if(ca[i-1].collide(ca[0])){
      if(this.cflag){
        p.positionx+=100  
        }
        else{
        p.positionx-=100  
        }  
        if(p.life>0){
        p.life-=200/4
        }  
        p.updateplayer()   
  } 
  }
}
}
