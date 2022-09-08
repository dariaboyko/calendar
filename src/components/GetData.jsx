import dayjs from "dayjs"
export function getMonthData(year, month) {
  let result = [];
  const date = dayjs(year+"-"+month+"-"+1);
  const days = dayjs(date).daysInMonth();
  for(let i = 1;i<=days;i++){
    result.push(dayjs(year+"-"+month+"-"+i));
  }
  return result;
}
