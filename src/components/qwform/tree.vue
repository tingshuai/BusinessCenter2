<template>
  <div class="expand">
    <div>
        <el-button @click="handleAddTop">添加顶级节点</el-button>
        <el-tree ref="expandMenuList" class="expand-tree"
        v-if="isLoadingTree"
        :data="setTree"
        node-key="id"
        highlight-current
        :props="defaultProps"
        :expand-on-click-node="false"
        :render-content="renderContent"
        :default-expanded-keys="defaultExpandKeys"
        @node-click="handleNodeClick"></el-tree>
      </div>
  </div>
</template>
<!-- VUE饿了么树形控件添加增删改功能按钮 -->
<script>
import TreeRender from './tree_render'
import api from 'api/treetest.js'

  export default{
    name: 'tree',
    data(){
      return{
        maxexpandId: api.maxexpandId,//新增节点开始id
        non_maxexpandId: api.maxexpandId,//新增节点开始id(不更改)
        isLoadingTree: false,//是否加载节点树
        setTree: api.treelist,//节点树数据
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        defaultExpandKeys: [],//默认展开节点列表
      }
    },
    mounted(){
      console.log(api)
      this.initExpand()
      // let testData=[{id:1,title:"test1",pid:0},{id:2,title:"test2",pid:0},{id:3,title:"test3",pid:0},{id:4,title:"test4",pid:0},{id:5,title:"test5",pid:1},]
      // let treeData=[];
      // this.setDataToTree(treeData,0,testData);
      // console.log("qwTest=dt=>",treeData);
    },
    methods: {
      setDataToTree(treeData,pId,respData){
      for(var i=0;i<treeData.length;i++) {
          var td = treeData[i];
          if(td.id==pId) {
          treeData[i].children=treeData[i].children.concat(respData);
          return;
          }else{
          this.setDataToTree(td.children, pId, respData);
          }
      }
      },
      deleteLocalDep(treeData,data){
      for(var i=0;i<treeData.length;i++) {
          var td = treeData[i];
          if(td.id==data.id) {
          treeData.splice(i, 1);
          return;
          }else{
          this.deleteLocalDep(td.children, data);
          }
      }
      },
      initExpand(){
        this.setTree.map((a) => {
          this.defaultExpandKeys.push(a.id)
        });
        this.isLoadingTree = true;
      },
      handleNodeClick(d,n,s){//点击节点
        // console.log(d,n)
        d.isEdit = false;//放弃编辑状态
      },
      renderContent(h,{node,data,store}){//加载节点
        let that = this;
        return h(TreeRender,{
          props: {
            DATA: data,
            NODE: node,
            STORE: store,
            maxexpandId: that.non_maxexpandId
          },
          on: {
            nodeAdd: ((s,d,n) => that.handleAdd(s,d,n)),
            nodeEdit: ((s,d,n) => that.handleEdit(s,d,n)),
            nodeDel: ((s,d,n) => that.handleDelete(s,d,n))
          }
        });
      },
      handleAddTop(){
        this.setTree.push({
          id: ++this.maxexpandId,
          name: '新增节点',
          pid: '',
          isEdit: false,
          children: []
        })
      },
      handleAdd(s,d,n){//增加节点
        console.log(s,d,n)
        if(n.level >=6){
          this.$message.error("最多只支持五级！")
          return false;
        }
        //添加数据
        d.children.push({
          id: ++this.maxexpandId,
          name: '新增节点',
          pid: d.id,
          isEdit: false,
          children: []
        });
        //展开节点
        if(!n.expanded){
          n.expanded = true;
        }
      },
      handleEdit(s,d,n){//编辑节点
        console.log(s,d,n)
      },
      handleDelete(s,d,n){//删除节点
        console.log("s,d,n==>",s,d,n)
        n.parent.data.children=[];
        return;
        let that = this;
        //有子级不删除
        if(d.children && d.children.length !== 0){
          this.$message.error("此节点有子级，不可删除！")
          return false;
        }else{
          //新增节点直接删除，否则要询问是否删除
          let delNode = () => {
            let list = n.parent.data.children? n.parent.data.children : n.parent.data,//节点同级数据            
              _index = 99999;//要删除的index
              console.log("fqwtest==>",JSON.stringify(list));
            /*if(!n.parent.data.children){//删除顶级节点，无children
              list = n.parent.data
            }*/
            list.map((c,i) => {
              if(d.id == c.id){
                _index = i;
              }
            })            
            let k = list.splice(_index,1);
            // if(n.parent.data.children)n.parent.data.children=k;
            // else n.parent.data=k;
            console.log("要删除的索引==>",_index,JSON.stringify(list)); //console.log(_index,k)
            this.$message.success("删除成功！")
          }
          let isDel = () => {
            that.$confirm("是否删除此节点？","提示",{
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              delNode()
            }).catch(() => {
              return false;
            })
          }
          //判断是否新增
          d.id > this.non_maxexpandId ? delNode() : isDel()
          
        }
      },
    }
    
  }
</script>

<style>
.expand{
  width:100%;
  height:80%;
  overflow:hidden;
}
.expand>div{
  height:85%;
  padding-top:20px;
  width:50%;
  margin:20px auto;
  max-width:400px;
  overflow-y:auto;
}
.expand>div::-webkit-scrollbar-track{
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  border-radius:5px;
}
.expand>div::-webkit-scrollbar-thumb{
  background-color:rgba(50, 65, 87, 0.5);
  outline:1px solid slategrey;
  border-radius:5px;
}
.expand>div::-webkit-scrollbar{
  width:10px;
}
.expand-tree{
  border:none;
  margin-top:10px;
}
.expand-tree .el-tree-node.is-current,
.expand-tree .el-tree-node:hover{
  overflow:hidden;
}
.expand-tree .is-current>.el-tree-node__content .tree-btn,
.expand-tree .el-tree-node__content:hover .tree-btn{
  display:inline-block;
}
.expand-tree .is-current>.el-tree-node__content .tree-label{
  font-weight:600;
  white-space:normal;
}
</style>