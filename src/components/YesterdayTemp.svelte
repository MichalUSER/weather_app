<script lang="ts">
  import { onMount } from "svelte";
  import type ITemp from "../utils/itemp";

  export let temp: number = 0;
</script>

<div>
  <h1>Yesterday temp</h1>
  {#if temp}
    <p>{temp}°C</p>
  {:else}
    <p class="error-msg">Can't get the temps</p>
  {/if}
</div>

<style lang="scss">
  @import "../style.scss";

  div {
    @include component;
    @include flex;
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
    margin: 5px 10px;
  }
</style>
