<template>
    <img :src="data.src">
</template>

<script>
    export default {
        name: "image-modal",
        props: ['data'],
        data() {
            return {
                src: ""
            }
        }
    }
</script>

<style scoped>
    img {
        width: 100%;
    }
</style>
