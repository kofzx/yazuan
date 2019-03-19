<template>
	<div>
		<div v-show="!cartNums"></div>
		<div class="bkc-white" v-show="cartNums">
			<div class="top-edit">
				<div class="checkbox">
					<icon type="success" size="18" color="#ECB85E"></icon>
					<img src="../../images/cart/store.png">
					<span class="text">雅钻珠宝服务平台</span>
				</div>
				<span class="edit">编辑</span>
			</div>
			<checkbox-group class="shopping-list">
				<div class="shopping-list__item">
					<icon type="success" size="18" color="#ECB85E"></icon>
					<img src="" class="goods">
					<div class="main-box">
						<div class="title"></div>
						<div class="parameters">规格：25K纯金</div>
						<div class="info">
							<span class="price"></span>
							<span class="count">1</span>
						</div>
					</div>
				</div>
			</checkbox-group>
		</div>
		<!-- submit-bar -->
		<yz-submit-bar
			:show="cartNums"
			:price="40996"
			:buttonText="'结算(' + cartNums + ')'">
			<div class="my-checkbox">
				<icon type="success" size="18" color="#ECB85E" class="icon"></icon>
				<span class="text">全选</span>
			</div>
		</yz-submit-bar>
	</div>
</template>

<script>
	import Storage from 'utils/Storage';
	import submitBar from 'components/submit-bar/index.vue';

	export default {
		name: 'cart',
		data () {
			return {
				cartNums: 0,
			}
		},
		onShow () {
			Storage
				.get('cartNums')
				.then(data => {
					this.cartNums = data;
				})
		},
		components: {
			'yz-submit-bar': submitBar
		}
	}
</script>

<style lang="stylus">
	bold-font()
		font-size: 14px
		font-weight: bold
	
	// 顶部编辑
	.top-edit
		size(375px, 50px)
		flex-row()
		justify-content: space-between
		padding: 0 15px
		.checkbox
			flex-row()
			img
				size(16.5px, 15px)
				margin-left: 11px
				margin-right: 5.5px
			.text
				bold-font()
				color: $theme-black
		.edit
			font-size: 13px
			color: #3388FF
	// 商品清单
	.shopping-list__item
		height: 120px
		border: 1px solid #E6E6E6
		padding: 0 15px
		flex-row()
		justify-content: space-between
		.goods
			size(78px, 85px)
			margin: 0 15px
		.main-box
			flex: 1
			height: 69px
			flex-column()
			justify-content: space-between
			.title
				font-size: 14px
				color: $theme-black
				overflow-line(1)
			.parameters
				font-size: 12px
				color: #666666
			.info
				flex-row()
				justify-content: space-between
				.price
					font-size: 14px
					color: $active-red
					yuan()
					&::before
						font-size: 1em
						margin-right: 2px
				.count
					font-size: 12px
					color: #666666
					count()
	.my-checkbox
		float: left
		line-height: 55px
		.icon
			position: relative
			top: 5px
			margin-left: 15px
		.text
			bold-font()
			color: $theme-black
			margin-left: $margin-m
</style>