<!-- 产品组 -->
<template>
<div class="qfPage pageContent">
    <classified-search :config="classifiedConfig" @selected="selectedItem" />
    <toolbars>
        <el-row slot="left">
            <el-button @click="toggleAct('all')" size="mini" :type="act == 'all' ? 'primary' : 'default'">全部</el-button>
            <el-button @click="toggleAct('vEnable')" size="mini" :type="act == 'vEnable' ? 'primary' : 'default'">只显示启用</el-button>
            <el-button @click="toggleAct('vUnable')" size="mini" :type="act == 'vUnable' ? 'primary' : 'default'">只显示停用</el-button>
        </el-row>
        <el-row slot="right">
            <el-button @click="toggleAct('add')" size="mini" :type="act == 'add' ? 'primary' : 'default'">新增</el-button>
            <el-button @click="toggleAct('edit')" size="mini" :type="act == 'edit' ? 'primary' : 'default'">编辑</el-button>
            <el-button @click="toggleAct('delete')" size="mini" :type="act == 'delete' ? 'primary' : 'default'">删除</el-button>
            <el-button @click="toggleAct('unable')" size="mini" :type="act == 'unable' ? 'primary' : 'default'">停用</el-button>
        </el-row>
    </toolbars>
    <el-row>
        <el-col :span="6">
            <section class="top">单位组概况</section>
            <section class="bottom">
                <el-row>
                    <el-col :span="10">cvbcb</el-col>
                    <el-col :span="14">xcvxcbcb</el-col>
                </el-row>
            </section>
        </el-col>
        <el-col :span="18">
            <qfTable :table="table" @editRow="editRow" @deleteRow="deleteRow"></qfTable>
        </el-col>
    </el-row>
    <form-page
        :config="dialogConfig"
    ></form-page>
