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

  function changeDay(index: number) {
    i = index;
    dayTemps = temps[i];
    dayAverage = average(dayTemps);
    diffTemps = findDiff();
    date = getDate();
  }
</script>

<div
  class="component"
  transition:fade={{
    duration: 200,
  }}
>
  <div class="days">
    {#each days as d, index}
      <button
        class="day"
        class:current={i == index}
        on:click={() => changeDay(index)}>{d.slice(0, 2)}</button
      >
    {/each}
  </div>
  <h1>{days[i]}</h1>
  <div class="desc">
    <p>{date}</p>
    <div class="line" />
    <p>Lowest: <span class="temp">{diffTemps.lowest}°C</span></p>
    <div class="line" />
    <p>Highest: <span class="temp">{diffTemps.highest}°C</span></p>
    <div class="line" />
    <p>Average: <span class="temp">{dayAverage}°C</span></p>
  </div>
  <div class="scroll">
    {#each dayTemps as temp}
      <div
        class="wrapper"
        class:diff={temp.averageTemp == diffTemps.highest ||
          temp.averageTemp == diffTemps.lowest}
      >
        <h2>{temp.h}:00</h2>
        <p class="temp">{temp.averageTemp}°C</p>
      </div>
    {/each}
  </div>
  <button class="ok" on:click={() => ($visible = !$visible)}>OK</button>
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

  .days {
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top: 1rem;
  }
  .day {
    @include day-button;
    &:focus {
      color: $blue-color;
    }
    margin: 0 10px;
  }
  .current {
    color: $blue-color;
  }

  h1 {
    margin-bottom: 2px;
    margin-top: 0.5rem;
  }

  .desc {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2.5rem;
    margin-top: 0;
    @include sm {
      flex-direction: column;
      margin-bottom: 0.8rem;
    }
  }
  .line {
    width: 1px;
    height: 1.5rem;
    margin: 0 0.5rem;
    @include sm {
      width: 100%;
      height: 1px;
    }
    background-color: $blue-color;
  }
  .desc > p {
    color: $fg-color;
    margin: 3px 0;
  }
  .temp {
    color: $blue-color;
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

  .ok {
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
