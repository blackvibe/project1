import { createSignal, Show, For } from "solid-js";
import { Transition } from "solid-transition-group";
import { fuzzySearch } from "../helpers";
import NotFound from "./NotFound";
import { t } from "~/store";
import { onCleanup } from "solid-js";
import { A } from "solid-start";

export function clickOutside(el: any, accessor: any) {
    const onClick = (e: any) => !el.contains(e.target) && accessor()?.();
    document.body.addEventListener("click", onClick);

    onCleanup(() => document.body.removeEventListener("click", onClick));
}

export default function CountrySelector(props: any) {
    const [countries, setCountries] = createSignal(props.countries);
    const [searchValue, setSearchValue] = createSignal("");
    const [isOpen, setIsOpen] = createSignal(false);

    let countryListRef: any;

    function toggleSelector() {
        if (countries()?.length != props.countries.length) {
            setCountries(props.countries);
        }

        setIsOpen(!isOpen());

        const selectedNode = countryListRef.querySelector(".selected");
        countryListRef.scrollTop = selectedNode.offsetTop - 130;
    }

    function letSearchCountry(e: any) {
        setSearchValue(e.currentTarget.value);

        const filteredCountries =
            searchValue().trim().length > 0
                ? fuzzySearch(searchValue().trim(), props.countries, [
                    "LocalizedName",
                    "Name",
                ])
                : props.countries;

        setCountries(filteredCountries);

        countryListRef.scrollTop = 0;
    }

    function setCountry(country: any) {
        setIsOpen(false);

        props.setCurrentCountry(country)
        props.updateServices(country, true);
    }

    return (
        <>
            <div
                //@ts-ignore
                use:clickOutside={() => setIsOpen(false)}

                class="ml-2 mr-2 md:ml-0 md:mr-0 mb-2 select-none sm:text-sm relative"
            >
                <button
                    onClick={toggleSelector}
                    class="pb-0.5 pt-0.5 text-left border border-gray-300 rounded-3xl shadow-sm cursor-pointer w-full leading-10"
                >
                    <div class="inline-block pl-5 h-[15px]">
                        <div class={props.currentCountry.Code + " w-[24px] h-[16px]"}></div>
                    </div>
                    <div class="inline-block pl-3">
                        <span>{props.currentCountry.LocalizedName} </span>
                        <span class="text-gray-400">
                            (+{props.currentCountry.PhoneCode})
                        </span>
                    </div>
                    <div class="float-right pt-2.5 pr-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            aria-hidden="true"
                            class="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 3a.75.75 0 0 1 .55.24l3.25 3.5a.75.75 0 1 1-1.1 1.02L10 4.86l-2.7 2.9a.75.75 0 0 1-1.1-1.02l3.25-3.5A.75.75 0 0 1 10 3zm-3.76 9.2a.75.75 0 0 1 1.06.04l2.7 2.9 2.7-2.9a.75.75 0 1 1 1.1 1.02l-3.25 3.5a.75.75 0 0 1-1.1 0l-3.25-3.5a.75.75 0 0 1 .04-1.06z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </button>

                <Transition name="slide-fade">

                    <Show when={isOpen()}>

                        <div class="absolute z-50 bg-white w-full rounded-2xl py-1 shadow-lg border border-gray-300 mt-1">
                            <div class="border-b">
                                <input
                                    type="text"
                                    autocomplete="off"
                                    class=" p-3 pl-4 w-full rounded-t-2xl"
                                    onInput={letSearchCountry}
                                    placeholder={t.main?.country_search_input_placeholder}
                                />
                            </div>
                            <ul
                                ref={countryListRef}
                                class="countrySelector max-h-56 overflow-auto cursor-pointer select-none text-gray-900"
                            >
                                <For each={countries()}>
                                    {(country, index) => (
                                        <li
                                            onClick={() => setCountry(country)}
                                            classList={{
                                                "border-white py-1.5 pl-3 pr-9 hover:border-teal-600 border-l-4 transition": true,
                                                "selected !border-teal-600":
                                                    country.Code === props.currentCountry.Code,
                                            }}
                                        >
                                            <div
                                                class={`${country.Code} inline-block w-[24px] h-[16px]`}
                                            />

                                            <span class="ml-3 truncate inline-block">
                                                {country.LocalizedName}{" "}
                                                <span class="text-gray-400">
                                                    {" "}
                                                    (+{country.PhoneCode})
                                                </span>
                                            </span>
                                        </li>
                                    )}
                                </For>
                            </ul>

                            <Show when={countries()?.length == 0}>
                                <NotFound
                                    title="Такая страна не найдена"
                                    description="Проверьте правильность написания"
                                    currentCountry={props.currentCountry}
                                />
                            </Show>
                        </div>

                    </Show>

                </Transition>
            </div>
        </>
    );
}