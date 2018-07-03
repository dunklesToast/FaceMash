<template>
    <div class="content">
        <p v-if="error.statusCode === 404">page not found</p>
        <p v-if="error.statusCode === 500">page not found</p>
        <p id="code">{{error.statusCode}}</p>
        <p id="ascii">¯¯¯¯¯\_(ツ)_/¯¯¯¯¯</p>
    </div>
</template>

<script>
    export default {
        props: ['error']
    }
</script>

<style scoped>
    html {
        font-size: 16px;
        word-spacing: 1px;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
    }

    *, *:before, *:after {
        box-sizing: border-box;
        margin: 0;
    }

    .content {
        background-color: #47494e;
        height: 100%;
        width: 100%;
        color: white;
        text-align: center;
        position: fixed;
    }

    #code {
        font-size: 50vmin;
        margin-bottom: -10vmin;
    }

    #ascii {
        font-size: 10vmin;
    }
</style>
