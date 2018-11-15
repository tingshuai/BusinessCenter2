<template>
<div class="menu_root">
<ul class="box" v-if="mainNav.length>0">
	<li v-for="(menu,i) in mainNav" :class="{'father': (menu.childrens && menu.childrens.length>0),'opened':menu.opened}" :style="(menu.height? 'height:'+menu.height+'px':'')">
		<a href="javascript:void(0);" @click.stop="menuClicked(menu,mainNav,i)" class="link" :class="($route.path=='/'&&menu.link=='/desktop')||(menu.link==$route.path)||($route.path=='/index2'&&menu.link==iframeLink)?'active' : ''"><span>{{menu.title}}</span><i v-if="menu.childrens" :class="{'el-icon-arrow-right':(menu.childrens.length>0 && (!menu.opened)),'el-icon-arrow-up':(menu.childrens.length>0 && (menu.opened))}"></i></a>		
		<ul v-if="menu.childrens" class="box sub" >
			<li v-for="(menu_2,j) in menu.childrens" :style="(menu_2.height? 'height:'+menu_2.height+'px':'')">
				<a href="javascript:void(0);" class="link"  @click.stop="menuClicked(menu_2,menu.childrens,j)" :class="menu_2.link==$route.path||($route.path=='/index2' && menu_2.link==iframeLink)?'active' : ''"><span>{{menu_2.title}}</span> <i v-if="menu_2.childrens" :class="{'el-icon-arrow-right':(menu_2.childrens.length>0 && (!menu_2.opened)),'el-icon-arrow-up':(menu_2.childrens.length>0 && (menu_2.opened))}"></i></a>
					<ul v-if="menu_2.childrens" class="box sub" >
						<li v-for="(menu_3,k) in menu_2.childrens" >
							<a href="javascript:void(0);"  @click.stop="menuClicked(menu_3,menu_2.childrens,k)" class="link" :class="menu_3.link==$route.path ||($route.path=='/index2'&& menu_3.link==iframeLink)?'active' : ''" :style="menu_3.link==$route.path ||($route.path=='/index2'&& menu_3.link==iframeLink ? ('background:' + sideNavActiveBgColor) : '')"><span>{{menu_3.title}}</span></a>
						</li>
					</ul>	
			</li>
		</ul>
	</li>
</ul>
</div>	
</template>
<script>
import { mapMutations, mapState } from 'vuex'
let menuObj = {
	data(){
		return {
		}
	},
	computed:{
		...mapState({
			tags: state=> state.app.tags,
		    tagsActiveIndex: state => state.app.tagsActiveIndex,
		    curRoute: state => state.app.curRoute,
		    iframeLink: state=> state.app.iframeLink,
			mainNav: state=> state.app.sideMenus,
			sideNavActiveBgColor: state => state.skin.sideNavActiveBgColor
		})
	},
	created(){
		this.initNav();
	},
	methods:{
		...mapMutations(['ADD_TAG','SET_SIDE_MENUS']),
		initNav(){
			for(let menu of this.mainNav){
				if(menu.childrens&&menu.childrens.length>0){
					menu.opened=false;
				}
			}
			// this.ADD_TAG(
			// 	{
			//     	id: 1,
			//     	title:'后台首页',
			//     	link:'/desktop'
			//     })
		},		
	    getHeight(menu){
	    	if(!menu.childrens || !menu.opened)return 48;
	    	var h=48;
	    	for(let item of menu.childrens){
	    		h+=this.getHeight(item);
	    	}
	    	return h;
		},
		refreshHeight(){
			for(let attr in this.mainNav){
				this.$set(this.mainNav[attr],'height',this.getHeight(this.mainNav[attr]));
				if(this.curRoute && (this.curRoute.link == this.mainNav[attr]))this.$set(this.mainNav[attr],'active',true);
				if(this.mainNav[attr].childrens){
					for(let attr2 in this.mainNav[attr].childrens){
						this.mainNav[attr].childrens[attr2].height=this.getHeight(this.mainNav[attr].childrens[attr2]);						
					}
				}
			}
		},
		menuClicked(menu,parent,index){
			if(!menu.childrens||menu.childrens.length==0){
				this.ADD_TAG(menu);
				return;
			}
			if(menu.childrens.length>0){
				if(undefined==menu.opened)menu.opened=false;
				for(let attr in parent){
					if(undefined==parent[attr].opend)parent[attr].opend=false;						
					if(parseInt(attr)==parseInt(index)){
						this.$set(parent[attr],'opened', !parent[attr].opened);
						this.refreshHeight();
						//this.$set(parent[attr],'height',parent[attr].opened? this.getHeight(parent[attr]) : 48);
						//<!-- parent[attr].height = parent[attr].opened? this.getHeight(parent[attr]) : 48; -->
					}else{
						this.$set(parent[attr],'opened', false);
						this.refreshHeight();
						//parent[attr].height=48;
					}						
				}
			}
		},
	}
}	
export default menuObj;
</script>
<style lang="less">
.menu_root{
	overflow-x: hidden;
	.box{
		list-style:none;
		width:100%;
		line-height:48px;
		box-sizing:border-box;
		text-align:left;
		font-size:14px;
		color:rgba(255,255,255,0.8);
		li,ul li,ul li ul,ul li ul li{
			cursor:pointer;
			transform-origin:center 0;
			-o-transition:all 0.3s;
			-ms-transition:all 0.3s;
			-moz-transition:all 0.3s;
			-webkit-transition:all 0.3s;
			transition:all 0.3s;
		}
		li{
			box-sizing:border-box;
			height:auto;
			overflow:hidden;			
			position:relative;
			.link{
				box-sizing: border-box;
				position:relative;
				color:inherit;
				text-decoration:none;
				display:block;
				padding-left:42px;
				font-size: 15px;
				line-height:48px;
				width:100%;				
				background: transparent;
			}
			.link.active{
				background:rgba(42,147,255,1);
				font-weight:200;
				color:#FFF;
			}
			// ul:before{
			// 	content:"";
			// 	display:block;
			// 	position:absolute;
			// 	left:12px;
			// 	width:1px;
			// 	height: calc(100% - 60px);
			// 	border-left:1px solid rgba(255,255,255,0.36);
			// }
			ul .link{
				padding-left:1em;
				background: rgb(0,12,23);
				padding-left:50px;
			}
			
			i{
				float:right;
				line-height:48px;
				color:inherit;
				font-size:10px;
				margin-right:1.5em;
			}

		}
		.father{
			ul{
				height:0;
				overflow:hidden;
				// .link:before{
				// 	display:block;
				// 	content:"";
				// 	background: transparent;
				// 	position: absolute;
				// 	z-index:10;
				// 	top:10px;
				// 	left:12px;
				// 	content:"";
				// 	width:4px;
				// 	height:8px;
				// 	border:1px solid transparent;
				// 	border-bottom-color:  rgba(255,255,255,0.36);
				// }
				ul:before{
					left:36px;
				}
				ul .link{
					padding-left:60px;
				}
				ul .link:before{
					left:36px;
				}
				i{
					margin-right:2em;
				}
			}
		}

		.father.opened{
			ul{
				height:auto;
			}
		}
		.box.sub{
			li span{
				padding-left:1em;
			}
		}
		.link:hover{
				background:rgba(255,255,255,0.10);
				font-weight:200;
				color:#FFF;
		}
	}

}	
</style>