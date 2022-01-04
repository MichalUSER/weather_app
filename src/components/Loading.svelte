<div class="wrapper">
  <div class="block"></div>
</div>

<style lang="scss">
  @import "../style.scss";

  $duration: 1300ms;

  .wrapper {
    position: absolute;
    width: max-content;
    height: fit-content;
    z-index: 2;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .block {
    width: 2rem;
    height: 0.2rem;
    background-color: $blue-color;
    animation-name: rotate;
    animation-duration: $duration;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  p {
    color: $blue-color;
    font-size: 1.3rem;
  }
</style>
