<template>
    <header class="header bg-primary-2 h-100 shadow  ">

        <div class=" row m-0 ">
            <div class="p-1  col-1 col-sm-12 col-md-10 m-auto">
                <router-link :to="{ name: 'home' }">
                    <img src="@/assets/logo.svg" class="mt-2" alt="" />
                </router-link>
                <!-- <img src="@/assets/logo.svg"   class="img-fluid " alt=""> -->
            </div>
            <a href="#" class=" nav-link mt-2 p-2 text-light " @click.prevent="changeLocale"><small
                    class="lang">{{currentLocale}}</small> </a>



            <!-- <img src="" class="logo img-fluid m-1 " alt=""> -->

        </div>

    </header>
</template>

<script >
export default {
    name: "Navigation",

    computed: {


        currentLocale() {
            console.log(this.$i18n.locale)
            return this.$i18n.locale === 'en' ? "العربية" : "English";
        },

    },
    methods: {
       
        changeLocale() {
            this.$i18n.locale = this.$i18n.locale === "en" ? "ar" : "en";
            const html = document.querySelector('html')  /// get html tag
            let dir = this.$i18n.locale === "en" ? "ltr" : "rtl";
            html.setAttribute('dir',dir)
            html.setAttribute('lang',this.$i18n.locale) 
        }
    }
}
</script>



<style lang="scss" scoped >
.header {
    z-index: 999;
    font-size: 100%;
    position: relative;

    @media (min-width: 1000px) {
        width: 80%;
    }
    @media (max-width: 1000px) {
        width: 88%;

    }
    @media (max-width: 800px) {
        width: 110%;

    }

    .lang {
        @media (max-width: 1100px) {
            font-size: 80%;
        }
        @media (max-width: 940px) {
            font-size: 65%;
        }
        @media (max-width: 800px) {
            font-size: 50%;

    }

    }

    .nav-link {
        &:hover {
            background-color: #041c3248;

        }
    }

}
</style>