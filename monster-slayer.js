new Vue({
  el: '#app',
  data: {
    youHealthBar: 100,
    monsterHealthBar: 100,
    newGameStarted: false,
   	logs: []
  },
  methods:{
  	logMonsterAttack(amount){
    	this.logs.push("MONSTER hit PLAYER for " + amount);
    },
    logPlayerAttack(amount){
    	this.logs.push("PLAYER hit MONSTER for " + amount);
    },
  	attack: function(){
    	var rand1 = Math.floor(Math.random() * 30);
    	var rand2 = Math.floor(Math.random() * 15);
    	var monsterElement = document.querySelector("#monster-healthbar	> .healthbar");
      var youElement = document.querySelector("#you-healthbar	> .healthbar");

      var newScore1 = this.monsterHealthBar - rand1;
      var newScore2 = this.monsterHealthBar - rand2;
      var vm = this;
      if(newScore1 < 1){
      	this.monsterHealthBar = 0;
      	monsterElement.style.width = '0%';
        setTimeout(function(){
        	vm.giveUp();
					alert("Game Over - You Win !")
					}, 1000);
      }else if(newScore2 <1){
      	this.youHealthBar = 0;
      	youElement.style.width = '0%';
        setTimeout(function(){
        	vm.giveUp();
					alert("Game Over - You Lose !")
					}, 1000);
      }else{
      	// attacking monster
        this.logPlayerAttack(rand1);
      	monsterElement.style.width = newScore1 + '%';
      	this.monsterHealthBar = newScore1;

        // monster attacks back
        this.logMonsterAttack(rand2);
      	youElement.style.width = newScore2 + '%';
      	this.youHealthBar = newScore2;
      }
    },
    heal: function(){
    	var rand = Math.floor(Math.random() * 30);
    	var elem = document.querySelectorAll("#you-healthbar	> .healthbar")[0];
      var newScore = this.youHealthBar + rand;
      if(newScore > 100) newScore = 100;
      elem.style.width = newScore + '%';
      this.youHealthBar = newScore;
    },
    specialAttack: function(){
    	var youElem = document.querySelectorAll("#you-healthbar	> .healthbar")[0];
      var monsterElem = document.querySelectorAll("#monster-healthbar	> .healthbar")[0];
			var newScore1 = this.monsterHealthBar - 35;
			var newScore2 = this.youHealthBar - 15;
      // monster lost - game over
      if( newScore1 < 0 ) {
      	this.monsterHealthBar = 0;
      	youElem.style.width = '0%';
        this.giveUp();
				alert("Game Over - You WIN !");
      } else if( newScore2 < 0 ){
      	// you lost - game over
      	this.youHealthBar = 0;
      	youElem.style.width = '0%';
				this.giveUp();
				alert("Game Over - You LOSE !");
      }else{
      	this.logPlayerAttack(35);
      	// attacking monster (35 points)
	      monsterElem.style.width = newScore1 + '%';
	      this.monsterHealthBar = newScore1;

      	this.logMonsterAttack(15);
	      // monster attavking back (15 points)
	      youElem.style.width = newScore2 + '%';
	      this.youHealthBar = newScore2;
      }
    },
    giveUp: function(){
    	this.newGameStarted = !this.newGameStarted;
      this.logs = [];
      var elements = document.querySelectorAll('.healthbar.text-center');
    	Array.from(elements).forEach( hb => hb.style.width = (100 + '%'));
      this.monsterHealthBar = 100;
      this.youHealthBar = 100;
    },
    startNewGame: function(){
    this.newGameStarted = !this.newGameStarted;
    if( !this.newGameStarted ) this.giveUp();
    }
  }
})
