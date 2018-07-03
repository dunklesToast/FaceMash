<template>
    <section class="container">
        <headr></headr>
        <div class="content">
            <box></box>
            <p class="info">select the image you like the most.</p>
            <p class="info">you can also use your arrow keys (← | →) to select the image!</p>
            <p class="info">undecided? arrow up for 2 new images (if on phone reload the page)</p>
        </div>
        <ins class="adsbygoogle"
             style="display:inline-block;width:970px;height:90px"
             data-ad-client="ca-pub-6054315350743573"
             data-ad-slot="3483090847"></ins>
        <hr>
        <faq></faq>
        <ins class="adsbygoogle"
             style="display:inline-block;width:970px;height:90px"
             data-ad-client="ca-pub-6054315350743573"
             data-ad-slot="3483090847"></ins>
        <legal></legal>
        <ins class="adsbygoogle"
             style="display:inline-block;width:970px;height:90px"
             data-ad-client="ca-pub-6054315350743573"
             data-ad-slot="3483090847"></ins>
    </section>
</template>

<script>
    import Header from '~/components/Header.vue'
    import ImageBox from '~/components/image-box.vue'
    import legal from '~/components/legal.vue'
    import faq from '~/components/faq.vue'
    import lytics from 'vue-analytics';

    export default {
        socket: null,
        components: {
            'headr': Header,
            'box': ImageBox,
            legal,
            faq
        },
        mounted() {
            window.addEventListener('keyup', this.emitVote);
            this.$on('changeFIcon', this.changeFavicon)
        },
        beforeDestroy() {
            window.removeEventListener('keyup', this.emitVote);
        },
        methods: {
            removeFavicon() {
                console.log('Removing FavIcon');
                const head = document.getElementsByTagName('head')[0];
                const links = head.getElementsByTagName('link');
                for (let i in links) {
                    if (links.hasOwnProperty(i)) {
                        if (links[i].type === "image/x-icon" || links[i].rel === "shortcut icon") {
                            head.removeChild(links[i]);
                            return;
                        }
                    }
                }
            },
            changeFavicon(img) {
                console.log('change icon');
                this.removeFavicon();
                const icon = document.createElement('link');
                icon.type = 'image/x-icon';
                icon.rel = 'shortcut icon';
                icon.href = img;
                document.getElementsByTagName('head')[0].appendChild(icon)
            },
            emitVote(evt) {
                this.$emit('vote', evt.key);
            }
        }
    }
</script>

<style>
    body {
        background-color: #47494e;
    }

    .content {
        margin-top: 50px;
    }

    .info {
        text-align: center;
        color: white;
    }

    a {
        color: #dbe1ec;
    }

</style>
