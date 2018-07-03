<template>
    <tr>
        <td>{{data.name}}</td>
        <td><img :id="data.id" v-on:click="showBig()" :src="imgsrc"></td>
        <td>
            <button v-if="!data.waiting" v-on:click="updateImage()">update?</button>
            <button v-if="!data.waiting" v-on:click="remove()">remove?</button>
            <button v-if="data.waiting" v-on:click="update('wating', false)">approve</button>
            <button v-if="data.waiting" v-on:click="remove()">remove</button>
        </td>
    </tr>
</template>

<script>
    export default {
        name: "imgBlock",
        props: ['data'],
        data() {
            return {
                imgsrc: ""
            }
        },
        async mounted() {
            this.loadImages();
        },
        methods: {
            async update(action, type) {
                const url = `/m/${action}/${type}/${this.data.id};`
                await fetch(url, {
                    method: "PATCH",
                    body: JSON.stringify({
                        url: this.$data.imgsrc
                    }),
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                this.$parent.$emit('loadNewImages')
            },
            async updateImage() {
                await fetch('/update/' + this.data.id, {
                    method: "POST",
                    body: JSON.stringify({
                        url: this.$data.imgsrc
                    }),
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                this.$parent.$emit('loadNewImages')
            },
            async remove() {
                await fetch('/remove/' + this.data.id, {
                    method: "DELETE"
                });
                this.$parent.$emit('loadNewImages')
            },
            async loadImages() {
                const newImageSrc = await (await fetch('https://instagram.dunklestoast.de/api/image?ignoretg=true&username=' + this.data.name)).json();
                this.$set(this.$data, 'imgsrc', newImageSrc.url);
            },
            async showBig() {
                if (document.getElementById(this.data.id).classList.contains('big')) {
                    document.getElementById(this.data.id).classList.remove('big');
                } else {
                    document.getElementById(this.data.id).classList.add('big');
                }
            },

        }
    }
</script>

<style scoped>
    img {
        width: 20vmax;
    }

    * {
        color: white;
    }

    button {
        background-color: #787a7f;
        border: none;
        border-radius: 25px;
        height: 30px;
        outline: none;
    }

    button:hover {
        background-color: #9ea0a5;
        border: none;
        border-radius: 25px;
        height: 30px;
        cursor: pointer;
    }

    .big {
        width: 50vmax;
    }
</style>
