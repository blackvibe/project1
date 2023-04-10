import { Match, Show, Switch, createSignal } from "solid-js";
import { Portal } from "solid-js/web";
import { Transition } from "solid-transition-group";

const [isShow, setIsShow] = createSignal(false)
const [toastType, setToastType] = createSignal("")
const [toastTimer, setToastTimer]:any = createSignal();
const [toastTitle, setToastTitle] = createSignal("")
const [toastMessage, setToastMessage] = createSignal("")

export function Toast() {
  return <Portal>
    <Transition name="toast">
      <Show when={isShow()}>
        <div class="z-50 mx-4 sm:mx-10 max-w-[500px] gap-2 bg-white rounded-full flex p-1 shadow-xl border border-gray-200 fixed top-[50%] right-0">
          <div classList={{
            "bg-red-50": toastType() === "error",
            "bg-blue-50": toastType() === "info",
            "bg-green-50": toastType() === "success"
          }} 
          
          class="relative w-12 h-[49px] rounded-full flex items-center justify-center ">
            

            <Switch>
              <Match when={toastType() === "error"}>
              <div class="w-5 h-5 bg-red-500 absolute rounded rotate-45"></div>
                <svg width="20" height="20" class="absolute rotate-180" viewBox="0 0 1024 1024">
                  <path class="fill-white" d="M448 224a64 64 0 1 0 128 0 64 64 0 1 0-128 0zm96 168h-64c-4.4 0-8 3.6-8 8v464c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V400c0-4.4-3.6-8-8-8z"></path>
                </svg>
              </Match>
              <Match when={toastType() === "info"}>
              <svg width="26" height="26" viewBox="0 0 26 26"><g transform="translate(-367.6 -205.6)"><circle id="Ellipse_3" cx="13" cy="13" r="13" transform="translate(367.6 205.6)" fill="#007aff" opacity="0.25"></circle><circle id="Ellipse_4" cx="10" cy="10" r="10" transform="translate(370.6 208.6)" fill="#007aff"></circle><path id="Path_5" d="M380.8,213v5.7" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="2.5"></path><circle id="Ellipse_5" cx="1.5" cy="1.5" r="1.5" transform="translate(379.2 221.2)" fill="#fff"></circle></g></svg>
              </Match>

              <Match when={toastType() === "success"}>

              <svg width="20px" height="20px" style="overflow:visible" viewBox="0 0 32 32"><circle style="opacity:0.4" fill="#34C759" cx="16" cy="16" r="20"></circle><circle fill="#34C759" cx="16" cy="16" r="16"></circle><path style="stroke-dasharray:22;stroke-dashoffset:0;" fill="none" stroke="#FCFCFC" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M9.8,17.2l3.8,3.6c0.1,0.1,0.3,0.1,0.4,0l9.6-9.7"></path></svg>
              </Match>
            </Switch>
          </div>
          <div class="flex-1 flex-col flex justify-center pr-2">
            <p class="text-xs font-medium text-gray-600">{toastTitle()}</p>
            <p 
            classList={{
              "text-red-600": toastType() === "error",
              "text-blue-600": toastType() === "info",
              "text-green-600": toastType() === "success"
            }} 
            class="text-xs font-semibold">{toastMessage()}</p>
          </div>
          <div onClick={hideToast} class="cursor-pointer relative w-12 rounded-full flex items-center justify-center transition text-gray-400 hover:text-gray-800">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
      </Show>
    </Transition>
  </Portal>
}

export function DismissToasts() {

}

export function hideToast() {
  setIsShow(false)
}

export function ShowToast(title:string, msg: string, type: string) {

  setToastType(type)
  setToastTitle(title)
  setToastMessage(msg)

  if (isShow()) {
    setIsShow(false)
  }

  setIsShow(true)

  if (toastTimer) {
    clearTimeout(toastTimer());
  }

  const timer = setTimeout(() => setIsShow(false), 2000);
  setToastTimer(timer);
}
