<template>
<div class="desktop_root">
    <qwModalForm ref="qwModalForm" :config="config">
        <!-- slot:title自定义弹框头部 -->
        <!-- <h1 slot="title">标题测试</h1> -->
    </qwModalForm>
    <el-button @click="showModal">展示模态框</el-button>
    <!-- <el-button @click="closeModal">关闭模态框</el-button> -->
    <div class="treeBox">
        <RenderTree></RenderTree>
    </div>
</div>	
</template>
<script>
import qwform from "../../components/qwform/qwform.vue"
import qwfromtable from "../../components/qwform/qwFormTable.vue"
import qwModalForm from "../../components/qwform/qwMoalForm.vue"
import qwMenu from "../../components/qwform/qwMenu.vue"
import qwTree from "../../components/qwform/tree.vue"
import RenderTree from "../../components/qwform/qwtree.vue"
let vueObj = {
	components:{
		qwform,
        qwfromtable,
        qwModalForm,
        qwMenu,
        qwTree,
        RenderTree
	},
	data(){
		return {
            config:{
                    qwForm:{
                            "items": [{
                                "key": "item_31",
                                "name": "用户ID",
                                "span": 8,
                                "type": "input",
                                "rules": [{
                                    "message": "该项为必填|必选项",
                                    "trigger": ["blur", "change", "input"],
                                    "required": true,
                                    "ruelType": "required"
                                }],
                                "colStyle": "",
                                "disabled": false,
                                "clearable": true,
                                "controlWidth": "140px"
                            }, {
                                "key": "item_32",
                                "name": "登录账号",
                                "span": 8,
                                "type": "input",
                                "rules": [{
                                    "message": "该项为必填项",
                                    "trigger": ["blur", "change", "input"],
                                    "required": true,
                                    "ruelType": "required"
                                }, {
                                    "max": 20,
                                    "min": 6,
                                    "message": "长度在6到20个字符",
                                    "trigger": ["blur", "change", "input"],
                                    "ruelType": "len"
                                }],
                                "colStyle": "",
                                "disabled": false,
                                "clearable": true,
                                "controlWidth": "140px"
                            }, {
                                "key": "item_33",
                                "name": "登录密码",
                                "span": 8,
                                "type": "input",
                                "rules": [{
                                    "message": "该项为必填|必选项",
                                    "trigger": ["blur", "change", "input"],
                                    "required": true,
                                    "ruelType": "required"
                                }],
                                "colStyle": "",
                                "disabled": false,
                                "clearable": true,
                                "controlWidth": "140px"
                            }, {
                                "key": "item_34",
                                "name": "头像",
                                "span": 8,
                                "type": "input",
                                "colStyle": "",
                                "disabled": false,
                                "clearable": true,
                                "controlWidth": "140px"
                            }, {
                                "key": "item_35",
                                "name": "性别",
                                "span": 8,
                                "type": "radio",
                                "items": [{
                                    "label": "男",
                                    "value": 1
                                }, {
                                    "label": "女",
                                    "value": 2
                                }],
                                "colStyle": "",
                                "controlWidth": "140px"
                            }, {
                                "key": "item_36",
                                "name": "账户余额",
                                "size": "medium",
                                "span": 8,
                                "type": "inputNumber",
                                "label": "",
                                "controls": false,
                                "disabled": false,
                                "controlWidth": "140px",
                                "controlsPosition": "right"
                            }],
                            "formData": {
                                "item_31": "",
                                "item_32": "",
                                "item_33": "",
                                "item_34": "",
                                "item_35": "",
                                "item_36": ""
                            },
                            "itemSpan": 8,
                            "labelWidth": "82px",
                            "itemEventCB": {
                                "blur": {
                                    "item_31": function(data){
                                        alert("失去焦点")
                                        console.log(data)
                                    }
                                },
                                "focus": {},
                                "input": {},
                                "change": {}
                            },
                            "controlWidth": "100px",
                            "formBtnsStyle":"text-align:right",
                            "formBtns":[
                                {
                                    size:"small",//medium / small / mini
                                    type:"primary",//primary / success / warning / danger / info / text
                                    plain:false,//是否朴素
                                    round:false,//是否圆角按钮
                                    circle:false,//是否圆形按钮
                                    loading:false,//是否加载中状态
                                    disabled:false,//是否禁用
                                    icon:"",//图标class
                                    autofocus:false,//自动获取焦点
                                    nativeType:"button",//button / submit / reset
                                    label:"保存",
                                    class:"",
                                    style:"width:100px;text-align:center;"
                                },{
                                    size:"small",//medium / small / mini
                                    type:"",
                                    label:"取消",
                                    class:"",
                                    style:"width:100px;text-align:center;"
                                }
                            ],
                            eventCB:{//回调事件
                            formBtnClicked:(data)=>{
                                switch (data.index) {
                                    case 0:
                                        {
                                            alert("保存")
                                        }
                                        break;
                                    case 1:
                                        {
                                            alert("取消")
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                console.log("formBtnClicked",data);
                                return false;//return false或者该函数不存在则直接触发emit "formBtnClicked" return true则不向下执行
                            }
                            }
                        },
                        qwDialog:{
                            title:"弹出框标题",
                            titleStyle:"background:#FFF;",
                            dialogVisible:false,
                            width:"1200px",
                            fullscreen:false,
                            top:"15vh",
                            modal:true,//遮罩
                            modalAppendToBody:true,
                            appendToBody:false,
                            lockScroll:true,
                            customClass:"",
                            closeOnClickModal:true,
                            closeOnPressEscape:true,
                            showClose:true,
                            center:false,
                            beforeClose:()=>{
                                console.log("beforeClose")
                            }
                        }
            }
			// form1:{
			// 	labelWidth: 80,
            //     itemWidth:300,
            //     itemSpan:12,
            //     items:[
            //         {   
            //             colStyle:"",
            //             key:"item1",
            //             type:"input",
            //             name:"项目1",
            //             disabled:false,
            //             clearable:true,
            //             suffixIcon:"",
            //             prefixIcon:"",
            //             maxLength:40,
            //             minLength:0,
            //             rows:1,//textarea适用
            //             autoComplete:"off",
            //             name:"item1",
            //             readonly:false,
            //             rule:[{required:true,message:"请输入项目1",trigger:["input","change","blur"]}],
            //         },
            //         {
            //             key:"item4",
            //             type:"input",
            //             name:"项目4",
            //             disabled:false,
            //             clearable:true,
            //             suffixIcon:"",
            //             prefixIcon:"",
            //             maxLength:40,
            //             minLength:0,
            //             rows:1,//textarea适用
            //             autoComplete:"off",
            //             name:"item4",
            //             readonly:false,
            //             rule:[{required:true,message:"请输入项目1",trigger:["input","change","blur"]}],
            //         },
                   
            //         {
            //             key: "item3",
            //             type:"select",
            //             filterable:true,
            //             remote:true,
            //             remoteMethod:(query)=>{
            //                   if(query) this.config.items[3].dropDown.data=[{label:'下拉1',value:'数据1'},{label:'下拉2',value:'数据2'}]//res.model;
            //                   else this.config.items[3].dropDown.data=[];
            //                 http.fetchPost('/itemList/getItem3',{params:{query:query}}).then(res=>{
            //                     this.config.formData['item3'].dropDown.data=[{label:'下拉1',value:'数据1'},{label:'下拉2',value:'数据2'}]//res.model;
            //                 })
            //             },
            //             dropDown:{
            //                 data:[],
            //                 api:{
            //                     method:"post",
            //                     action:"/itemlist/get"
            //                 }
            //             },
            //             name:"项目3",
            //             disabled:false,
            //             rule:[{required:true,message:"请选择项目2",trigger:["input","change","blur"]}],
            //         },
            //         {
            //             key: "item5",
            //             type:"select",
            //             filterable:true,
            //             remote:false,
            //             dropDown:{
            //                 data:[{label:"item5 label",value:"item5 value"},{label:"item5 label2",value:"item5 value2"}]
            //             },
            //             name:"项目5",
            //             disabled:false,
            //             rule:[{required:true,message:"请选择项目2",trigger:["input","change","blur"]}],
            //         },{
            //             key:"item6",
            //             type:"radio",
            //             name:"项目7",
            //             items:[{
            //                 label:'备选项1',
            //                 value:'1',
            //                 disabled:false,
            //             },{
            //                 label:'备选项2',
            //                 value:'2',
            //                 disabled:true,
            //             }],
            //         },{
            //             type:"checkbox",                        
            //             name:"项目8",
            //             items:[{                            
            //                 key:"item7",
            //                 disabled:false,
            //                 label:'备选项1',
            //             },{                    
            //                 key:"item8",
            //                 label:'备选项2',
            //                 disabled:true
            //             }],
            //         },{
            //             type:"checkboxgroup",
            //             key:"item9",
            //             name:"项目9",
            //             items:[{
            //                 disabled:false,
            //                 label:'备选项1',
            //                 value:111
            //             },{
            //                 label:'备选项2',
            //                 disabled:false,
            //                 value:22222
            //             }],
            //         },{
            //             type:"inputNumber",
            //             key:"item10",
            //             name:"项目10",
            //             disabled:false,
            //             min:0,
            //             max:100,
            //             step:0.01,
            //             precision:2,//精度
            //             controls:true,//是否使用控制按钮
            //             size:"medium",//small,mini
            //             label:"",
            //             controlsPosition:"right",//right or ''
            //         },{
            //             type:"timePicker",
            //             key:"item11",
            //             name:"项目11",
                        
            //             readonly:false,
            //             disabled:false,
            //             editable:true,
            //             clearable:true,
            //             size:"",
            //             placeholder:"",
            //             startPlaceholder:"",
            //             endPlaceholder:"",
            //             isRange:false,//是否
            //         },{
            //             key:"item2",
            //             type:"textarea",
            //             name:"项目2",
            //             span:24,
            //             width:400,
            //             disabled:false,
            //             clearable:true,
            //             suffixIcon:"",
            //             prefixIcon:"",
            //             maxLength:40,
            //             minLength:0,
            //             rows:3,//textarea适用
            //             autoComplete:"off",
            //             name:"item2",
            //             readonly:false,
            //             rule:[{required:true,message:"请输入项目1",trigger:["input","change","blur"]}],
            //         },
            //     ],
            //     formData:{
            //         item1:"",
            //         item2:"",
            //         item3:"",
            //         item4:"",
            //         item5:"",
            //         item6:"",
            //         item7:"",
            //         item8:"",
            //         item9:[],
            //         item10:"",
            //         item11:"",
            //     },
            //     formBtnsStyle:"text-align:right",
            //     formBtns:[
            //         {
            //             size:"small",//medium / small / mini
            //             type:"primary",//primary / success / warning / danger / info / text
            //             plain:false,//是否朴素
            //             round:false,//是否圆角按钮
            //             circle:false,//是否圆形按钮
            //             loading:false,//是否加载中状态
            //             disabled:false,//是否禁用
            //             icon:"",//图标class
            //             autofocus:false,//自动获取焦点
            //             nativeType:"button",//button / submit / reset
            //             label:"测试一",
            //             class:"",
            //             style:"width:100px;text-align:center;"
            //         }
            //     ]
			// }
		}
	},
	methods:{
		formBtnClicked(data){
			data.self.validate(()=>{
				console.log("done")
			})
			// .then(res=>{
			// 	console.log("resolve",res);
			// }).catch(res=>{
			// 	console.log("reject",res);
			// })
			// setTimeout(() => {
			// 	data.btn.loading=false;
			// }, 1000);
			// console.log(data);
        },
        showModal(){
            this.$refs['qwModalForm'].showModal();
            // setTimeout(() => {
            //     this.closeModal();
            // }, 1000);
        },
        closeModal(){
            this.$refs['qwModalForm'].closeModal();
        }
	}

}	
export default vueObj;
</script>
<style lang="less">
	.treeBox{
        width: 400px;
        height: 500px;
        overflow: scroll;
    }
</style>