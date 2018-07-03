<template>
    <section class="container">
        <headr></headr>
        <h1>removed images</h1>
        <removed></removed>
        <h1>wating images</h1>
        <waiting-images></waiting-images>
        <div style="height: 500px"></div>
    </section>
</template>

<script>
    import removed from '~/components/removedImages.vue';
    import headr from '~/components/Header.vue';
    import WaitingImages from "../components/waitingImages";

    export default {
        name: "check",
        components: {
            WaitingImages,
            removed,
            headr
        }
    }
</script>

<style scoped>
    * {
        text-align: center;
        min-height: 100%;
    }

    table {
        width: 100%;
        color: white;
    }

    .container {
        min-height: 100%;
        background-color: #47494e;
    }
</style>
