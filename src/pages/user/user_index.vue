<template>
    <div class="page">
        <div class="layout userinfo">
            <mu-avatar class="user-image" :src="hkData.avatar"/>
            <div>
                <div class="user-text">昵称:{{hkData.mName}}</div>
                <div class="user-text">账号:{{hkData.userName}}</div>
            </div>
        </div>
        <div class="layout">
            <uz-grid :grids="menus" :cols="col" :role="user.role" @change="handleGridChange"></uz-grid>
        </div>
        <div class="layout" v-if="!isCSJL">
            <div class="guanjia-data-title">
                <div class="title">管家数据(本月)</div>
                <div @click="toGuanjiaData">更多</div>
            </div>
            <div class="guanjia-data">
                <div class="data">本月派单数:{{hkData.allocationHk}}</div>
                <div class="data">见面客户数:{{hkData.meeting}}</div>
                <div class="data">量房客户数:{{hkData.homeSurvey}}</div>
                <div class="data">已交定金的订单数:{{hkData.intentDeposit}}</div>
                <div class="data">已签合同的订单数:{{hkData.schemeSubmit}}</div>
            </div>
        </div>
        <div class="layout" v-else>
            <div class="guanjia-data-title">
                <div class="title">城市经理数据(本月)</div>
            </div>
            <div class="guanjia-data">
                <div class="data" @click="openPage(0)">本月派单数:{{hkData.orderQty}}</div>
                <div class="data" @click="openPage(1)">见面客户数:{{hkData.meetQty}}</div>
                <div class="data data-full" @click="openPage(2)">量房客户数:{{hkData.measureQty}}</div>
                <div class="data data-full" @click="openPage(3)">
                    定金总数据:{{hkData.depositMoney}}元({{hkData.despositQty}}单)
                </div>
                <div class="data data-full" @click="openPage(4)">
                    平台单合同总数据:{{hkData.customersContractMoney}}元({{hkData.customersContractQty}}单)
                </div>
                <div class="data data-full" @click="openPage(5)">
                    工地托管单合同数据:{{hkData.corpContractMoney}}元({{hkData.corpContractQty}}单)
                </div>
            </div>
        </div>
        <div class="navigator">
            <div class="item" @click="openWeb('http://m.uzhuang.com')">
                <img class="img" src="../../assets/image/mzhan.png" alt="">
                <div>主站M站</div>
                <div>></div>
            </div>
            <div class="item" @click="openWeb('http://mall.uzhuang.com/mobile')">
                <img class="img" src="../../assets/image/shopmzhan.png" alt="">
                <div>商城M站</div>
                <div>></div>
            </div>
            <div class="item" @click="openWeb('http://m.uzhuang.com/activity-index.html')">
                <img class="img" src="../../assets/image/company.png" alt="">
                <div>推荐装修返现</div>
                <div>></div>
            </div>
        </div>

        <mu-raised-button label="退出" @click="doLogout" fullWidth secondary/>
    </div>
</template>

<script>
    import {EventBus, Constants, mixins, API} from '../../service/index';
    import UzGrid from "../../components/Grid";

    let api;

    export default {
        components: {UzGrid},
        name: 'user_index',
        mixins: [mixins],
        data() {
            return {
                user: {},
                hkData: {},
                col: 6,
                menus: Constants.User.menus
            };
        },
        created() {
            api = new API(this);
            //this.getScheduleData();
        },
        activated() {
            EventBus.$emit(Constants.EventBus.update_main_tab_index, 1);
            this.getGuanjiaData();
        },
        methods: {
            openWeb(url) {
                window.location.href = url;
            },
            doLogout() {
                this.logout();
            },
            getGuanjiaData() {
                let url = Constants.method.hkDataList;

                if (this.isCSJL)
                    url = Constants.method.cm_profile;

                api.post(url, null, (result) => {
                    this.hkData = result;

                    this.menus.forEach((item, index) => {

                        if (this.menus[index].path === 'cm_order_index') {
                            this.menus[index].count = result.unhandledQty;
                        }

                        if (this.menus[index].path === 'evaluate_list') {
                            this.menus[index].count = result.commentQty;
                        }
                    });
                });
            },
            openPage(type) {
                this.router_push({
                    path: 'cm_user_allot_list',
                    query: {
                        type: type
                    }
                });
            },
            getScheduleData() {
                api.post(Constants.method.schedule, null, (result) => {
                });
            },
            toGuanjiaData() {
                this.router_push({path: 'guanjia_data'});
            },
            handleGridChange(val) {
                let value = this.menus[val];

                if (value.path === 'cm_order_index') {
                    value.params = {
                        tab: 0
                    };
                } else if (value.path === "evaluate_list") {
                    value.params = {
                        isnew: 0
                    };
                }

                this.router_push(value);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "../../style/px2rem";

    .page {
        padding: px2rem(5) 0;

        .layout {
            padding: px2rem(10) px2rem(15);
            border-bottom: px2rem(5) solid #CCCCCC;
        }
        .layout:nth-child(2) {
            padding: 0;
        }

        .userinfo {
            display: flex;
            flex-direction: row;
            align-items: center;
            .user-image {
                width: px2rem(50);
                height: px2rem(50);
                margin-right: px2rem(20);
            }
            .user-text {
                font-size: px2rem(16);
            }
            .user-text:first-child {
                padding-bottom: px2rem(5);
            }
        }

        .guanjia-data-title {
            display: flex;
            font-size: px2rem(14);
            .title {
                flex-grow: 1;
                text-align: left;
            }
        }

        .guanjia-data {
            display: flex;
            flex-wrap: wrap;
            .data {
                width: 50%;
                font-size: px2rem(12);
                text-align: left;
                margin-top: px2rem(5);
            }
            .data-full {
                width: 100%;
            }
        }

        .navigator {
            flex-grow: 1;
            padding: 0 px2rem(15);
            font-size: px2rem(12);
            .item {
                border-bottom: px2rem(1) solid #CCCCCC;
                padding: px2rem(10) 0;
                display: flex;
                flex-direction: row;
                :nth-child(1) {
                    width: px2rem(25);
                    height: px2rem(25);
                    margin-right: px2rem(10);
                }
                :nth-child(2) {
                    flex-grow: 1;
                }
            }
        }
    }


</style>
