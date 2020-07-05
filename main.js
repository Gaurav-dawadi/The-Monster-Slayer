new Vue({
  el: '#app',
  data:{
    playerHealth: 100,
    monsterHealth: 100,
    gameRunning: false,
    turn: [],
  },
  methods:{
    clickToStart(){
      this.gameRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turn = []
    },
    attack(){
      var damage = this.damage();
      this.monsterHealth -= damage;
      this.turn.unshift({
        isplayer: true,
        text: 'The player caused damage to Monster by ' + damage
      })
      if (this.checkForWin()){
        return;
      }

      damage = this.damage();
      this.playerHealth -= damage;
      this.turn.unshift({
        isplayer: false,
        text: 'The Monster caused damage to Player by ' + damage
      })
      this.checkForWin();
    },
    damage(){
      return Math.max(Math.floor(Math.random()*11), 1);
    },
    checkForWin(){
      if (this.monsterHealth<=1){
        if(confirm("You've won the game! Do you want to continue?")){
          this.clickToStart();
        }else{
          this.gameRunning = false;
        }
        return true;
      }else if (this.playerHealth<=1){
        if(confirm("You've lost the game! Do you want to continue?")){
          this.clickToStart();
        }else{
          this.gameRunning = false;
        }
        return true;
      }
     return false;
    },
    specialAttack(){
      this.playerHealth -= 5;
      if(this.checkForWin()){
        return
      }

      this.monsterHealth -= 10;
      this.turn.unshift({
        isplayer: true,
        text: 'The player hit Monster hard by ' + 10
      })
      this.checkForWin();
    },
    heal(){
      this.playerHealth += 5;
      this.turn.unshift({
        isplayer: true,
        text: 'The player is healed by ' + 5
      })
      return
    },
    giveUp(){
      if(confirm("Do You Want to Quit?")){
        this.gameRunning = false;
        this.clickToStart()
      }
      return
    }
  }

});
