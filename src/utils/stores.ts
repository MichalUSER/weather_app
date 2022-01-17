import { writable } from "svelte/store";

const visible = writable(false);
const refresh = writable(false);

export {
  visible,
  refresh
};
