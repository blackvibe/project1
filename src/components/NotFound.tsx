export default function NotFound(props:any) {
    return (
        <>
            <div class="text-center text-lg p-6 text-gray-800">
                <div class="icon-sova w-24 h-24 mx-auto" />
                <div>
                <p class="text-4xl mt-6 mb-3">{props.title}</p>
                <p class="text-sm font-medium">{props.description}</p>
                <p class="text-xs mt-6 font-medium">
                    Выбранная страна: {props.currentCountry.LocalizedName}

                    <span
                        class={props.currentCountry.Code + " ml-1 mt-[2px] align-text-top inline-block w-[24px] h-[16px]"}
                    />
                </p>
                </div>
            </div>
        </>
    )
}