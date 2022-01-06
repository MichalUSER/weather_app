<header>
  <div class="wrapper">
    <h1>Weather</h1>
    <a href="https://github.com/MichalUSER" target="_blank">github</a>
  </div>
  <div class="lines">
    <div class="line"></div>
    <div class="line"></div>
  </div>
</header>

<style lang="scss">
  @import "../style.scss";

  $margin: 0.5rem 1rem;
  $line-height: 4px;
  $snow-dark-color: #AFCCDC;
  $snow-light-color: #D3E2EC;

  header {
    background-color: $blue-color;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .wrapper {
    display: flex;
    align-items: center;
  }

  .lines {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .line {
    background-color: $snow-dark-color;
    height: $line-height;
    &:nth-child(2) {
      background-color: $snow-light-color;
    }
  }

  h1 {
    margin: $margin;
    color: $bg-color;
    font-size: 1.9rem;
    @include sm {
      font-size: 1.3rem;
    }
  }

  a {
    color: $bg-color;
    text-decoration: none;
    opacity: 0.6;
    margin: $margin;
    right: 0;
    font-size: 1.1rem;
    position: fixed;
    &:hover {
      background-color: $snow-dark-color;
    }
    &:focus {
      outline: solid;
    }
  }
</style>
