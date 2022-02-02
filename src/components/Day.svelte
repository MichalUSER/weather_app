<script lang="ts">
  import { fade } from "svelte/transition";
  import type ITemp from "../utils/itemp";
  import { visible } from "../utils/stores";
  import { average } from "../utils/fetcher";

  export let temps: ITemp[][];
  export let days: string[];
  export let i: number;
  let dayTemps = temps[i];
  let dayAverage = average(dayTemps);
  let diffTemps = findDiff();
  let date = getDate();

  function getDate(): string {
    const t = dayTemps[0];
    return `${t.d}.${t.m}.${t.y}`;
  }

  interface DifferentI {
    highest: number;
    lowest: number;
  }

  function findDiff(): DifferentI {
    return dayTemps.reduce(
      (acc, curr) => {
        if (curr.averageTemp > acc.highest) {
          acc.highest = curr.averageTemp;
        } else if (curr.averageTemp < acc.lowest) {
          acc.lowest = curr.averageTemp;
        }
        return acc;
      },
      { highest: 0.0, lowest: dayTemps[0].averageTemp } as DifferentI
    );
  }
</script>

<div
  class="component"
  transition:fade={{
    duration: 200,
  }}
>
  <h1>{days[i]}</h1>
  <div class="desc">
	  <p>{dayAverage}°C</p>
    <div class="line"></div>
    <p>{date}</p>
  </div>
  <div class="scroll">
    {#each dayTemps as temp}
      <div
        class="wrapper"
        class:diff={temp.averageTemp == diffTemps.highest ||
          temp.averageTemp == diffTemps.lowest}
      >
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
  }

  .desc {
    display: flex;
    justify-content: center;
    margin-bottom: 1.3rem;
    margin-top: 0;
  }
  .line {
    width: 1px;
    height: 1.5rem;
    background-color: $blue-color;
  }
  .desc > p {
    margin: 0 0.5rem;
    &:first-child {
      color: $blue-color;
    }
    &:last-child {
      color: $fg-color;
    }
  }

  .diff {
    background-color: $diff-color;
  }
  .diff > p {
    color: #b9d1df;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:last-child {
      border: 0;
    }
    border-bottom: 1px solid #1d3643;
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
    width: 20rem;
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 5rem;
    padding: 0 1rem;
  }

  .component {
    width: 100%;
    height: 100%;
    padding: 0;
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    margin: 0;
    background: $bg-color;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>
