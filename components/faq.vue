<template>
    <div class="footer">
        <h1>faq:</h1>
        <p class="q">Can I add images?</p>
        <p class="a">Yep. Go to <a href="https://instagram.dunklesToast.de">my ProfilePix Viewer</a> and search a user.
            If the image fits to this page, it gets added automatically (this process takes up to 6 hours)!</p>
        <p class="q">My profilepicture is here and I don't want that</p>
        <p class="a">To remove your picture from this page, you need to change your instagram profile picture. All
            images are loaded from instagram and if you delete it, this page won't show it. It can take about 24h for
            Instagram to fully remove images. Please note that it is possible, that your new image will also be added to
            this page!</p>
        <p class="q">I don't want any of my profile pictures here</p>
        <p class="a">Well, then delete your instagram profile picture. If you don't want your image on other webpages,
            why have you uploaded it? If you really want me to block your account from this page, write me a PM on some
            social media</p>
    </div>
</template>

<script>
    export default {
        name: "faq"
    }
</script>

<style scoped>
    .footer {
        text-align: center;
        color: white;
    }

    .q {
        font-weight: 800;
        margin-top: 10px;
    }
</style>
