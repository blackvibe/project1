import { Portal } from "solid-js/web";

export function Toast() {
  return <></>;
}

export function DismissToasts() {
 
}

export function ShowToast(msg:string, type:string) {
  const params = {
    className: "font-medium",
    position: "top-center",
    duration: 2000,
    style: {
      "border-radius": "20px",
      padding: "10px",
      "padding-left": "15px",
    },
  };
  if (type === "error") {
  }

  if (type === "success") {
  }
}
