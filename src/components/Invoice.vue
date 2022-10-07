<template>
    <router-link class=" row row-cols-5 row-cols-sm-6 bg-primary align-items-center my-3 py-3 rounded text-decoration-none text-light"
     :to="{name: 'Invoice', params: { invoiceId: invoice.invoiceId }}">
        <div class="col"><span class="">#{{ invoice.invoiceId }}</span></div>
        <div class="col d-none d-sm-block"><span class="date">{{ invoice.paymentDueDate }}</span></div>
        <div class="col"><span class="text-uppercase">{{ invoice.clientName }}</span></div>
        <div class="col"><span class="">${{ invoice.invoiceTotal }}</span></div>
        <div class="col"><div class="rounded p-2"
                :class="{ paid: invoice.invoicePaid, draft: invoice.invoiceDraft, pending: invoice.invoicePending }">
                <span v-if="invoice.invoicePaid">{{$t("paid")}}</span>
                <span v-if="invoice.invoiceDraft">{{$t("draft")}}</span>
                <span v-if="invoice.invoicePending">{{$t("pending")}}</span>
            </div></div>
        <div class="col"> <div class="icon">
                <img src="@/assets/icon-arrow-right.svg" alt="" />
            </div></div>
    </router-link>
</template>
  
<script>
export default {
    name: "invoice",
    props: ["invoice"],
};
</script>
  
<style lang="scss" scoped>
img{
    
    &:dir(rtl){
       
       transform: rotate(180deg);
     }
}
</style>