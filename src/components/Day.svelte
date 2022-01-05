<script lang="ts">
  import { fly } from "svelte/transition";
  import type ITemp from "../utils/itemp";
  import visible from "../utils/stores";
  import { average } from "../utils/fetcher";

  export let temps: ITemp[][];
  export let days: string[];
  export let i: number;
  let dayTemps = temps[i];
  let dayAverage = average(dayTemps);
</script>

<div
  class="component"
  transition:fly={{
    duration: 200,
    x: 400,
  }}
>
  <h1>{days[i]}</h1>
  <p>{dayAverage}°C</p>
  <div class="scroll">
    {#each dayTemps as temp}
      <div class="wrapper">
        <h2>{temp.h}:00</h2>
        <p>{temp.averageTemp}°C</p>
      </div>
    {/each}
  </div>
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

  h1 {
    margin-bottom: 2px;
  }
  p {
    color: $blue-color;
    margin-top: 0;
    margin-bottom: 1.3rem;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .wrapper > * {
    margin: 7px;
  }

  button {
    @include ok-button;
    position: absolute;
    bottom: 0;
    margin-bottom: 1.3rem;
  }

  .scroll {
    @include sm {
      width: 70%;
    }
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 5rem;
  }

  .component {
    @include sm {
      width: 100%;
      border: 0;
      padding: 0;
    }
    position: fixed;
    z-index: 2;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0 1.3rem;
    height: 100%;
    background: $bg-color;
    border-left: 1px solid $blue-color;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>
