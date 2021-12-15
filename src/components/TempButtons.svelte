<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    let t = new Date();
    console.log(t.getDate());
  });
</script>

<div>
  <button>Sunday</button>
  <button>Monday</button>
  <button>Tuesday</button>
  <button>Wednesday</button>
</div>

<!-- <Day
  temps={[
    {
      averageTemp: -5,
      h: 7,
    },
  ]}
  day="Wednesday"
/> -->
<style lang="scss">
  @import "../style.scss";

  @mixin primary-button {
    text-decoration: underline;
    font-size: 1.3rem;
    color: $fg-color;
    cursor: pointer;
    padding: 1px;
    border: none;
    background-color: transparent;
    outline: none;

    &:focus {
      outline: auto;
    }
  }

  div {
    @include component;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }

  button {
    @include primary-button;
    margin: 0 10px;
  }
</style>
