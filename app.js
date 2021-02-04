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
            gameRunning: true,
            logMessage: []
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
            this.logMessage.unshift(`Monster attack player by ${attackValue} force`)
        },
        attackPlayer(){
            this.round ++;
            const attackValue = randomValue(4, 10);
            this.monsterHealth -= attackValue;
            this.logMessage.unshift(`Player attack monster by ${attackValue} force`)
            this.attackMonster();
        },
        specialAttack(){
            this.round ++;
            const attackValue = randomValue(10, 15);
            this.monsterHealth -= attackValue;
            this.logMessage.unshift(`Player special-attack monster by ${attackValue} force`)
            this.attackMonster();
        },
        healPlayer(){
            this.round ++;
            const healValue = randomValue(1, 6);
            this.logMessage.unshift(`Player heals by ${healValue}`)
            this.playerHealth += healValue;
            this.attackMonster();
        },
        surrender(){
            this.monsterHealth = randomValue(10, 50);
            this.playerHealth = randomValue(1, 3);
            this.winner = 'Lost';
            this.gameRunning = false;
        },
        restart(){
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.round = 0;
            this.winner = null;
            this.gameRunning = true;
            this.logMessage = []
        }
    }
});

app.mount('#game');