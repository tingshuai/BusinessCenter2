import Vue from 'vue'
import Router from 'vue-router'
import page_404 from '../page/404/index.vue'
import unitGroup from 'page/productManagement/unitGroup/unitGroup.vue';//产品组
import operatingProduct from 'page/productManagement/operatingProduct/operatingProduct.vue';//经营产品
import productIntroduction from 'page/productManagement/productArchives/productIntroduction/productIntroduction.vue';//产品介绍
import productMaintenance from 'page/productManagement/productArchives/productMaintenance/productMaintenance.vue';//产品维护
import productSpecification from 'page/productManagement/productArchives/productSpecification/productSpecification.vue';//产品规格
import priceAdjustmentMaintenance from 'page/productManagement/productPriceAdjustment/priceAdjustmentMaintenance/priceAdjustmentMaintenance.vue';//价格调节维护
import releaseRecords from 'page/productManagement/productRelease/releaseRecords/releaseRecords.vue';//发布记录
import see from 'page/productManagement/productRelease/see/see.vue';//查看
import documentResources from 'page/resourceManagement/documentResources/documentResources.vue';//文件资源
import newApplication from 'page/resourceManagement/cloudApplication/newApplication.vue';//云应用
import authDialogBody from 'page/resourceManagement/apiInterface/authDialogBody.vue';//api接口
import equipmentModel from 'page/resourceManagement/equipmentModel/equipmentModel.vue';//设备模型
import accountReceivable from 'page/management/accountReceivable/accountReceivable.vue';//应收款管理...
import collectionDeliveryManagement from 'page/management/collectionDeliveryManagement/collectionDeliveryManagement.vue';//收发货管理...
import importAndExportAccountManagement from 'page/management/importAndExportAccountManagement/importAndExportAccountManagement.vue';//收发货管理...
import orderManagement from 'page/management/orderManagement/orderManagement.vue';//收发货管理...
import invoice from 'page/management/controlOverInvoices/invoice/invoice.vue';//开具发票...
import chartM from 'page/chart-m.vue';//开具发票...
Vue.use(Router)
export default new Router({
	routes: [
		{
			path: "*",
			component: page_404,
			name: "404"
		},
		{
			path:'/chartM',
			name:'chartM',
			component: chartM
		}
		// {
		// 	path: '/operatingProduct',
		// 	name: 'operatingProduct',
		// 	component: operatingProduct
		// },
		// {
		// 	path: '/productIntroduction',
		// 	name: 'productIntroduction',
		// 	component: productIntroduction
		// },
		// {
		// 	path: '/productSpecification',
		// 	name: 'productSpecification',
		// 	component: productSpecification
		// },
		// {
		// 	path: '/productMaintenance',
		// 	name: 'productMaintenance',
		// 	component: productMaintenance
		// },
		// {
		// 	path: '/unitGroup',
		// 	name: 'unitGroup',
		// 	component: unitGroup
		// },
		// {
		// 	path: '/priceAdjustmentMaintenance',
		// 	name: 'priceAdjustmentMaintenance',
		// 	component: priceAdjustmentMaintenance
		// },
		// {
		// 	path: '/releaseRecords',
		// 	name: 'releaseRecords',
		// 	component: releaseRecords
		// },
		// {
		// 	path: '/see',
		// 	name: 'see',
		// 	component: see
		// },
		// {  //文件资源
		// 	path: '/documentResources',
		// 	name: 'documentResources',
		// 	component: documentResources
		// },
		// {  //云应用
		// 	path: '/newApplication',
		// 	name: 'newApplication',
		// 	component: newApplication
		// },
		// { //设备模型
		// 	path: '/equipmentModel',
		// 	name: 'equipmentModel',
		// 	component: equipmentModel
		// },
		// { //api接口
		// 	path: '/authDialogBody',
		// 	name: 'authDialogBody',
		// 	component: authDialogBody
		// },
		// {
		// 	path: '/accountReceivable',
		// 	name: 'accountReceivable',
		// 	component: accountReceivable
		// },
		// {
		// 	path: '/collectionDeliveryManagement',
		// 	name: 'collectionDeliveryManagement',
		// 	component: collectionDeliveryManagement
		// },
		// {
		// 	path: '/invoice',
		// 	name: 'invoice',
		// 	component: invoice
		// },
		// {
		// 	path: '/importAndExportAccountManagement',
		// 	name: 'importAndExportAccountManagement',
		// 	component: importAndExportAccountManagement
		// },
		// {
		// 	path: '/orderManagement',
		// 	name: 'orderManagement',
		// 	component: orderManagement
		// }
  ]
})
