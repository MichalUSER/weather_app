<script lang="ts">
  import { onMount } from "svelte";

  import request from "./request";
  import type ITemp from "./itemp";
  import Temp from "./components/Temp.svelte";
  import TodayTemps from "./components/TodayTemps.svelte";
  import TempButtons from "./components/TempButtons.svelte";

  let url = "http://localhost:3030";
  let temp: number;
  let temps: ITemp[];
  let hour: number;

  async function getTemp() {
    let response = await request<ITemp>(`${url}/last_temp`);
    temp = response.averageTemp;
    hour = response.h;
  }

  onMount(async () => {
    temps = await request<ITemp[]>(`${url}/temps/11`);
    getTemp();
  });
</script>

<main>
  <Temp number={temp} {hour} />
  <TodayTemps {temps} />
  <TempButtons />
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
