<template>
    <section class="container">
        <headr></headr>
        <div class="content">
            <h1>current battles</h1>
            <div class="battleContainer">
                <rb v-for="battle in data" v-if="!battle.ended" v-bind:key="battle.id" :data="battle"></rb>
            </div>
            <h1>previous battles</h1>
            <div class="battleContainer">
                <rb v-for="battle in data" v-if="battle.ended" v-bind:key="battle.id" :data="battle"></rb>
            </div>
        </div>
    </section>
</template>

<script>
    import headr from '~/components/Header.vue'
    import rb from '~/components/runningBattle.vue'
    import io from 'socket.io-client';

    export default {
        socket: null,
        components: {
            headr,
            rb
        },
        data() {
            return {
                data: null
            }
        },
        head() {
            return {
                title: "facemash | battles",
                meta: [
                    {hid: 'description', name: 'description', content: 'view the global facemash battles - live'},
                ]
            }
        },
        methods: {
            async connect() {
                //TODO handle better errors - maybe
                try {
                    this.$set(this.$data, 'data', await (await fetch('/lastBattles')).json());
                }catch (e) {
                    alert('error :(')
                }
                this.socket = io();
                this.socket.on('newData', (data) => {
                    const arr = this.$data.data;
                    arr.unshift(data.new_val);
                    this.$set(this.$data, 'data', arr)
                })
            }
        },
        beforeDestroy() {
            if (this.socket) this.socket.disconnect();
        },
        mounted() {
            this.connect();
        }
    }
</script>

<style scoped>
    @font-face {
        font-family: "Battle";
        src: url("/font.woff") format('woff');
    }

    h1 {
        text-align: center;
        font-family: "Battle";
        margin: 10px;
        font-size: 10vw;
        color: yellow;
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: black;
    }

    .container {
        background-color: #f7f8fb;
        width: 100%;
        background-image: url("/background.png");
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        height: 100%;
    }

    .content {
        color: white;
    }

    .battleContainer {
        max-width: 100%;
    }
</style>
