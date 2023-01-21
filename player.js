class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionx = 0;
    this.positiony = 0;
    this.flag = 0;
    this.fuel = 200;
    this.score=0
    this.rank=0
    this.life=200
  }
  getCount() {
    db.ref("playercount").on("value", (a) => {
      pc = a.val();
    });
  }
  getcar1(){
    db.ref("car1").on("value", (a) => {
      this.rank = a.val();
    });  
  }
  static updatecar1(rank){
  db.ref("/").update({car1:rank})  
  }
  updateplayer() {
    if (this.flag == 0) {
      if (this.index == 1) {
        this.positionx = width / 2 - 130;
        this.positiony = height - 62;
      } else {
        this.positionx = width / 2 + 110;
        this.positiony = height - 63;
      }
    }
    db.ref("players/player" + this.index).update({
      name: this.name,
      positionx: this.positionx,
      positiony: this.positiony,
      fuel: this.fuel,
      score: this.score,
      life:this.life
    });
  }
  updatepc() {
    db.ref("/").update({ playercount: pc });
  }
  static getplayerinfo() {
    db.ref("players").on("value", (c) => {
      pi = c.val();
    });
  }
}
