<script lang="ts">
  import { onMount } from "svelte";

  import Loading from "./components/Loading.svelte";
  import Header from "./components/Header.svelte";
  import Temp from "./components/Temp.svelte";
  import YesterdayTemp from "./components/YesterdayTemp.svelte";
  import TempButtons from "./components/TempButtons.svelte";

  import request from "./utils/request";
  import type ITemp from "./utils/itemp";
  import { url, fetchTemp, fetchTemps, average } from "./utils/fetcher";

  let averageTemp = 0;
  let weekTemps = fetchTemps();
  let temp = fetchTemp();

  onMount(async () => {
    const date = new Date();
    const yesterdayTemps = await request<ITemp[]>(`${url}/temps/${date.getDate() - 1}`);
    averageTemp = average(yesterdayTemps);
  });
</script>

<Header />
<div class="wrapper">
  <main>
    {#await temp}
    {:then data}
      <Temp number={data.averageTemp} hour={data.h} />
    {/await}
    <YesterdayTemp temp={averageTemp} />
    {#await weekTemps}
      <Loading />
    {:then data}
      <TempButtons temps={data[0]} days={data[1]} />
    {/await}
  </main>
</div>

<style lang="scss">
  @import "./style.scss";

  :root {
    background-color: $bg-color;
    color: $fg-color;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .wrapper {
    display: flex;
    justify-content: center;
  }

  main {
    @include sm {
      width: 100%;
      margin-top: 3rem;
    }
    margin-top: 5rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 120vh;
  }
</style>
