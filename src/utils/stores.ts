import { type Writable, writable } from "svelte/store";
import type ITemp from "./itemp";

const visible = writable(false);
const temps: Writable<ITemp[][]> = writable([[]]);
const days: Writable<string[]> = writable([]);
const currentDay: Writable<number> = writable();

export {
  visible,
  temps,
  days,
  currentDay
};
