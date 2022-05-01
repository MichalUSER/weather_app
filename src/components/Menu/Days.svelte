<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { currentDay, days, averages } from "@utils/stores";

  const dispatch = createEventDispatcher<{ changeDay: number }>();

  function changeDay(index: number) {
    dispatch("changeDay", index);
  }
</script>

<div class="days">
  {#each $days as d, index}
    <div class="day-div">
      <p class="temp">{$averages[index]}°C</p>
      <button
        class="day"
        class:current={$currentDay == index}
        on:click={() => changeDay(index)}>{d.slice(0, 2)}</button
      >
    </div>
  {/each}
</div>

<style lang="scss">
  @import "../../style.scss";

  .days {
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top: 1rem;
  }

  .day-div {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 10px;
  }
  .day {
    @include day-button;
    &:focus {
      color: $blue-color;
    }
  }

  .temp {
    color: $blue-color;
    font-size: 0.8rem;
  }

  .current {
    color: $blue-color;
  }
</style>
