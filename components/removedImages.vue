<template>
    <table>
        <thead>
        <tr>
            <th>Username</th>
            <th>Image</th>
            <th>Update?</th>
        </tr>
        </thead>
        <tbody>
        <block v-for="image in removedImages" v-bind:key="image.id" :data="image" :waiting="true"></block>
        </tbody>
    </table>
</template>

<script>

    import block from '~/components/imgBlock.vue';


    export default {
        name: "removedImages",
        components: {
            block
        },
        data() {
            return {
                removedImages: []
            }
        },
        methods: {
            async getData() {
                this.$set(this.$data, 'removedImages', await(await fetch('/removed')).json());
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
