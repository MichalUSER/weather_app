<div>
  <p>Can't fetch temps</p>
</div>

<style lang="scss">
  @import "../style.scss";

  div {
    @include component;
    @include sm {
      padding: 1rem 1.4rem;
    }
  }
  p {
    font-size: 1.8rem;
    color: $error-color;
  }
</style>