</div>
</template>
<script>
import qwForm from "components/qwform/qwform.vue"
import qfTable from "components/qfCommon/table.vue"
import authDialogBody from "./authDialogBody.vue"
import {mapState} from "vuex"
import {
    getUnitList,getUnitItem
} from './api.js';
export default {
    components:{
        qwForm,
        qfTable,
    },
    computed:{
        ...mapState({
            sidebarHeight : state=> state.app.sidebarHeight
        })
    },
    data(){
        return {
            act:"all",//选中的项目
            dataList:[],
            cur:[0,0,0,0],//选中项
            dataLeft:{},
            dialogConfig:{
                colum:"alone",//表单的列数.....
                showDialog:false,
                functional:"",//弹出框的函数名
                dialogProps:{//传入的参数

                },
                items:[{
                    type:"input",
                    label:"标签1",
                    value:""
                },{
                    type:"select",
                    label:"select",
                    value:"",
                    options:[

                    ]
                }]
            },
            table:{
                tableData:[],
                tableHead:[
                    {"label":"单位组ID","prop":"unitGroupId"},
                    {"label":"单位","prop":"unit"},
                    {"label":"是否基准单位","prop":"isStandard"},
                    {"label":"值域精度","prop":"dataPrecision"},
                    {"label":"换算比","prop":"rate"},
                    {"label":"换算公式","prop":"rateConfig"},
                    {"label":"删除标识","prop":"deleted"},
                    {"label":"企业ID","prop":"companyId"},
                    {"label":"创建时间","prop":"createTime"},
                    {"label":"创建人","prop":"createBy"}
                ],
                tableTitle:"",
                config:{//elementUI---table 的属性项目
                    stripe:true,
                    control:{
                        label:"操作",
                        width:"220"
                    },
                    btns:[
                        {
                            type:"default",
                            eventName:"editRow",
                            text:"编辑",
                            size:"",
                            mode:""
                        },
                        {
                            type:"danger",
                            eventName:"deleteRow",
                            text:"删除",
                            size:"",
                            mode:""
                        },
                        {
                            type:"primary",
                            mode:"switch",
                            eventName:"setEnable",
                            text:"启停",
                            size:"",
                            value:true
                        }
                    ]
                },
            },
			classifiedConfig: [{
				title: '市场名称:',
				options: []
			}, {
				title: '市场分类:',
				options: []
			}, {
				title: '产品分类:',
				options: []
			}, {
				title: '单位组:',
				options: []
            }],
            uniCondition:{
                classId:"",
                isAble:"",
                modelId:"",
                unitGroupId:""                
            }
        }
    },
    mounted(){
        this.itemList();
    },
    methods:{
        /*关闭前调用*/ 
        unitList(params){
            getUnitList({Vue:this,"params":params}).then(res=>{
                this.table.tableData = res.list;
            })
        },
        itemList(){
            let that = this;
            getUnitItem({Vue:this}).then(res=>{
                that.dataList = res.list;
                that.initData({
                    "isFirst":true,
                    "cur":[0,0,0,0],
                    "curRow":0
                })
            })
        },        
        editRow(index,row){
            debugger;
        },
        deleteRow(index,row){
            debugger;
        },
        setEnable(index,row,item){
            debugger;
        },
        toggleAct(item){//点击button 切换act
            this.act = item;
            switch(item){
                case 'all':{
                    this.uniCondition.isAble = null;
                    this.unitList();
                    break;
                }
                case 'vEnable':{//只显示启用.....
                    this.uniCondition.isAble = true;
                    this.unitList(this.uniCondition);
                    break;
                }
                case 'vUnable':{//只显示停用.....
                    this.uniCondition.isAble = false;
                    this.unitList(this.uniCondition);
                    break;
                }
                case 'add':{
                    this.dialogConfig.showDialog = true;
                    break;
                }
                case 'edit':{
                    break;
                }
                case 'unable':{
                    break;
                }
            }
        },
		selectedItem(item,curItem,curRow){
			this.initData({
				"isFirst":false,
				"cur":curItem,
				"curRow":curRow
            })
            this.cur = curItem;
        },
        setSearchData(){
            this.uniCondition.classId = this.classifiedConfig[1].options[this.cur[1]].value;
            this.uniCondition.modelId = this.classifiedConfig[2].options[this.cur[2]].value;
            this.uniCondition.unitGroupId = this.classifiedConfig[3].options[this.cur[3]].value;
        },
		initData(obj){
            let _lastValue = this.dataList[obj.cur[0]].children[obj.cur[1]].children[obj.cur[2]].children[obj.cur[3]];
            this.dataLeft = _lastValue;
			switch(obj.curRow){//点击的层级
				case 0:{
                    if( obj.isFirst ){//是否是刚进来时。。。。
						this.classifiedConfig[0].options = this.dataList;
						this.classifiedConfig[1].options = this.dataList[0].children;
						this.classifiedConfig[2].options = this.dataList[0].children[0].children;
						this.classifiedConfig[3].options = this.dataList[0].children[0].children[0].children;
                        this.dataLeft = this.classifiedConfig[3].options[0];//初始化左侧详情数据
					}else{
						this.classifiedConfig[1].options = this.dataList[obj.cur[0]].children;
						this.classifiedConfig[2].options = this.dataList[obj.cur[0]].children[obj.cur[1]].children;
						this.classifiedConfig[3].options = this.dataList[obj.cur[0]].children[obj.cur[1]].children[obj.cur[2]].children;
					}
                    break;
				}
				case 1:{
                    this.classifiedConfig[2].options = this.dataList[obj.cur[0]].children[obj.cur[1]].children;
                    this.classifiedConfig[3].options = this.dataList[obj.cur[0]].children[obj.cur[1]].children[obj.cur[2]].children;
					break;
				}
				case 2:{
                    this.classifiedConfig[3].options = this.dataList[obj.cur[0]].children[obj.cur[1]].children[obj.cur[2]].children;
					break;
				}
			}
            this.table.tableData = _lastValue.unitDtoList;
            this.setSearchData();
		}        
    }
}
</script>
<style lang="less">
@import url("~style/pageCommon.less");
.qwCommonPage{

}
</style>


