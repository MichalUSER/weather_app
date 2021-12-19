<script lang="ts">
  import { onMount } from "svelte";

  import Temp from "./components/Temp.svelte";
  import TodayTemps from "./components/TodayTemps.svelte";
  import TempButtons from "./components/TempButtons.svelte";

  import request from "./request";
  import type ITemp from "./itemp";
  import { url, fetchTemp, fetchTemps } from "./fetcher";

  let todayTemps: ITemp[] = [];
  let weekTemps = fetchTemps();
  let temp = fetchTemp();

  onMount(async () => {
    todayTemps = await request<ITemp[]>(`${url}/temps/8`);
  });
</script>

<main>
  {#await temp}
    <p>waiting...</p>
  {:then data}
    <Temp number={data.averageTemp} hour={data.h} />
  {/await}
  <TodayTemps temps={todayTemps} />
  {#await weekTemps}
    <p>waiting...</p>
  {:then data}
    {@debug data}
    <TempButtons days={data[1]} />
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
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100vh;
  }
</style>
