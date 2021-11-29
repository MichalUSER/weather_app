<script lang="ts">
  import { onMount } from "svelte";

  import request from "./request";
  import Temp from "./components/Temp.svelte";
  import DayTemps from "./components/DayTemps.svelte";

  let url = "http://192.168.0.110:8080";
  let temp: number;
  let temps: TempI[];
  let hour: number;

  interface TempI {
    averageTemp: number;
    h: number;
  }

  async function getTemp() {
    let response = await request<TempI>(`${url}/last_temp`);
    temp = response.averageTemp;
    hour = response.h;
  }

  onMount(async () => {
    temps = await request<TempI[]>(`${url}/temps/28`);
    getTemp();
  });
</script>

<main>
  <Temp number={temp} {hour} />
  <DayTemps {temps} />
</main>

<style lang="scss">
  /* Dark colors*/
  $bg-color: #0b1318;
  $fg-color: #f6f9fb;

  /* Light colors
  $bg-color: #f6f9fb;
  $fg-color: #0b0e15;
*/

  :root {
    background-color: $bg-color;
    color: $fg-color;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  main {
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>
