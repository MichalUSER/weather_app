<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<div transition:fade={{
  duration: 200
}}>
</div>

<style lang="scss">
  $color: #f6f9fb0f;

  div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    z-index: 2;
    background-color: $color;
  }
</style>
