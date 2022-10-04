<template>
    <header class="header bg-primary-2 h-100 shadow  ">

        <div class=" row m-0 ">
            <div class="p-1  col-1 col-sm-12 col-md-10 m-auto">
                <router-link  :to="{ name: 'home' }">
      <img src="@/assets/logo.svg"  class="mt-2" alt="" />  
    </router-link>
                  <!-- <img src="@/assets/logo.svg"   class="img-fluid " alt=""> -->
            </div>
            <a href="#" class=" nav-link mt-2 p-2 text-light" @click.prevent="changeLocale"><small>{{currentLocale}}</small> </a>
          
            <!-- <img src="" class="logo img-fluid m-1 " alt=""> -->

        </div>

    </header>
</template>

<script >
import { mapMutations } from 'vuex';
export default {
    name: "Navigation",

    computed: {
       

        currentLocale(){
            console.log(this.$i18n.locale)
            return this.$i18n.locale === 'en' ? "العربية": "English"; 
        },
       
    },
    methods: {
        ...mapMutations(['TOGGLE_DIR']),
        changeLocale(){
            this.$i18n.locale = this.$i18n.locale === "en" ? "ar": "en";
            this.TOGGLE_DIR();
        }
    }
}
</script>



<style lang="scss" scoped >
.header {
    z-index: 999;
     
     position: relative;
     @media (min-width: 940px){
        width: 65%;  
     } 
     .nav-link{
        &:hover{
            background-color: #041c3248;
        
        }
     }
  
}
</style>