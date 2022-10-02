<template>
    <router-link class=" row bg-primary align-items-center my-3 py-3 rounded text-decoration-none text-light"
     :to="{name: 'Invoice', params: { invoiceId: invoice.invoiceId }}">
        <div class="col-2"><span class="">#{{ invoice.invoiceId }}</span></div>
        <div class="col-2"><span class="">{{ invoice.paymentDueDate }}</span></div>
        <div class="col-2"><span class="text-uppercase">{{ invoice.clientName }}</span></div>
        <div class="col-2"><span class="">${{ invoice.invoiceTotal }}</span></div>
        <div class="col-2"><div class="rounded p-2"
                :class="{ paid: invoice.invoicePaid, draft: invoice.invoiceDraft, pending: invoice.invoicePending }">
                <span v-if="invoice.invoicePaid">Paid</span>
                <span v-if="invoice.invoiceDraft">Draft</span>
                <span v-if="invoice.invoicePending">Pending</span>
            </div></div>
        <div class="col-2"> <div class="icon">
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

</style>