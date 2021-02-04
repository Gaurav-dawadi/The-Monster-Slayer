const randomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + 10;
}

const app = Vue.createApp({
    data(){
        return{
            monsterHealth : 100,
            playerHealth : 100
        }
    },
    methods: {
        attackMonster(){
            const attackValue = randomValue(8, 15);
            this.playerHealth -= attackValue;
        },
        attackPlayer(){
            const attackValue = randomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attackMonster();
        }
    }
});

app.mount('#game');