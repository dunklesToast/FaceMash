<template>
    <table>
        <thead>
        <tr>
            <th>Username</th>
            <th>Image</th>
            <th>Allow?</th>
        </tr>
        </thead>
        <tbody>
        <block v-for="image in waitingImages" v-bind:key="image.id" :data="image"></block>
        </tbody>
    </table>
</template>

<script>

    import block from '~/components/imgBlock.vue';


    export default {
        name: "waitingImages",
        components: {
            block
        },
        data() {
            return {
                waitingImages: []
            }
        },
        methods: {
            async getData() {
                this.$set(this.$data, 'waitingImages', await(await fetch('/waiting')).json());
            }
        },
        mounted() {
            this.getData();
            this.$on('loadNewImages', this.getData)
        }
    }
</script>

<style scoped>

</style>
