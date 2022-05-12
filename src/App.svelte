<script lang="ts">
  import { onMount } from "svelte";

  import Loading from "./components/Loading.svelte";
  import Header from "./components/Header.svelte";
  import Temp from "./components/Temp.svelte";
  import YesterdayTemp from "./components/YesterdayTemp.svelte";
  import TempButtons from "./components/TempButtons.svelte";
  import Error from "./components/Error.svelte";

  import request from "./utils/request";
  import type ITemp from "./utils/itemp";
  import { url, fetchTemp, fetchTemps, average } from "./utils/fetcher";
  import { visible, temps, days, averages } from "./utils/stores";

  let averageTemp = 0;
  let temp = fetchTemp();

  onMount(async () => {
    const weekTemps = await fetchTemps();
    $temps = weekTemps[0];
    $days = weekTemps[1];
    $averages = weekTemps[2];
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const yesterdayTemps = await request<ITemp[]>(
      `${url}/temps/${date.getMonth() + 1}/${date.getDate()}`
    );
    averageTemp = average(yesterdayTemps);
  });
</script>

<Header />
<div class="wrapper">
  <main>
    {#await temp}
      <Loading />
    {:then data}
      <Temp number={data.averageTemp} hour={data.h} />
      <YesterdayTemp temp={averageTemp} />
      <TempButtons />
    {:catch}
      <Error />
    {/await}
  </main>
</div>

<!-- used https://www.shapedivider.app/ -->
<div class="wave">
  <svg
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 120"
    preserveAspectRatio="none"
  >
    <path
      d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
      class="shape-fill"
    />
  </svg>
</div>

<svelte:head>
  {#if $visible}
    <style>
      body {
        overflow: hidden;
      }
    </style>
  {/if}
</svelte:head>

<style lang="scss">
  @import "./style.scss";

  :root {
    background-color: $bg-color;
    color: $fg-color;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color-scheme: dark;
  }

  .wrapper {
    display: flex;
    justify-content: center;
  }

  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
  }

  .wave svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 93px;
  }

  .wave .shape-fill {
    fill: #4985a7;
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
    width: 115vh;
  }
</style>
