<script lang="ts">
  import type ITemp from "../itemp";
  export let temps: ITemp[];
</script>

<div>
  <h1>Yesterday temps</h1>
  {#if temps}
    {#each temps as temp}
      <p>{temp.averageTemp}°C</p>
    {/each}
  {:else}
    <p class="error-msg">Can't get the temps</p>
  {/if}
</div>

<style lang="scss">
  div {
    text-align: center;
    border: 3px solid #83afc9;
    border-radius: 0.2rem;
    padding: 3rem;
    margin-top: 8rem;
    margin-left: 2rem;
  }
  .error-msg {
    font-size: 1.2rem;
    color: #ea6161;
  }

  h1 {
    font-size: 1.7rem;
  }
  p {
    font-size: 1.3rem;
    color: #70a3c0;
    font-weight: bold;
  }
</style>
