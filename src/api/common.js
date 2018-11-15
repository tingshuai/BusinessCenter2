//存放公共数据

export const dataType = [
    {
        label: "date | 日期",
        value: "datetime",
        default: 315504000,
        format: [
            // { label: "时间戳|timestamp", value:"timestamp"}
            {
                label: "yyyy/MM/dd HH:mm:ss",
                value: "yyyy/MM/dd HH:mm:ss"
            },
            {
                label: "yy/MM/dd HH:mm:ss",
                value: "yy/MM/dd HH:mm:ss"
            },
            {
                label: "yyyy/MM/dd",
                value: "yyyy/MM/dd"
            },
            {
                label: "HH:mm:ss",
                value: "HH:mm:ss"
            },
        ]
    },
    {
        label: "String | 字符串",
        value: "string",
        default: "",
        format: [
            {
                label: "无",
                value: ""
            }
        ]
    },
    {
        label: "Int | 整型",
        value: "int",
        default:0,
        format:[
            {
                label:"无",
                value:""
            }
        ]
    },
    {
        label: "Float | 浮点型",
        value: "float",
        default: 0.0,
        format: [
            {
                label: "#.0",
                value: "#.0"
            },
            {
                label: "#.00",
                value: "#.00"
            }
        ]
    },   
   
]
export const getDataTypeLabelByValue =(val)=>{
    for(let item of dataType){
        if(item.value==val){
            return item.label
        }
    }
}
export const dataTypeArr = ["-1","datetime","string","int","float"];
export const dataAble = [
    {
        label: "启用",
        value: true
    },
    {
        label: "停用",
        value: false
    },
]

/*规则控件*/
export const ruleControls = [
    { label: "文本框", value: "input" },//dropLogic:[true,true,true,true,true,true,true]
    { label: "下拉框", value: "select"},
    { label: "单选框", value: "radio" },
    { label: "复选框", value: "checkbox" },
    { label: "文本域", value: "textarea" },
    { label: "日期时间选择器", value: "datetime" },
]; 
/*规则逻辑运算符*/
export const logicControls = [
    { label: "等于",alias:"EQ", value: "=" },
    { label: "包含",alias:"IN", value: "IN" },
    { label: "大于",alias:"GT", value: ">" },
    { label: "大于等于",alias:"GTEQ", value: ">=" },
    { label: "小于",alias:"LT", value: "<" },
    { label: "小于等于",alias:"LTEQ", value: "<=" },
    { label: "不等于",alias:"NEQ", value: "<>" }
];

export const defaultValue = {
    input_EQ: [{label:"空",value:""}],
    input_IN: [{ label: "空", value: "" }],
    input_GT: [{ label: "空", value: "" }],
    input_GTEQ: [{ label: "空", value: "" }],
    input_Lt: [{ label: "空", value: "" }],
    input_LtEQ: [{ label: "空", value: "" }],
    input_NEQ: [{ label: "空", value: "" }],

    select_EQ: [{ label: "空", value: "" }],
    select_IN: [{ label: "空", value: "" }],
    select_GT: [{ label: "空", value: "" }],
    select_GTEQ: [{ label: "空", value: "" }],
    select_Lt: [{ label: "空", value: "" }],
    select_LtEQ: [{ label: "空", value: "" }],
    select_NEQ: [{ label: "空", value: "" }],

    radio_EQ: [{ label: "真 | true", value: false }, { label: "真 | true", value: false }],
    radio_IN: [{ label: "真 | true", value: false }, { label: "真 | true", value: false }],
    radio_GT: [{ label: "过滤规则不可用", value: "notUsed" }],
    radio_GTEQ: [{ label: "过滤规则不可用", value: "notUsed" }],
    radio_Lt: [{ label: "过滤规则不可用", value: "notUsed" }],
    radio_LtEQ: [{ label: "过滤规则不可用", value: "notUsed" }],
    radio_NEQ: [{ label: "过滤规则不可用", value: "notUsed" }],

    checkbox_EQ: [],
    checkbox_IN: [],
    checkbox_GT: [],
    checkbox_GTEQ: [],
    checkbox_Lt: [],
    checkbox_LtEQ: [],
    checkbox_NEQ: [],

    textarea_EQ: [],
    textarea_IN: [],
    textarea_GT: [],
    textarea_GTEQ: [],
    textarea_Lt: [],
    textarea_LtEQ: [],
    textarea_NEQ: [],

    datetime_EQ: [],
    datetime_IN: [],
    datetime_GT: [],
    datetime_GTEQ: [],
    datetime_Lt: [],
    datetime_LtEQ: [],
    datetime_NEQ: [],
}
/*自定义查询排版控件*/
export const queryControls = [
    { label: "文本框", value: "input" },//dropLogic:[true,true,true,true,true,true,true]
    { label: "文本域", value: "textarea" },
    { label: "数字框", value: "inputnumber" },
    { label: "日期选择器", value: "date" },
    { label: "日期时间选择器", value: "datetime" },
    { label: "下拉框", value: "select" },
    { label: "单选框", value: "radio" },
    { label: "复选框", value: "checkbox" },
]; 
/* 事件类型监听 自定义查询排版 */
export const formEvents =[
    {
        label:"获取焦点|focus",
        value: "focus",
        eventCB(data){
            /* data = {self: ...vueObj,config: ...vueObj.config,...} */
        }
    },
    {
        label: "失去焦点|blur",
        value: "blur",
        eventCB(data) {
            /* data = {self: ...vueObj,config: ...vueObj.config,...} */
        }
    },
    {
        label: "输入字符|input",
        value: "input",
        eventCB(data) {
            /* data = {self: ...vueObj,config: ...vueObj.config,...} */
        }
    },
    {
        label: "值改变|change",
        value: "change",
        eventCB(data) {
            /* data = {self: ...vueObj,config: ...vueObj.config,...} */
        }
    }
]


export const needSourceContrls =["select","radio","checkbox"];
export const formatJson =(msg)=>{
    var rep = "~";
    var jsonStr = JSON.stringify(msg, function (key, val) {
        // console.log(val);
        if (typeof val === 'function') {
            return (val + '');
        }
        return val;
    }, rep);//JSON.stringify(msg, null, rep)
    var str = "";
    for (var i = 0; i < jsonStr.length; i++) {
        var text2 = jsonStr.charAt(i)
        if (i > 1) {
            var text = jsonStr.charAt(i - 1)
            if (rep != text && rep == text2) {
                str += ""//\r
            }
        }
        str += text2;
    }
    jsonStr = "";
    for (var i = 0; i < str.length; i++) {
        var text = str.charAt(i);
        if (rep == text)
            jsonStr += "  "
        else {
            jsonStr += text;
        }
        if (i == str.length - 2)
            jsonStr += ""//\r
    }
    return jsonStr;
}
export const JsonParse= (s)=>{    
    if((undefined == s) || (s==""))return s;
    else return JSON.parse(s, function (k, v) {
        if (null != v){
            if (v.indexOf && v.indexOf('function') > -1) {
                return eval("(function(){return " + v + " })()")
            }
        }       
        return v;
    });
}
// [{ label: "test", value: "1233" }],