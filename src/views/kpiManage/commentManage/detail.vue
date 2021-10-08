<!--
 * @Description: 
 * @Date: 2021-08-31 14:59:02
 * @LastEditTime: 2021-08-31 14:59:02
-->
<template>
    <div>
        <edit :id="id" type="detail"></edit>
    </div>
</template>

<script>
    import Edit from './edit';
    export default {
        components:{
            Edit
        },
         props: {
            id: {
                type: String,
                default:''
            }
        },
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style scoped lang="less">

</style>