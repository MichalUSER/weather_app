<script lang="ts">
  export let number: number;
  export let hour: number;
</script>

<div class:night={hour > 20}>
  <h1>Current temp</h1>
  {#if hour}
    <p>{number}°C</p>
  {:else}
    <p class="error-msg">Can't get the temp</p>
  {/if}
</div>

<style lang="scss">
  @import "../style.scss";

  $night: #bcc1e0;

  div {
    @include component;
    @include sm {
      padding: 1rem 1.4rem;
    }
  }
  .night {
    border-color: $night;
  }
  .error-msg {
    font-size: 1.2rem;
    color: #ea6161;
  }

  h1 {
    font-size: 2.6rem;
    @include sm {
      font-size: 1.9rem;
    }
  }
  p {
    font-size: 1.5rem;
    color: #70a3c0;
    font-weight: bold;
    @include sm {
      font-size: 1.1rem;
    }
  }
</style>
