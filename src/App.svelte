<script lang="ts">
  import { onMount } from "svelte";

  import Loading from "./components/Loading.svelte";
  import Header from "./components/Header.svelte";
  import Temp from "./components/Temp.svelte";
  import YesterdayTemp from "./components/YesterdayTemp.svelte";
  import TempButtons from "./components/TempButtons.svelte";
  import Error from "./components/Error.svelte";
  import Wave from "./components/Wave.svelte";

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

<Wave />

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
