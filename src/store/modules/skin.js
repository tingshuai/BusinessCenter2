/**
 * skin.js created by fengqingwu qq 841196685 2018/09/05
 * 用于皮肤控制
**/ 
const skin ={
	store:{
		mainHColor: "#409eff",					//主色调（高亮）
		mainMColor: "#666",						//主色调（常规）
		mainLColor: "#999",						//主色调（次色） 
		isShowTop:true,							//是否显示顶部
		topBoxStyle:"",							//顶部导航条样式
		sideBarBoxStyle:"",						//侧边栏box样式
		sideNavHeight:40,						//侧边栏菜单单条高度
		sideNavActiveBgColor: "#409eff",		//侧边栏活动菜单背景色
	},
	actions:{},
	mutations:{
		SET_MAIN_H_COLOR: ( state, data ) => {
			state.mainHColor=data;
		},
		SET_MAIN_M_COLOR: ( state, data ) => {
			state.mainMColor =data;
		},
		SET_MAIN_L_COLOR: ( state, data ) => {
			state.mainLColor = data;
		},
		SET_IS_SHOW_TOP: ( state, data ) => {
			state.isShowTop = data;
		},
		SET_TOP_BOX_STYLE: ( state, data ) => {
			state.topBoxStyle=data;
		},
		SET_SIDE_NAV_HEIGHT: ( state, data ) =>{
			state.sideBarBoxStyle = data;
		},
		SET_SIDE_NAV_ACTIVE_BG_COLOR: ( state, data )=>{
			state.sideNavActiveBgColor = data;
		}
	}
}
export default skin;