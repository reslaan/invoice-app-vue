

<template>
  <div class="home container my-5  text-white">
    <!-- header -->
    <div class="header row  mb-5  justify-content-sm-between align-items-center">
      <div class="col-3 col-sm-4 text-start">
        <h3>{{$t('invoices')}}</h3>
        <span>{{ $t('total_invoices',{ total: filteredData.length} )}} </span>
      </div>
      <div class=" col-9 col-sm-8    d-flex justify-content-end align-items-center">
        <div class="row">
          <div class="dropdown col"> 
          <button class="btn btn-primary-1 dropdown-toggle me-3 border-0" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            {{$t("filter")}} <span v-if="filteredInvoice">: {{filteredInvoice}}</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-dark bg-primary-1 ">
            <li><a class="dropdown-item" @click="filteredInvoices" href="#">{{$t("draft")}}</a></li>
            <li><a class="dropdown-item" @click="filteredInvoices"  href="#">{{$t("pending")}}</a></li>
            <li><a class="dropdown-item" @click="filteredInvoices" href="#">{{$t("paid")}}</a></li>
            <li><a class="dropdown-item" @click="filteredInvoices" href="#">{{$t("clear_filter")}}</a></li>
          </ul>
        </div>
        <div class="col">
          <button class="btn btn-primary-2 rounded-pill border-0" @click="newInvoice">{{$t('new_invoice')}} +</button>
        </div>
        </div>
        
      </div>
    </div>
<!-- Invoices -->
    <div v-if="invoiceData.length > 0">
      <Invoice v-for="(invoice, index) in filteredData" :invoice="invoice" :key="index" /> 
     
    </div>
    <div v-else class=" d-flex flex-column w-50 m-auto py-5">
      <img src="../assets/no_data.svg" class="img-fluid w-25 m-auto" alt="">
      <h3 class="mt-3">There is nothing here</h3>
      <p>Create a new invoice by clicking The New Invoice Button </p>
    </div>
    <div class="mian py-5 ">
    
    </div>

  </div>
 
</template>

<script>
  import {mapMutations , mapState} from "vuex"
  import Invoice from '../components/Invoice.vue'
export default {
  name: "Home",
  components: {
    Invoice
  },
  data() {
    return {
     filterMenu: null,
     filteredInvoice:null,
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_INVOICE']),
    newInvoice(){
       this.TOGGLE_INVOICE()
    },
    filteredInvoices(e){
      if(e.target.innerText === "Clear Filter" || e.target.innerText === "?????????? ??????????????" ){
        this.filteredInvoice = null
        return;
      }
      this.filteredInvoice = e.target.innerText;
    }
  },
  computed: {
    ...mapState(['invoiceData']),
    filteredData(){
     return this.invoiceData.filter(invoice => {
      
      if(this.filteredInvoice === "Paid" || this.filteredInvoice === "????????????"){
        return invoice.invoicePaid === true;
      }
      if(this.filteredInvoice === "Draft" || this.filteredInvoice === "??????????"){
        return invoice.invoiceDraft === true;
      }
      if(this.filteredInvoice === "Pending" || this.filteredInvoice === "????????????"){
        return invoice.invoicePending === true;
      }
      
        return invoice;
      
     })
    }
  },

}
</script>

<style lang="scss" scoped>

.home{
  width: 80%;
  @media (max-width: 580px){
    width: 98%;

  }
}
.dropdown-menu{
  min-width: 9rem;
    .dropdown-item{
    &:hover{
      background-color: #064663;
    }
  }
}

</style>