<template>
    <div class="loading position-absolute d-flex justify-content-center align-items-center  start-0 top-0 w-100 h-100 bg-dark bg-opacity-50">
      <span class="d-block m-auto "></span>
    </div>
</template>

<script >
export default {
    name: "Loading"
}
</script>

<style lang="scss" scoped>

    .loading{
        z-index: 110;
        @keyframes spin {
            to {
                transform: rotateZ(360deg);
            }
        }

        span{
            width: 60px;
            height: 60px;
            // margin: 0 auto;
            border: 3px solid transparent;
            border-top-color: #fff;
            border-bottom-color: #fff;
            border-radius: 50%;
            animation: spin ease 1000ms infinite;
        }
    }

</style>