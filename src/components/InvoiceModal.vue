<template>
    <div @click="checkClick" ref="invoiceWrap" class="invoice-content position-fixed vh-100  w-100 ">
        <form @submit.prevent="submitForm"
            class="invoice-form bg-primary-1 py-4 px-3 row flex-column  text-start  shadow-lg ">
            <Loading v-if="loading" />
            <h1 v-if="!editInvoice" class="mb-4 fw-bold">New Invoice</h1>
            <h1 v-if="editInvoice" class="mb-4 fw-bold">Edit Invoice</h1>

            <!-- bill form -->
            <div class="mb-4">
                <h4 class="text-primary-3">Bill From</h4>
                <div class="row mb-2 g-2">
                    <div class="col-md-12">
                        <label for="billerStreetAddress" class="form-label">Street Address</label>
                        <input type="text" required class="form-control" id="billerStreetAddress"
                            v-model="billerStreetAddress">
                    </div>
                    <div class="col-md-4">
                        <label for="billerCity" class="form-label">City</label>
                        <input type="text" required class="form-control" id="billerCity" v-model="billerCity">
                    </div>
                    <div class="col-md-4">
                        <label for="billerZipCode" class="form-label">Zip Code </label>
                        <input type="text" required class="form-control" id="billerZipCode" v-model="billerZipCode">
                    </div>
                    <div class="col-md-4">
                        <label for="billerCountry" class="form-label">Biller Country</label>
                        <input type="text" required class="form-control" id="billerCountry" v-model="billerCountry">
                    </div>

                </div>
            </div>

            <!-- bill to -->
            <div class="mb-4">
                <h4 class="text-primary-3">Bill To</h4>
                <div class="row mb-2 g-2">
                    <div class="col-md-12"> <label for="clientName" class="form-label">client Name</label>
                        <input type="text" required class="form-control" id="clientName" v-model="clientName">
                    </div>
                    <div class="col-md-12"><label for="clientEmail" class="form-label">client Email</label>
                        <input type="text" required class="form-control" id="clientEmail" v-model="clientEmail">
                    </div>
                    <div class="col-md-12"> <label for="clientStreetAddress" class="form-label">Street Address</label>
                        <input type="text" required class="form-control" id="clientStreetAddress"
                            v-model="clientStreetAddress">
                    </div>
                    <div class="col-md-4">
                        <label for="clientCity" class="form-label">City</label>
                        <input type="text" required class="form-control" id="clientCity" v-model="clientCity">
                    </div>
                    <div class="col-md-4">
                        <label for="clientZipCode" class="form-label">Zip Code </label>
                        <input type="text" required class="form-control" id="clientZipCode" v-model="clientZipCode">
                    </div>
                    <div class="col-md-4">
                        <label for="clientCountry" class="form-label">Biller Country</label>
                        <input type="text" required class="form-control" id="clientCountry" v-model="clientCountry">
                    </div>
                </div>
            </div>
            <!-- date -->
            <div class="">


                <div class="row mb-3 g-2">
                    <div class="col-md-6">
                        <label for="invoiceDate" class="form-label">Invoice Date</label>
                        <input type="text" disabled class="form-control" id="invoiceDate" v-model="invoiceDate">
                    </div>
                    <div class="col-md-6">
                        <label for="paymentDueDate" class="form-label">Payment Due Date </label>
                        <input type="text" disabled class="form-control" id="paymentDueDate" v-model="paymentDueDate">
                    </div>
                    <div class="col-md-12">
                        <label for="paymentTerms" class="form-label">Payment Terms </label>
                        <select type="text" required class="form-select" id="paymentTerms" v-model="paymentTerms">
                            <option value="30">30 days</option>
                            <option value="10">10 days</option>
                        </select>
                    </div>
                    <div class="col-md-12">
                        <label for="productDescription" class="form-label">Product Description </label>
                        <input type="text" required class="form-control" id="productDescription"
                            v-model="productDescription">
                    </div>
                </div>
                <div class="row">
                    <h4>Item list</h4>
                    <table class="table  text-white border-primary-1 ">
                        <thead>
                            <tr class="">
                                <th class="col-5">Item name </th>
                                <th class="col-2">Qty </th>
                                <th class="col-2">Price </th>
                                <th class="col-2">Total </th>

                            </tr>
                        </thead>
                        <tbody class="">
                            <tr v-for="(item , index) in invoiceItemList " :key="index">
                                <td class=""><input class="w-100" type="text" v-model="item.name"></td>
                                <td class=""><input class="w-100" type="number" min="1" v-model="item.qty"></td>
                                <td class=""><input class="w-100" type="text" v-model="item.price"></td>
                                <td class="">$ {{item.total = item.qty * item.price}}</td>
                                <img class="btn-delete" src="@/assets/icon-delete.svg" @click="deleteItem(item.id)" />

                            </tr>
                        </tbody>
                    </table>
                    <div class="col-12">
                        <button @click.prevent="addInoviceItem" class="btn  btn-primary-2 rounded-pill w-100">+ Add
                            Item</button>

                    </div>
                </div>
                <div class="row justify-content-between my-5">
                    <div class="col-2">
                        <button type="button" @click.prevent="discard"
                            class="btn btn-danger rounded-pill">Discard</button>
                    </div>
                    <div class="col-7  d-flex justify-content-end">
                        <button v-if="!editInvoice" type="submit" @click="saveDraft"
                            class="btn btn-primary me-2 rounded-pill ">save Draft</button>
                        <button v-if="!editInvoice" type="submit" @click="createInovice"
                            class="btn btn-primary-2 rounded-pill">Create Invoice</button>
                        <button v-if="editInvoice" type="submit" @click="updateInovice"
                            class="btn btn-primary-2 rounded-pill">Update Invoice</button>

                    </div>
                </div>
            </div>
        </form>

    </div>
