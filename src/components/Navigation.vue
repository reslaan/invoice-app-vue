<template>
    <header class="header bg-primary-2 h-100 shadow  ">

        <div class=" row m-0 ">
            <div class="p-1  col-1 col-sm-12 col-md-10 m-auto">
                  <img src="@/assets/logo.svg"   class="img-fluid " alt="">
            </div>
          
            <!-- <img src="" class="logo img-fluid m-1 " alt=""> -->

        </div>

    </header>
</template>

<script >
export default {
    name: "Navigation"
}
</script>



<style lang="scss" scoped >
.header {
    z-index: 999;
     
     position: relative;
     @media (min-width: 940px){
        width: 65%;  
     } 
  
}
</style>