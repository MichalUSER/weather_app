<script lang="ts">
  import { onMount } from "svelte";

  export let days: string[];
  // export let temps: ITemp[];

  onMount(() => {
    let t = new Date();
    console.log(t.getDate());
  });
</script>

<div class="component">
  <h1>Week temps</h1>
  <div class="days">
    {#each days as d}
      <button>{d}</button>
    {/each}
  </div>
</div>

<!-- <Day
  temps={[
    {
      averageTemp: -5,
      h: 7,
    },
  ]}
  day="Wednesday"
/> -->
<style lang="scss">
  @import "../style.scss";

  @mixin primary-button {
    text-decoration: underline;
    font-size: 1.3rem;
    color: $fg-color;
    cursor: pointer;
    padding: 1px;
    border: none;
    background-color: transparent;
    outline: none;

    &:focus {
      outline: auto;
    }
  }

  h1 {
    font-size: 1.7rem;
    margin: 0;
    margin-bottom: 3rem;
  }

  .component {
    @include component;
    margin-top: 4rem;
    padding: 3rem 3rem;
  }

  .days {
    display: flex;
    justify-content: center;
    flex-direction: row;
  }

  button {
    @include primary-button;
    margin: 0 10px;
  }
</style>
