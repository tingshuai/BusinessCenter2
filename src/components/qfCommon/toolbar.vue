<!--按钮组-->
<template>
	<div class="toolbar">
		<div class="clear">
			<div class="rtool">
					<slot name="right"></slot>
			</div>
			<div class="ltool">
				<slot name="left"></slot>
			</div>
		</div>
	</div>
</template>
<style type="text/css" scoped lang="less">
.toolbar {
  height: 60px;
	// background: #FFF;
	// box-shadow: 1px 1px 15px #e6e6e6;
  line-height: 60px;
  // .el-button {
  //   background: #e6e6e6;
  //   color: #686868;
  //   border: 0px solid #dcdfe6;
  // }
  .ltool {
     float: left;
    	margin-left: 10px;
  }
  .rtool {
  	float: right;
    span {
      margin-right: 20px;
    }
   
  }
}
</style>


