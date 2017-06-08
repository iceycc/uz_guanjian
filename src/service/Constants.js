/**
 * Created by zhangweiwei on 16/9/7.
 */

export const EventBus = {
    userLogin: 'userLogin',
    setTitle: 'setTitle',
    showToast: 'showToast',
    setTitleLeftIcon: 'setTitleLeftIcon',
    update_main_tab_index: 'update_main_tab_index'
};

//主页tab数据
export const Tabs = [{
    url: '/order',
    img: require('../assets/image/icon_tab_order.png'),
    act_img: require('../assets/image/icon_tab_order_act.png'),
    name: '订单管理',
    index: 0
}, {
    url: '/zhuge',
    img: require('../assets/image/icon_tab_zgzxb.png'),
    act_img: require('../assets/image/icon_tab_zgzxl_act.png'),
    name: '诸葛装修',
    index: 1
}, {
    url: '/log',
    img: require('../assets/image/icon_tab_log.png'),
    act_img: require('../assets/image/icon_tab_log_act.png'),
    name: '日志',
    title: '日志管理',
    index: 2
}, {
    url: '/userinfo',
    img: require('../assets/image/icon_tab_userb.png'),
    act_img: require('../assets/image/icon_tab_userl_act.png'),
    name: '个人中心',
    index: 3
}];

/**
 *  订单列表页 查询选项
 */
export const Order = {
    search_field: [{
        title: '小区地址',
        value: 0,
        key: 'address',
        hintText: '请输入小区地址',
        type: 'text'
    }, {
        title: '用户名称',
        value: 1,
        key: 'title',
        hintText: '请输入用户名称',
        type: 'text'
    }, {
        title: '手机号码',
        value: 2,
        key: 'telephone',
        hintText: '请输入手机号码',
        type: 'number'
    }, {
        title: '订单编号',
        value: 3,
        key: 'order_no',
        hintText: '请输入订单编号',
        type: 'number'
    }],
    tabs: [{
        name: '待处理',
        count: 0,
        value: '1'
    }, {
        name: '进行中',
        count: 0,
        value: '2'
    }, {
        name: '已竣工',
        count: 0,
        value: '3'
    }, {
        name: '已完成',
        value: '4'
    }, {
        name: '已终止',
        count: 0,
        value: '5'
    }],
    node: {
        before: [{
            name: '预约见面'
        }, {
            name: '见面'
        }, {
            name: '预约量房'
        }, {
            name: '上面量房'
        }, {
            name: '报价审核'
        }, {
            name: '签订意向定金'
        }, {
            name: '预交底'
        }, {
            name: '签订三方合同'
        }],
        going: [{
            name: '开工仪式'
        }, {
            name: '水电材料验收'
        }, {
            name: '水电工程验收'
        }, {
            name: '防水工程验收'
        }, {
            name: '瓦木材料验收'
        }, {
            name: '瓦木工程验收'
        }, {
            name: '油漆材料验收'
        }, {
            name: '油漆工程验收'
        }, {
            name: '安装工程验收'
        }, {
            name: '竣工验收'
        }],
        after: [{
            name: '第一次环保监测'
        }, {
            name: '第二次环保监测'
        }, {
            name: '维保'
        }, {
            name: '环保治理'
        }, {
            name: '环保治理后复测'
        }]
    }
}

export const Tips = {
    input_null: '输入内容为空',
    search_word_null: '输入内容为空',
    params_null: '参数为空'
}