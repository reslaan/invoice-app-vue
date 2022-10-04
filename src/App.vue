

<template  >
  <div v-if="invoicesLoaded"  id="app"  >
    <div v-if="!mobile" class="app row flex-column flex-sm-row bg-primary-1  text-center min-vh-100 ">


      <div class="col-12 col-sm-1 ">

        <Navigation />
      </div>
      <div class="col-12 col-sm-11 text-white position-relative">
        <modal v-if="modalActive" />
        <Transition name="invoice">
          <InvoiceModal v-if="invoiceModal" />

        </Transition>
        <router-view />
      </div>

    </div>
    <div v-else class="d-flex bg-primary-1 vh-100 ">
      <div class="m-auto text-center text-white ">
        <h2 class="">Sorry, this app is not supported mobile device</h2>
        <p>To use this app, please use a compouter or tablet</p>
      </div>

    </div>
  </div>



  <!-- <RouterView /> -->
</template>

<script >
import { mapState, mapActions } from "vuex"
import { RouterLink, RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue';
import InvoiceModal from './components/InvoiceModal.vue';
import Modal from './components/Modal.vue'
import HomeView from './views/HomeView.vue';

export default {
  components: {
    Navigation,
    HomeView,
    InvoiceModal,
    Modal
  },
 
  data() {
    return {
      mobile: false,
     
     
    }

  },
  created() {
    this.GET_INVOICES();
    this.checkScreen();
    window.addEventListener('resize', this.checkScreen)
    this.changeDir()

    
  },
  methods: {
    ...mapActions(['GET_INVOICES']),
    checkScreen() {
      const windWidth = window.innerWidth;

      if (windWidth <= 580) {
        this.mobile = true;
        return;
      }
      this.mobile = false

    },
    changeDir(){
      const dir = document.querySelector('html')  /// get html tag
      dir.setAttribute('dir',this.dir) 
      const lang  = this.$i18n.locale;
      dir.setAttribute('lang',lang) 
     
    }
  },
  computed: {
    ...mapState(['invoiceModal', 'modalActive', 'invoicesLoaded','dir'])
  },
  watch:{
    dir(){
      this.changeDir()
    }
  }
}
</script>

<style lang="scss">
/* animated modal invoice  */
.invoice-enter-active,
.invoice-leave-active {
  transition: .8s ease all;
}

.invoice-enter-from,
.invoice-leave-to {
  transform: translateX(-800px);

  &:dir(rtl) {
    transform: translateX(800px);

  }
}




.paid {
  &::before {
    background-color: #33d69f;
  }
  
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}

.pending {
  &::before {
    background-color: #ff8f00;
  }
  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}

.draft {
  &::before {
    background-color: #dfe3fa;
  }

  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}
</style>