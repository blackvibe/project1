import { createSignal, onCleanup } from "solid-js";

function getCountDownValue(datetime: string | number | Date) {
  const now = new Date().getTime();
  const endTime = new Date(datetime).getTime() + 10 * 60 * 1000;
  let remainingTime = endTime - now;

  if (remainingTime < 0) {
    return "00:00";
  }

  remainingTime += 2000;

  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function Countdown(props: { datetime: string | number | Date; }) {
  const [countDown, setCountDown] = createSignal(getCountDownValue(props.datetime));

  const timer = setInterval(() => {
    const newCountDown = getCountDownValue(props.datetime);
    setCountDown(newCountDown);
  }, 500);
  onCleanup(() => clearInterval(timer));

  return <>{countDown()}</>;
}
