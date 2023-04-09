import { formatPhoneNumber, copyToClipboard } from "../helpers";
import { createSignal } from "solid-js";
import { ShowToast, DismissToasts } from "../components/Toast";
import { t } from "../store";

export default function Number(props:any) {
  const [numberCopied, setNumberCopied] = createSignal(false);

  function copyNumber() {
    setNumberCopied(true);
    copyToClipboard(props.order.Number);

    setTimeout(function () {
      setNumberCopied(false);
    }, 400);

    DismissToasts();
    ShowToast(
      `+${props.order.NumberCode} ${formatPhoneNumber(
        props.order.Number
      )} \n ${t.orders.number_copied_message}`,
      "success"
    );
  }
  return (
    <>
      {/* <Toaster containerStyle={{"bottom":"100px"}}/> */}
      <p
        onClick={copyNumber}
        class="select-none transition whitespace-nowrap text-lg font-medium rounded-full pl-2 sm:pl-3 hover:bg-teal-700"
      >
        <span
          class={
            props.order.Country + " inline-block w-[24px] h-[16px] -mb-0.5"
          }
        ></span>
        <span class="ml-1">
          +{props.order.NumberCode} {formatPhoneNumber(props.order.Number)}
        </span>
        <span
          classList={{ "animate-ping": numberCopied() }}
          class="w-5 h-5 absolute ml-1 mt-1 icon-copy"
        ></span>
      </p>
    </>
  );
}
