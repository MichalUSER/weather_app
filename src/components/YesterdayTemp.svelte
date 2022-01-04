<script lang="ts">
  import { onMount } from "svelte";
  import type ITemp from "../utils/itemp";

  export let temp: number = 0;
</script>

{#if temp}
  <div>
    <h1>Yesterday temp</h1>
    <p>{temp}°C</p>
  </div>
{/if}

<style lang="scss">
  @import "../style.scss";

  div {
    @include component;
    @include flex;
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