</template>

<script >
import firebase from "../firebase/firebaseInit";
import {mapActions, mapMutations, mapState } from "vuex"
import { uid } from "uid"
import Loading from "./Loading.vue"

export default {
    name: "InvoiceModal",
    components: {
        Loading
    },
    data() {
        return {

            loading: false,
            dateOptions: { year: "numeric", month: "short", day: "numeric" },
            docId: null,
            billerStreetAddress: null,
            billerCity: null,
            billerZipCode: null,
            billerCountry: null,
            clientName: null,
            clientEmail: null,
            clientStreetAddress: null,
            clientCity: null,
            clientZipCode: null,
            clientCountry: null,
            invoiceDateUnix: null,
            invoiceDate: null,
            paymentTerms: null,
            paymentDueDateUnix: null,
            paymentDueDate: null,
            productDescription: null,
            invoicePending: null,
            invoiceDraft: null,
            invoiceItemList: [],
            invoiceTotal: 0,
        }
    },
    created() {
        if(!this.editInvoice){
              // get current date for invoice date feild
        this.invoiceDateUnix = Date.now()
        this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString("en-us", this.dateOptions);
        }
      
        if (this.editInvoice) {
            const currentInvoice = this.currentInvoiceArray[0];
            this.docId = currentInvoice.docId
            this.billerStreetAddress = currentInvoice.billerStreetAddress
            this.billerCity = currentInvoice.billerCity
            this.billerZipCode = currentInvoice.billerZipCode
            this.billerCountry = currentInvoice.billerCountry
            this.clientName = currentInvoice.clientName
            this.clientEmail = currentInvoice.clientEmail
            this.clientStreetAddress = currentInvoice.clientStreetAddress
            this.clientCity = currentInvoice.clientCity
            this.clientZipCode = currentInvoice.clientZipCode
            this.clientCountry = currentInvoice.clientCountry
            this.invoiceDateUnix = currentInvoice.invoiceDateUnix
            this.invoiceDate = currentInvoice.invoiceDate
            this.paymentTerms = currentInvoice.paymentTerms
            this.paymentDueDateUnix = currentInvoice.paymentDueDateUnix
            this.paymentDueDate = currentInvoice.paymentDueDate
            this.productDescription = currentInvoice.productDescription
            this.invoicePending = currentInvoice.invoicePending
            this.invoiceDraft = currentInvoice.invoiceDraft
            this.invoiceItemList = currentInvoice.invoiceItemList
            this.invoiceTotal = currentInvoice.invoiceTotal
        }
    },

    methods: {
        ...mapMutations(['TOGGLE_INVOICE', 'TOGGLE_MODAL', 'TOGGLE_EDIT_INVOICE']),
        ...mapActions(['GET_INVOICES','UPDATE_INVOICE']),
        checkClick(e) {
            if (e.target == this.$refs.invoiceWrap) {
                this.TOGGLE_MODAL();
            }
        },
        discard() {
            this.TOGGLE_INVOICE()
            if (this.editInvoice) {
                this.TOGGLE_EDIT_INVOICE()
            }
        },
        addInoviceItem() {
            this.invoiceItemList.push({
                id: uid(),
                name: "",
                qty: 0,
                price: 0,
                total: 0
            })
        },
        deleteItem(id) {

            this.invoiceItemList = this.invoiceItemList.filter(item => item.id != id)

        },
        calInvoiceTotal() {
            this.invoiceTotal = 0;
            this.invoiceItemList.forEach(item => {
                this.invoiceTotal += item.total;
            })
        },
        createInovice() {
            this.invoicePending = true;
        },
        saveDraft() {
            this.invoiceDraft = true;
        },
        async uploadInvoice() {
            if (this.invoiceItemList.length <= 0) {
                alert("Please add invoice item")
                return;
            }

            this.loading = true;
            this.calInvoiceTotal();

            const database = firebase.collection('invoices').doc();
            console.log(database)
            console.log('bye databsae')


            await database.set({
                invoiceId: uid(6),
                billerStreetAddress: this.billerStreetAddress,
                billerCity: this.billerCity,
                billerZipCode: this.billerZipCode,
                billerCountry: this.billerCountry,
                clientName: this.clientName,
                clientEmail: this.clientEmail,
                clientStreetAddress: this.clientStreetAddress,
                clientCity: this.clientCity,
                clientZipCode: this.clientZipCode,
                clientCountry: this.clientCountry,
                invoiceDateUnix: this.invoiceDateUnix,
                invoiceDate: this.invoiceDate,
                paymentTerms: this.paymentTerms,
                paymentDueDateUnix: this.paymentDueDateUnix,
                paymentDueDate: this.paymentDueDate,
                productDescription: this.productDescription,
                invoicePending: this.invoicePending,
                invoiceDraft: this.invoiceDraft,
                invoicePaid: null,
                invoiceItemList: this.invoiceItemList,
                invoiceTotal: this.invoiceTotal,

            })
            this.loading = false;
            this.TOGGLE_INVOICE()
            this.GET_INVOICES();
        },
        async updateInvoice() {
            if (this.invoiceItemList.length <= 0) {
                alert("Please add invoice item")
                return;
            }

            this.loading = true;
            this.calInvoiceTotal();

            const database = firebase.collection('invoices').doc(this.docId);
            console.log(database)
            console.log('bye databsae')


            await database.update({
               
                billerStreetAddress: this.billerStreetAddress,
                billerCity: this.billerCity,
                billerZipCode: this.billerZipCode,
                billerCountry: this.billerCountry,
                clientName: this.clientName,
                clientEmail: this.clientEmail,
                clientStreetAddress: this.clientStreetAddress,
                clientCity: this.clientCity,
                clientZipCode: this.clientZipCode,
                clientCountry: this.clientCountry,
                invoiceDateUnix: this.invoiceDateUnix,
                invoiceDate: this.invoiceDate,
                paymentTerms: this.paymentTerms,
                paymentDueDateUnix: this.paymentDueDateUnix,
                paymentDueDate: this.paymentDueDate,
                productDescription: this.productDescription,
                invoiceItemList: this.invoiceItemList,
                

            })
            this.loading = false;

            const data = {
                docId: this.docId,
                routeId: this.$route.params.invoiceId
            }
            this.UPDATE_INVOICE(data)
        },
        submitForm() {
            if(this.editInvoice){
                this.updateInvoice();
                return;
            }
            this.uploadInvoice();
           
        }
    },
    computed: {
        ...mapState(['editInvoice', 'currentInvoiceArray'])
    },
    watch: {
        paymentTerms() {
            const futureDate = new Date;
            this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(this.paymentTerms));
            this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString("en-us", this.dateOptions)
        }
    }
}
</script>

<style lang="scss" scoped >
.invoice-content {
    font-size: 80%;
    margin-left: -4%;
    overflow-y: scroll;
    z-index: 9;

    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    .invoice-form {
        width: 33rem;
        position: relative;
    }

    input,
    select {
        color: #fff;
        background-color: #064663;
        border: none;
    }

    .btn-delete {
        cursor: pointer;
        filter: hue-rotate();
    }


}
</style>