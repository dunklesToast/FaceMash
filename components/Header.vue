<template>
    <div style="height: 80px">
        <div class="header">
            <p id="head">FaceMash</p>
            <p id="sub">compare your friends images</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "headr"
    }
</script>

<style>
    .header {
        position: fixed;
        height: 80px;
        background-color: yellow;
        width: 100%;
        text-align: center;
        top: 0;
        left: 0;
        z-index: 999;
        overflow: hidden;
        margin-bottom: 80px;
    }

    #head {
        vertical-align: middle;
        line-height: 60px;
        font-size: 50px;
    }

    #sub {
        vertical-align: middle;
        font-size: 15px;
        margin-top: -5px;
    }
</style>
