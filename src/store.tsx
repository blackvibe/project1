export let t: any = {};

export async function updateTranslations() {
    try {
        const resp = await fetch('https://static.smsvibe.ru/locales/ru/translation2.json')
        t = await resp.json()
    }
    catch {
        console.log("error fetch trs")
    } 
}
