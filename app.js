const randomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + 10;
}

const app = Vue.createApp({
    data(){
        return{
            monsterHealth : 100,
            playerHealth : 100,
            round: 0
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
        }
    }
});

app.mount('#game');