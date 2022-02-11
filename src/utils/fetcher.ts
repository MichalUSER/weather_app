import type ITemp from "./itemp";
import request from "./request";

//const url = "http://localhost:8080";
const url = "http://192.168.0.100:8080";

function average(temps: ITemp[]): number {
  const sum = temps.reduce((acc, curr) => acc + +curr.averageTemp, 0);
  return +(sum / temps.length).toFixed(2);
}

async function fetchTemp(): Promise<ITemp> {
  return await request<ITemp>(`${url}/last_temp`);
}

function toDay(n: number): string {
  switch (n) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 0:
      return "Sunday";
    default:
      break;
  }
}

async function fetchTemps(): Promise<[ITemp[][], string[]]> {
  let fourTemps: ITemp[][] = [];
  let days: string[] = [];
  let date = new Date();
  date.setDate(date.getDate() - 4);
  for (let i = 0; i <= 3; i++) {
    date.setDate(date.getDate() + 1);
    let response = await request<ITemp[]>(`${url}/temps/${date.getMonth() + 1}/${date.getDate()}`);
    if (response.length == 0) {
      continue;
    }
    fourTemps.push(response);
    days.push(toDay(date.getDay()));
  }

  return [fourTemps, days];
}

export {
  url,
  fetchTemp,
  fetchTemps,
  average
};
