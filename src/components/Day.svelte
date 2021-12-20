<script lang="ts">
  import { fly } from "svelte/transition";
  import type ITemp from "../utils/itemp";
  import visible from "../utils/stores";

  export let temps: ITemp[][];
  export let days: string[];
  export let i: number;
  let dayTemps = temps[i];
</script>

<div
  class="component"
  transition:fly={{
    duration: 200,
    x: 200,
    opacity: 0.4,
  }}
>
  <h1>{days[i]}</h1>
  {#each dayTemps as temp}
    <div class="wrapper">
      <h2>{temp.h}:00</h2>
      <p>{temp.averageTemp}°C</p>
    </div>
  {/each}
  <button on:click={() => ($visible = !$visible)}>OK</button>
</div>

<style lang="scss">
  @import "../style.scss";

  @mixin ok-button {
    font-size: 1.3rem;
    color: $bg-color;
    cursor: pointer;
    padding: 6px 2.3rem;
    border: none;
    border-radius: 8px;
    background-color: $blue-color;
    outline: none;

    &:focus {
      outline: auto;
    }
  }

  .wrapper {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  button {
    @include ok-button;
    position: absolute;
    bottom: 4rem;
  }
  .component {
    position: fixed;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0 1.3rem;
    width: 20vh;
    height: 100%;
    background: $bg-color;
    border-left: 1px solid $blue-color;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>
