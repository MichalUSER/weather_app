<script lang="ts">
  import Menu from "./Menu/Menu.svelte";
  import { currentDay, days, visible } from "@utils/stores";

  function onClick(index: number) {
    $visible = !$visible;
    $currentDay = index;
  }
</script>

<div class="component">
  <h1>Week temps</h1>
  <div class="days">
    {#each $days as d, index}
      <button on:click={() => onClick(index)}>{d}</button>
    {/each}
  </div>
</div>

{#if $visible}
  <Menu />
{/if}

<style lang="scss">
  @import "../style.scss";

  h1 {
    font-size: 1.7rem;
    margin: 0;
    margin-bottom: 3rem;
    @include sm {
      margin-bottom: 1rem;
    }
  }

  .component {
    @include component;
    margin-top: 4rem;
    padding: 3rem 3rem;
    @include sm {
      margin-top: 2rem;
      padding: 1rem;
    }
  }

  .days {
    display: flex;
    justify-content: center;
    flex-direction: row;
    @include sm {
      flex-direction: column;
    }
  }

  button {
    @include day-button;
    margin: 0.2rem 10px;
  }
</style>
