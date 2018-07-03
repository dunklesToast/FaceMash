<template>
  <div class="center">
    <img @click="vote('ArrowLeft')" :src="image1.url"/>
      <ins class="adsbygoogle"
           style="width:160px;height:600px"
           data-ad-client="ca-pub-6054315350743573"
           data-ad-slot="7505687210"></ins>
    <img @click="vote('ArrowRight')" :src="image2.url"/>
  </div>
</template>

<script>
  export default {
    name: "image-box",
    data() {
      return {
        image1: false,
        image2: false,
        buid: null
      }
    },
    mounted() {
      this.loadImages();
      this.$parent.$on('vote', this.vote)
    },
    methods: {
      async loadImages() {
        const imageOne = await (await fetch('/random')).json();
        const imageTwo = await (await fetch(`/similar/${imageOne.id}`)).json();
        this.$set(this.$data, 'image1', imageOne);
        this.$set(this.$data, 'image2', imageTwo);
        this.$set(this.$data, 'buid', imageTwo.buid);
      },
      async vote(side) {
        //undecided (easter egg)
        if (side === "ArrowUp") {
          this.loadImages();
          return;
        }
        //So we do not catch other keys
        if (side === "ArrowLeft" || side === "ArrowRight") {
          const winner = (side === "ArrowLeft" ? this.$data.image1 : this.$data.image2);
          const loser = (side === "ArrowRight" ? this.$data.image1 : this.$data.image2);
          this.processBattle({
            winner: winner.id,
            loser: loser.id,
            buid: this.$data.buid
          });
          //Image similar to winner
          const newImage = await (await fetch(`/similar/${winner.id}`)).json();
          //Set the loser image view to the new image
          this.$set(this.$data, (side === "ArrowLeft" ? "image2" : "image1"), newImage);
          this.$parent.$emit('changeFIcon', '/voted_' + (side.replace('Arrow', '').toLowerCase()) + '.png')
        }
      },
      async processBattle(data) {
        console.log(data);
        await fetch('/battleEnded', {
          body: JSON.stringify(data),
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          }
        });

      }
    }
  }
</script>

<style scoped>
  img {
    width: 49%;
    height: auto;
    display: flex;
    max-height: 750px;
    max-width: 750px;
  }

  .center {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    align-content: center;
  }

  @media all and (max-width: 500px) {
    .center {
      flex-direction: column;
    }

    img {
      width: 100%;
    }

  }

    @media all and (max-width: 1666px){
        ins {
            display: none;
        }
    }
</style>
