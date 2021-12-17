import type ITemp from "./itemp";
import request from "./request";

const url = "http://localhost:3030";

async function getTemp(): Promise<ITemp> {
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
    case 7:
      return "Sunday";
    default:
      break;
  }
}

async function getTemps(): Promise<[ITemp[][], string[]]> {
  let fourTemps: ITemp[][];
  let days: string[];
  //let monthDay = new Date().getDate();
  let d = new Date();
  let monthDay = 11
  for (let i = monthDay; i > monthDay - 4; i--) {
    let response = await request<ITemp[]>(`${url}/temps/${i}`) 
    if (response.length == 0) {
      continue;
    }
    fourTemps.push(response);
    days.push(toDay(d.getDay() - i + 1));
  }

  return [fourTemps, days];
}

export {
  url,
  getTemp,
  getTemps
};
