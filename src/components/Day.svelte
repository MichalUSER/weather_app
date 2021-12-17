<script lang="ts">
  import { fly } from "svelte/transition";
  import type ITemp from "../itemp";
  import visible from "../stores";

  export let temps: ITemp[][];
  export let day: string;
  export let i: number;
</script>

<div 
  class="component"
  transition:fly={{
    duration: 200,
    x: 200,
    opacity: 0.4,
}}
>
  <h1>{day}</h1>
  {#each temps[i] as temp}
    <p>{temp.averageTemp}°C</p>
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

  button {
    @include ok-button;
  }
  .component {
    position: fixed;
    top: 0;
    right: 0;
    margin: 0;
    padding: 1rem 3rem;
    height: 100%;
    background: $bg-color;
    border-left: 1px solid $blue-color;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>
