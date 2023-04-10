import { copyToClipboard } from "../helpers";
import { createSignal, Match, Show, Switch } from "solid-js";
import { t } from "../store";
import Countdown from "../components/Countdown";
import { ShowToast, DismissToasts } from "../components/Toast";

export default function SMS(props:any) {
  const [smsCopied, setSmsCopied] = createSignal(false);

  function copySms() {
    if (props.order.Status === "OK") {
      setSmsCopied(true);
      copyToClipboard(props.order.SMS);
      setTimeout(function () {
        setSmsCopied(false);
      }, 400);


      DismissToasts();
      ShowToast(
        t.toast?.title.sms_copied,
        `${t.toast?.message.sms_code} ${props.order?.SMS} \n ${t.toast?.message.sms_copied}`,
        "success"
      );
    }
  }

  return (
    <>
      <p
        onClick={copySms}
        class="select-none rounded-full pl-3 text-[17px] hover:bg-teal-700"
      >
        <Show when={props.order.Status === "WAIT"}>
          <span class="loader4 inline-block mr-2"></span>
        </Show>

        <span class="text-md font-medium sm:text-md">


          <Switch fallback={<p>FAILED_TO_GET_STATUS</p>}>
            <Match when={props.order.Status === "ERROR"}>
            {t.order && t.order[props.order.Status]}
            </Match>
            <Match when={props.order.Status === "EXPIRED"}>
            {t.order && t.order[props.order.Status]}
            </Match>
            <Match when={props.order.Status === "WAIT"}>
            {t.order && t.order[props.order.Status]}
            </Match>
            <Match when={props.order.Status === "OK"}>
            {t.order && t.order[props.order.Status]}
            </Match>
          </Switch>

          <Show when={props.order.Status === "WAIT"}>
            <span class="rounded transition ml-2 px-1 w-full text-sm font-medium bg-teal-700">
              <Countdown datetime={props.order.CreatedAt} />
            </span>
          </Show>

          <Show when={props.order.Status === "OK"}>
            <span class="font-medium ml-1">{props.order.SMS}</span>
            <span
              classList={{ "animate-ping": smsCopied() }}
              class="w-5 h-5 absolute ml-1 mt-1 icon-copy"
            />
          </Show>
        </span>
      </p>
    </>
  );
}
