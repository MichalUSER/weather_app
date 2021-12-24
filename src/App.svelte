<script lang="ts">
  import { onMount } from "svelte";

  import Temp from "./components/Temp.svelte";
  import YesterdayTemp from "./components/YesterdayTemp.svelte";
  import TempButtons from "./components/TempButtons.svelte";

  import request from "./utils/request";
  import type ITemp from "./utils/itemp";
  import { url, fetchTemp, fetchTemps } from "./utils/fetcher";

  let averageTemp = 0;
  let weekTemps = fetchTemps();
  let temp = fetchTemp();

  function getAverage(temps: ITemp[]): number {
    const sum = temps.reduce((acc, curr) => acc + parseFloat(curr.averageTemp), 0);
    return +(sum / temps.length).toFixed(2);
  }

  onMount(async () => {
    const date = new Date();
    const yesterdayTemps = await request<ITemp[]>(`${url}/temps/${date.getDate() - 1}`);
    averageTemp = getAverage(yesterdayTemps);
  });
</script>

<main>
  {#await temp}
    <p>waiting...</p>
  {:then data}
    <Temp number={data.averageTemp} hour={data.h} />
  {/await}
  <YesterdayTemp temp={averageTemp} />
  {#await weekTemps}
    <p>waiting...</p>
  {:then data}
    <TempButtons temps={data[0]} days={data[1]} />
  {/await}
</main>

<style lang="scss">
  @import "./style.scss";

  :root {
    background-color: $bg-color;
    color: $fg-color;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  main {
    @include sm {
      width: 100%;
      margin-top: 1rem;
    }
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 140vh;
  }
</style>
