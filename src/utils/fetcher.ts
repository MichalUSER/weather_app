import type ITemp from "./itemp";
import request from "./request";

// const url = "http://localhost:8080";
// const url = "http://192.168.0.100:8080";
const url = "http://127.0.0.1:8000";

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
  date.setDate(date.getDate() - 3);
  let response = await request<ITemp[]>(`${url}/last_days/4`);
  for (let i = 0; i <= 3; i++) {
    const result = response.filter(t => t.d == date.getDate());
    if (result.length != 0) {
      fourTemps.push(result);
      days.push(toDay(date.getDay()));
    }
    date.setDate(date.getDate() + 1);
  }

  return [fourTemps, days];
}

export {
  url,
  fetchTemp,
  fetchTemps,
  average
};
