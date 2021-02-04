const randomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + 10;
}

const app = Vue.createApp({
    data(){
        return{
            monsterHealth : 100,
            playerHealth : 100,
            round: 0,
            winner: null,
            gameRunning: true
        }
    },
    computed: {
        monsterHealthBar(){
            return {width: this.monsterHealth + '%' }
        },
        playerHealthBar(){
            return {width: this.playerHealth + '%' }
        },
        buttonDisable(){
            return this.round % 3 !== 0
        }
    },
    watch : {
        playerHealth(value){
            if (value < 0 && this.monsterHealth < 0){
                this.winner = 'Draw'
                this.gameRunning = false
            }else if (value < 0) {
                this.winner = 'Lost'
                this.gameRunning = false
            }
        },
        monsterHealth(value){
            if (value < 0 && this.playerHealth < 0){
                this.winner = 'Draw'
                this.gameRunning = false
            }else if (value < 0) {
                this.winner = 'Won'
                this.gameRunning = false
            } 
        }
    },
    methods: {
        attackMonster(){
            const attackValue = randomValue(5, 11);
            this.playerHealth -= attackValue;
        },
        attackPlayer(){
            this.round ++;
            const attackValue = randomValue(4, 10);
            this.monsterHealth -= attackValue;
            this.attackMonster();
        },
        specialAttack(){
            this.round ++;
            const attackValue = randomValue(10, 15);
            this.monsterHealth -= attackValue;
            this.attackMonster();
        },
        healPlayer(){
            this.round ++;
            const healValue = randomValue(1, 6);
            this.playerHealth += healValue;
        },
        surrender(){
            this.winner = 'Lost'
        },
        restart(){
            this.monsterHealth = 100,
            this.playerHealth = 100,
            this.round = 0,
            this.winner = null,
            this.gameRunning = true
        }
    }
});

app.mount('#game');