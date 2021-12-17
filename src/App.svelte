<script lang="ts">
  import { onMount } from "svelte";

  import Temp from "./components/Temp.svelte";
  import TodayTemps from "./components/TodayTemps.svelte";
  import TempButtons from "./components/TempButtons.svelte";

  import request from "./request";
  import type ITemp from "./itemp";
  import { url } from "./fetcher";

  let todayTemps: ITemp[] = [];
  let number: number;
  let hour: number;

  onMount(async () => {
    todayTemps = await request<ITemp[]>(`${url}/temps/11`);
    // This works
    let response = await request<ITemp>(`${url}/last_temp`);
    number = response.averageTemp;
    hour = response.h;
    // This doesn't
    /*
    // outside onMount
    let temp: ITemp;
    // here
    temp = await request<ITemp>(`${url}/last_temp`);
    // when you try to access temp, it's undefined, why?
    */ 
  });
</script>

<main>
  <!--{#await tempP}
    <p>waiting...</p>
  {:then data}
  {/await}-->
  <Temp {number} {hour} />
  <TodayTemps temps={todayTemps} />
  <TempButtons days={["Tuesday", "Wednesday", "Thursday", "Friday"]} />
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
