<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { currentDay, days } from "../../utils/stores";

  const dispatch = createEventDispatcher<{ changeDay: number }>();

  function changeDay(index: number) {
    dispatch("changeDay", index);
  }
</script>

<div class="days">
  {#each $days as d, index}
    <button
      class="day"
      class:current={$currentDay == index}
      on:click={() => changeDay(index)}>{d.slice(0, 2)}</button
    >
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
</style>
