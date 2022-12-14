<template>
  <div v-if="currentInvoice" class="invoice-content container my-3">
    <router-link class="nav-link d-flex mt-2" :to="{ name: 'home' }">
      <img src="@/assets/icon-arrow-left.svg" class=" me-2" alt="" /> {{$t('back')}}
    </router-link>
    <!-- Header -->
    <div class=" bg-primary p-3 rounded row mx-0 g-2 d-flex justify-content-between align-items-center">
      <div class="col col-md-2 d-flex  justify-content-around align-items-center">
        <span>{{$t('status')}}</span>
        <div class="status-button d-flex ms-2 px-2 py-1 rounded " :class="{
          paid: currentInvoice.invoicePaid,
          draft: currentInvoice.invoiceDraft,
          pending: currentInvoice.invoicePending,
        }">
          <span v-if="currentInvoice.invoicePaid">{{$t("paid")}}</span>
          <span v-if="currentInvoice.invoiceDraft">{{$t("draft")}}</span>
          <span v-if="currentInvoice.invoicePending">{{$t("pending")}}</span>
        </div>
      </div>
      <div class="col col-md-4 d-flex justify-content-around ">
        <button @click="toggleEditInvoice" class="btn btn-primary-2 me-2">{{$t('edit')}}</button>
        <button @click="deleteInvoice(currentInvoice.docId)" class="btn btn-danger me-2">{{$t('delete')}}</button>
        <button @click="updateStatusToPaid(currentInvoice.docId)" v-if="currentInvoice.invoicePending"
          class="btn btn-success">
          {{$t('mark_as_paid')}}
        </button>
        <button v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
          @click="updateStatusToPending(currentInvoice.docId)" class="btn btn-primary-3">
          {{$t('mark_as_pending')}}
        </button>
      </div>
    </div>

    <!-- Invoice Details -->
    <div class="bg-primary my-4 p-5 rounded d-flex flex-column">
      <div class=" row justify-content-between">
        <div class="col  text-start">
          <p class="h3"><strong class="text-primary-3">#</strong>{{ currentInvoice.invoiceId }}</p>
          <p class="fs-5">{{ currentInvoice.productDescription }}</p>
        </div>
        <div class="col   text-end">
          <p>{{ currentInvoice.billerStreetAddress }}</p>
          <p>{{ currentInvoice.billerCity }}</p>
          <p>{{ currentInvoice.billerZipCode }}</p>
          <p>{{ currentInvoice.billerCountry }}</p>
        </div>
      </div>
      <div class="row  justify-content-around mt-4 ">
        <div class="col d-flex flex-column justify-content-between">
          <h4 class="text-primary-3">{{$t('invoice_date')}}</h4>
          <p>
            {{ currentInvoice.invoiceDate }}
          </p>
          <h4 class="text-primary-3">{{$t('payment_date')}}</h4>
          <p>
            {{ currentInvoice.paymentDueDate }}
          </p>
        </div>
        <div class="col">
          <h4 class="text-primary-3">{{$t('bill_to')}}</h4>
          <p>{{ currentInvoice.clientName }}</p>
          <p>{{ currentInvoice.clientStreetAddress }}</p>
          <p>{{ currentInvoice.clientCity }}</p>
          <p>{{ currentInvoice.clientZipCode }}</p>
          <p>{{ currentInvoice.clientCountry }}</p>
        </div>
        <div class="col ">
          <h4 class="text-primary-3">{{$t('sent_to')}}</h4>
          <p>{{ currentInvoice.clientEmail }}</p>
        </div>
      </div>
      <div class=" d-flex flex-column mt-3">
        <div class="bg-primary-1 p-2 rounded my-2 ">
          <div class="row">
            <p class="col">{{$t('item_name')}}</p>
            <p class="col">{{$t('qty')}}</p>
            <p class="col">{{$t('price')}}</p>
            <p class="col">{{$t('total')}}</p>
          </div>
          <div v-for="(item, index) in currentInvoice.invoiceItemList" :key="index" class="row">
            <p class="col">{{ item.name }}</p>
            <p class="col">{{ item.qty }}</p>
            <p class="col">{{ item.price }}</p>
            <p class="col">{{ item.total }}</p>
          </div>
        </div>
        <div class="row justify-content-between align-items-center mt-3">
          <p class="col-3 h5 text-primary-3">{{$t('total_amount')}}</p>
          <p class="col-3 h3">{{ currentInvoice.invoiceTotal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "invoiceView",
  data() {
    return {
      currentInvoice: null,
    }
  },
  created() {
    this.getCurrentInvoice();
  },
  methods: {
    ...mapMutations(['SET_CURRENT_INVOICE', 'TOGGLE_EDIT_INVOICE', 'TOGGLE_INVOICE']),
    ...mapActions(['DELETE_INVOICE', 'UPDATE_STATE_TO_PENDING', 'UPDATE_STATE_TO_PAID']),

    getCurrentInvoice() {
      this.SET_CURRENT_INVOICE(this.$route.params.invoiceId)
      this.currentInvoice = this.currentInvoiceArray[0];
    },
    toggleEditInvoice() {
      this.TOGGLE_EDIT_INVOICE()
      this.TOGGLE_INVOICE()
    },
    async deleteInvoice(docId) {
      await this.DELETE_INVOICE(docId);
      this.$router.push({ name: 'home' })
    },
    async updateStatusToPaid(docId) {
      await this.UPDATE_STATE_TO_PAID(docId);
    },
    async updateStatusToPending(docId) {
      await this.UPDATE_STATE_TO_PENDING(docId);
    }


  },
  computed: {
    ...mapState(['currentInvoiceArray', 'editInvoice'])
  },
  watch: {
    editInvoice() {
      if (!this.editInvoice) {
        this.currentInvoice = this.currentInvoiceArray[0]
      }
    }
  }
};
</script>
  
<style lang="scss" scoped>
  .invoice-content{
    width: 80%;
    @media (max-width: 580px){
    width: 98%;

  }
  }
.nav-link {
  margin-bottom: 32px;
  align-items: center;
  color: #fff;
  font-size: 12px;



  img {
    margin-right: 16px;
    width: 7px;
    height: 10px;

    &:dir(rtl) {
      display: inline-block;
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      transform: rotate(180deg);
    }
  }
}
</style>