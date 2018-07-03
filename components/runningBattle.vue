<!--suppress ALL -->
<template>
    <div>
        <table>
            <thead>
            <tr>
                <th>
                    <img :src="limage.url">
                </th>
                <th>
                    <img v-if="data.ended" v-bind:class="{mirrored: (rimage.id === data.winner)}" src="/fight.gif" class="centerOne">
                    <img v-if="!data.ended" src="/unknown.gif" class="centerOne">
                </th>
                <th>
                    <img :src="rimage.url">
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>{{limage.name}}</th>
                <th>vs</th>
                <th>{{rimage.name}}</th>
            </tr>
            </tbody>
        </table>
        <hr>
    </div>
</template>

<script>
    export default {
        name: "runningBattle",
        props: ["data"],
        data() {
            return {
                limage: {},
                rimage: {}
            }
        },
        async mounted() {
            const left = await (await fetch('/i2l/' + this.data.images[0])).json()
            this.$set(this.$data, 'limage', left);
            const right = await (await fetch('/i2l/' + this.data.images[1])).json()
            this.$set(this.$data, 'rimage', right)
        }
    }
</script>

<style scoped>
    @font-face {
        font-family: CAP;
        src: url("/American Captain.otf") format("opentype");
    }

    * {
        text-align: center;
    }

    p {
        font-family: CAP;
        letter-spacing: 1vw;
        font-size: 2vmax;
    }

    table {
        max-width: 100%;
        width: 100%;
    }

    img {
        max-width: 200px;
        width: 100%;
    }

    hr {
        opacity: 0.2;
        margin: 10px;
    }

    .mirrored {
        transform: scaleX(-1);
    }
</style>
