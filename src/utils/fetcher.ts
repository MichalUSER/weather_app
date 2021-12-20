import type ITemp from "./itemp";
import request from "./request";

const url = "http://localhost:3030";

async function fetchTemp(): Promise<ITemp> {
  return await request<ITemp>(`${url}/last_temp`);
}

function toDay(n: number): string {
  switch (n) {
    case 8:
      return "Monday";
    case 9:
      return "Tuesday";
    case 10:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";
    default:
      break;
  }
}

function getDay(): number {
  const d = new Date().getDay();
  switch (d) {
    case 0:
      return 7;
    case 1:
      return 8;
    case 2:
      return 9;
    case 3:
      return 10;
    default:
      return d;
  }
}

async function fetchTemps(): Promise<[ITemp[][], string[]]> {
  let fourTemps: ITemp[][] = [];
  let days: string[] = [];
  // let monthDay = 11 // for dev purposes
  let day = getDay();
  let dayOfMonth = new Date().getDate();
  for (let i = dayOfMonth; i > dayOfMonth - 4; i--) {
    let response = await request<ITemp[]>(`${url}/temps/${i}`);
    if (response.length == 0) {
      continue;
    }
    fourTemps.push(response);
    days.push(toDay(day - (dayOfMonth - i)));
  }

  return [fourTemps, days];
}

export {
  url,
  fetchTemp,
  fetchTemps
};
