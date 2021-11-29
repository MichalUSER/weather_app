<script lang="ts">
  export let number: number;
  export let hour: number;
</script>

<div class:night={hour > 20}>
  <h1>Temp</h1>
  {#if hour}
    <p>The temperature is <span>{number}°C</span></p>
  {:else}
    <p class="error-msg">Can't get the temp</p>
  {/if}
</div>

<style lang="scss">
  $night: #bcc1e0;

  div {
    text-align: center;
    border: 3px solid #83afc9;
    border-radius: 0.2rem;
    padding: 3rem;
    margin-top: 8rem;
  }
  .night {
    border-color: $night;
  }
  .error-msg {
    font-size: 1.2rem;
    color: #ea6161;
  }

  h1 {
    font-size: 3.1rem;
  }
  p {
    font-size: 1.5rem;
    span {
      color: #70a3c0;
      font-weight: bold;
    }
  }
</style>
