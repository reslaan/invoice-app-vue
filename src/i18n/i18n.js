import {createI18n} from 'vue-i18n'
import en from "@/lang/en.json"
import ar from "@/lang/ar.json"
export default createI18n({ 
    locale: "ar",
    fallbackLocale: "ar",
    messages: {
        en,
        ar,
    }
}) 