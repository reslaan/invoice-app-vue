<template>
    <div class="app-modal position-fixed d-flex w-100 vh-100 justify-content-center align-items-center">
        <div class="modal-content text-white bg-primary w-25 rounded p-3">
            <p>{{$t('modal_desc')}}</p>
            <div class="d-flex justify-content-around">
                  <button @click="keepModal" class="btn btn-primary-2 rounded-pill px-4">{{$t("keep")}} </button>
            <button @click="closeModal" class="btn btn-danger rounded-pill px-4">{{$t("close")}} </button>
            </div>
          
        </div>

    </div>
</template>

<script>
    import { mapMutations ,mapState } from "vuex"

export default{
    name: "modal",
    methods: {
        ...mapMutations(['TOGGLE_MODAL','TOGGLE_INVOICE','TOGGLE_EDIT_INVOICE']),
        keepModal(){
         this.TOGGLE_MODAL();
        },
        closeModal(){
            this.TOGGLE_MODAL();
            this.TOGGLE_INVOICE();
            if(this.editInvoice){
                 this.TOGGLE_EDIT_INVOICE()
            }
           
        }
    },computed: {
        ...mapState(['editInvoice'])
    }
  
}
</script>

<style lang="scss" scoped>
.app-modal{
    z-index: 111;
}
</style>