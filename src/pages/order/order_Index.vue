<template>
    <div class="page">
        <uz-grid :grids="menus" :role="user.role" @change="handleGridChange"></uz-grid>
    </div>
</template>

<script>
    import {EventBus, Constants, mixins} from  '../../service/index';
    import UzGrid from "../../components/Grid";

    export default {
        components: {UzGrid},
        mixins: [mixins],
        name: 'order',
        data() {
            return {
                grid_cols: 3,
                grids: []
            }
        },
        created(){
            console.log('created');
            this.menus = Constants.Order.menu;

            this.user = this.getUser();

            EventBus.$emit(Constants.EventBus.update_main_tab_index, 0);
        },
        methods: {
            handleGridChange(val)
            {
                this.router_push(this.menus[val])
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
