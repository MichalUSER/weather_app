<script lang="ts">
  import type ITemp from "../itemp";
  export let temps: ITemp[];
  export let day: string;
</script>

<div>
  <h1>{day}</h1>
  {#each temps as temp}
    <p>{temp.averageTemp}°C</p>
  {/each}
</div>

<style lang="scss">
  @import "../style.scss";

  div {
    @include component;
  }
</style>
