new Vue({
  el: '#app',
  data: {
    playerHealthBar: 100,
    monsterHealthBar: 100,
    newGameStarted: false,
   	logs: []
  },
  methods:{
    // logAttacks: function(){
    //   return;
    // },
  	// logMonsterAttack(amount){
    // 	this.logs.unshift("MONSTER hit PLAYER for " + amount);
    // },
    // logPlayerAttack(amount){
    // 	this.logs.unshift("PLAYER hit MONSTER for " + amount);
    // },
    getRandom: function(min,max){
      return Math.max(Math.floor(Math.random() * max) +1, min);
    },
    checkWinLose: function(){
      if(this.monsterHealthBar <= 0){
        this.giveUp();
				alert("Game Over - You Win !");
        return true;
      } else if(this.playerHealthBar <= 0){
        this.giveUp();
				alert("Game Over - You Lose !");
        return true;
      }else{
        return false;
      }
    },
  	attack: function(){
      var monsterDamage = this.getRandom(3,15);
      this.monsterHealthBar -= monsterDamage;
      this.logs.unshift({
        isPlayer: true,
        text: 'PLAYER hit MONSTER for ' + monsterDamage
      });
      if(this.checkWinLose()){
        return;
      }
      var playerDamage = this.getRandom(2,8);
      this.playerHealthBar -= playerDamage;
      this.logs.unshift({
        isPlayer: false,
        text: 'MONSTER hit PLAYER for ' + playerDamage
      });
      this.checkWinLose();
    },
    heal: function(){
      var healingAmount = this.getRandom(5,12);
      if(this.playerHealthBar + healingAmount > 100){
        this.playerHealthBar = 100;
        return;
      }
      this.playerHealthBar += healingAmount;
      this.logs.unshift({
        isPlayer: true,
        text: 'Player heals for ' + healingAmount
      });
    },
    specialAttack: function(){
      var monsterDamage = this.getRandom(8,25);
      this.monsterHealthBar -= monsterDamage;
      this.logs.unshift({
        isPlayer: true,
        text: 'PLAYER hit MONSTER HARD for ' + monsterDamage
      });
      if(this.checkWinLose()){
        return;
      }
      var playerDamage = this.getRandom(8,18);
      this.playerHealthBar -= playerDamage;
      this.logs.unshift({
        isPlayer: false,
        text: 'MONSTER hit PLAYER HARD for ' + playerDamage
      });
      this.checkWinLose();
    },
    giveUp: function(){
    	this.newGameStarted = false;
      this.logs = [];
      this.monsterHealthBar = 100;
      this.playerHealthBar = 100;
    },
    startNewGame: function(){
    this.newGameStarted = true;
    // this.monsterHealthBar = 100;
    // this.playerHealthBar = 100;
    // this.logs = [];
    }
  }
})
