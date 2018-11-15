<template>
<div class="qwTreeBox">
    <el-tree
        ref="structureTree"
        v-if="config.treeData"
        :props="config.propsTree"
        :style="config.treeStyle"
        :data="config.treeData"
        :show-checkbox="false"
        node-key="id"
        :default-expanded-keys="defaultExpendedKeys"
        :filter-node-method="filterNode"
        :expand-on-click-node="false">
        <span class="custom-tree-node" style="display:block;" slot-scope="{ node, data }">            
                <span style="display:inline;cursor:pointer;"  @click="nodeLabelClicked(node,data)"><i class="el-icon-caret-right" :style="node.data.id>0? 'color:transparent;' : ''"></i><label :ref="'qwModelTreeLabel_'+data.id" style="cursor:pointer;line-height:37px;" :style="node.checked==true&&node.data.id>0? 'color:#CCC;':'' " :class="(config.curNode && (node.id==config.curNode.id))? 'curNode':''">{{ node.label }}</label></span>
                <span :ref="'nodeDelBtn_' + data.id" v-if="data.id>0" class="nodeDel" v-show="node.checked" @click.stop = "nodeDel(node,data)"> 删除 </span>
        </span>
    </el-tree>  
</div>  
</template>
<script>
export default {
   props:{
       config:{
           type:Object,
           default(){
                return {                   
                    propsTree: {
                        label: 'label',
                        children: 'children',
                        isLeaf: 'leaf'
                    },
                    treeStyle:"",
                    treeData:null,
                    // treeData:[
                    //     {
                    //         id: 0,
                    //         isEdit:false,
                    //         label: '模型名称',
                    //         children:[]
                    //     }
                    // ],
                    curNode:null,
                    loadTreeAction:"",
                }
           }
       }
   },
   data(){
       return {
           model:null,
           version:null,
           defaultExpendedKeys:[0],
       }
   },
   methods:{
         filterNode(value,data) {
            if(data.id==0){
                return true;
            }else{
                if(value.status==0){
                    if(value.keyWords!=""){
                         return data.label.indexOf(value.keyWords)>=0;
                     }else{
                         return true;
                    }
                 }else{
                    let tag= value.status==1? true:false;
                     if(data.isAble==tag){
                         if(value.keyWords!=""){
                             return data.label.indexOf(value.keyWords)>=0;
                         }else{
                             return true;
                         }
                     }
                }
            }
        },
        setCheckedKeys(data){
            let tree = this.$refs.structureTree;
            let keys = [];
            if(tree){
                keys = tree.getCheckedKeys();
                if(keys.length>0){
                    for(let attr in keys){
                        let delLabel=this.$refs[('nodeDelBtn_' + keys[attr])]
                        if(delLabel){
                            delLabel.click();
                        }
                    }
                }
            }
            console.log("checkedKeys==>",keys);
            // let dels = this.$refs["nodeDelBtn"];
            // console.log("dels==>",dels);
            // if(dels){
            //     for(let item of dels){
            //         item.click();
            //     }
            // }
            setTimeout(() => {
                for(let attr in data){
                    let label=this.$refs['qwModelTreeLabel_' + data[attr]];
                    if(label)label.click();
                } 
            }, 30);
        },
        changeExpended(node,data){
            node.expanded=true;
            //  node.expanded = !node.expanded;
            // if(node.loaded){
            //     node.expanded = !node.expanded;
            // }else{
            //     this.loadTree(node,data);
            // }
        },
        loadTree(node,data){
            console.log(node,data);
            // node.loading=true;
            // if("function" == typeof(this.config.loadTreeAction)){
            //     this.config.loadTreeAction({Vue:this,params:{parentId:node.data.id}}).then(res=>{
            //         let temp=[];
            //         if(res.model){
            //             for(let item of res.model){
            //                 temp.push({...item,label:item.alias})
            //                 node.data.push({...item,label:item.alias})
            //             }
            //             // console.log("done==>",data);
            //             // node.data.children=temp;
            //             // let data_0=JSON.parse(JSON.stringify(data))
            //             // data_0.children=temp;
            //             // this.$set(this.config,"treeData",[data_0]);
            //             // console.log("cesehi===>",[data_0]);
            //             // node.loaded = true;
            //             // node.loading = false;
            //             // this.$set(this.config.treeData[0],"children",temp);
            //         }
            //     })
            // }else{
            //     node.loading = false;
            //     this.$message.error("接口配置错误！")
            // }
            // setTimeout(() => {
            //     node.expanded=true;
            //     node.loading=false;
            //     node.loaded=true;
            // }, 100);
        },
        nodeLabelClicked(node,data){
            if(node.data.id==0)return;            
            if(!node.checked){
                let tree=this.$refs.structureTree;
                if(tree){
                    tree.setChecked(node.data.id,!node.checked,node.data.id==0);
                    this.treeCheckedItemsChange()
                }
            }
            this.$set(this.config,"curNode",node)
            this.$emit("nodeLabelClicked",node);
        },
        nodeDel(node,data){
            this.$refs.structureTree.setChecked(node.data.id,false,node.data.id==0);
            this.treeCheckedItemsChange();
        },
        treeCheckedItemsChange(){
            let tree=this.$refs.structureTree;
            if(!tree)return;
            let nodes=tree.getCheckedNodes()
            let nodes_=[];
            for(let attr in nodes){
                if(nodes[attr].id!=0){
                    nodes_.push(nodes[attr]);
                }
            }
            this.$emit("treeCheckedItemsChange",nodes_)
        },
        /*
        {loadTreeAction:"",model:{},version:{}}
        */
        init(data){
            this.model=data.model;
            this.version=data.version
            this.$set(this.config,"loadTreeAction",data.loadTreeAction)
            this.defaultExpendedKeys=[0];
             if("function" == typeof(this.config.loadTreeAction)){
                this.config.loadTreeAction({Vue:this,params:{modelId:this.model.id}}).then(res=>{
                    let temp=[];
                    if(res.model){
                        for(let item of res.model){
                            temp.push({...item,label:item.alias,value:item.id})
                        }
                        this.$set(this.config,"treeData",[{ id: 0, isEdit:false, label: data.model.label, children:[...temp] }])
                        setTimeout(() => {
                            let tree = this.$refs.structureTree;
                            if(tree){
                                let node = tree.getNode(0)
                                tree.expanded = true;
                            }
                        }, 100);
                    }
                })
            }else{
                this.$message.error("接口配置错误！")
                this.$set(this.config,"treeData",[{ id: 0, isEdit:false, label: data.model.label, children:[] }])
            }
            
        }
    },
    
}
</script>
<style lang="less">
@treeIconColor:#2A93FF;
.qwTreeBox{
    padding: 24px 10px;
    .el-tree-node__expand-icon{
        display: none;
    }
    .el-tree-node__loading-icon,.el-icon-caret-right,.el-icon-caret-top{
        padding: 10px;
        color: @treeIconColor;
    }
    .custom-tree-node{
        width: 100%;
    }
    .nodeDel{
        display:inline-block;
        float: right;
        line-height: 37px;
        padding-right: 10px;
        margin-left:20px;
        color:#F6463B;
    }
}
</style>

