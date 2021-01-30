<template>
  <div class="particle-background">
    <ul>
      <li v-for="i in 55"></li>
    </ul>
  </div>
</template>

<style lang="scss">
.particle-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  ul {
    margin: 0;
    padding: 0;
  }

  ul, ul > li {
    list-style: none;
  }

  li {
    position: absolute;
    display: block;
    //transition-timing-function: linear;
    animation: square infinite;

    @function randomNum($min, $max) {
      $rand: random();
      $randomNum: $min + floor($rand * (($max - $min) + 1));

      @return $randomNum;
    }

    @for $i from 1 through 55 {

      &:nth-child(#{$i}) {
        $box-size: randomNum(3, 15) + px;
        border-radius: 50%;
        width: $box-size;
        height: $box-size;
        left: randomNum(-2, 105) * 1vh;
        bottom: randomNum(0, 105) * 1vh;
        background-color: rgba(255, 255, 255, randomNum(5, 70) * .01);
        box-shadow: rgba(255, 255, 255, randomNum(5, 90) * .01) 0 0 15px;
        //animation-delay: randomNum(1, 7) + s;
        animation-duration: randomNum(75, 200) + s;
        transform: rotate(random(360) + deg);
      }
    }
  }

  @keyframes square {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-150vh) rotate(600deg);
    }
  }
}
</style>
