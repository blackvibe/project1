import { Transition } from "solid-transition-group";
import { Show, For, createSignal, createEffect } from "solid-js";

export default function LoadingPanel(props: any) {
    const [isShow, setIsShow] = createSignal(false)

    createEffect(() => {
        if (!props.isShow) {
            setTimeout(() => setIsShow(false), 400);
        } else {
            setIsShow(true);
        }
    });

    return (
        <>
            <Transition name="loadingPanel">
                <Show when={isShow()}>
                    <div class="z-10 absolute bg-white h-full w-full" >
                        <For each={[...Array(5).keys()]}>
                            {(index) => (
                                <div class="overflow-hidden flex p-4 pt-2">
                                    <div class="flex">
                                        <span
                                            class="skeleton-box rounded-md"
                                            style="width:43px;height:43px;"
                                        ></span>
                                    </div>
                                    <div class="flex flex-col w-full">
                                        <div class="">
                                            <span class="skeleton-box w-[40%] ml-3 rounded-full"></span>
                                        </div>
                                        <div class="">
                                            <span class="skeleton-box w-[90%] ml-3 rounded-full"></span>
                                        </div>
                                    </div>
                                    <span class="skeleton-box w-[70px] ml-3 rounded-full "></span>
                                </div>
                            )}
                        </For>
                    </div>
                </Show>
            </Transition>
        </>
    );
}
