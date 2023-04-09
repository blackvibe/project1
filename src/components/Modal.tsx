import { Show } from "solid-js";
import { Transition } from "solid-transition-group";
import { Portal } from "solid-js/web";

export default function Modal(props:any) {
    
  return (
    <Portal>
      <Transition name="modal-bg">
        <Show when={props.isShow}>
          <div class="fixed left-0 top-0 w-full h-full backdrop-blur-[4px] inset-0 bg-gray-900/75 select-none z-[2147483012] overscroll-none overflow-hidden"></div>
        </Show>
      </Transition>

      <Transition name="modalContent">
        <Show when={props.isShow}>
          <div class="fixed z-[2147483013] max-w-lg mx-auto mb-4 inset-x-0 bottom-0 sm:bottom-auto sm:top-[15%] overflow-hidden rounded-3xl bg-white text-left shadow-xl">
            <div class="bg-white px-4 pt-5 pb-2 sm:p-6 sm:pb-2 text-center">
              <div id="main_modal_icon_bg" class="inline-block">
                <div class={props.data.iconClass + " w-[43px] h-[43px] mx-4"}></div>
              </div>
              <div class="text-center">
                <div
                  class="text-lg sm:text-xl font-medium leading-6 text-gray-900"
                  id="modal_title"
                >
                  {props.data.title}
                </div>
                <div class="mt-2">
                  <p id="modal_message" class="text-lg text-gray-500 ">
                    {props.data.message}
                  </p>
                  <p id="modal_tip" class="text-xs pt-2 text-gray-500">
                    {props.data.tip}
                  </p>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 pt-3 pb-5 sm:px-6 text-white">
              <button
                type="button"
                onClick={props.confirm}
                disabled={props.isLoading}
                class={
                  props.data.mainBtnBgColor +
                  " relative transition w-full disabled:pointer-events-none rounded-xl border border-transparent px-4 py-2 font-medium shadow-sm sm:text-sm disabled:opacity-60 h-10"
                }
              >
                <div
                  classList={{ invisible: !props.isLoading }}
                  class="loaderAnimate"
                ></div>
                <Show when={props.data.badge}>
                  <span
                    classList={{ hidden: props.isLoading }}
                    id="modal_price_badge"
                    class="absolute pt-[10px] w-14 h-10 text-xs font-bold text-white border-2 border-white rounded-full -top-3 -right-3 sm:-top-4 sm:-right-4 bg-teal-700"
                  >
                    {props.data.badge}
                  </span>
                </Show>
                <Show
                  when={props.isLoading}
                  fallback={<span>{props.data.firstBtnMsg}</span>}
                >
                  <span class="ml-4">{props.data.btnWaitText}</span>
                </Show>
              </button>
              <button
                type="button"
                disabled={props.isLoading}
                onClick={props.cancel}
                class="mt-3 transition w-full rounded-xl border border-gray-300 px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-200 sm:text-sm disabled:opacity-60 disabled:pointer-events-none h-10"
              >
                {props.data.secondBtnMsg}
              </button>
            </div>
          </div>
        </Show>
      </Transition>
    </Portal>
  );
}
