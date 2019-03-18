<template>
	<ul class="selling-goods clearfix bkc-white">
		<li 
			class="selling-goods__item"
			v-for="goods in data"
			:key="goods">
			<img :src="goods.img" class="goods">
			<div class="info-box">
				<div class="name">{{goods.name}}</div>
				<div class="main-info">
					<div class="price">{{goods.price}}</div>
					<div class="sold-count">已售出{{goods.sold_count}}件</div>
					<cart-icon />
				</div>
			</div>
		</li>
	</ul>
</template>

<script>
	import cartIcon from 'components/cart-icon/index.vue';

	export default {
		name: 'sellingGoods',
		props: {
			data: Array
		},
		components: {
			'cart-icon': cartIcon
		}
	}
</script>

<style lang="stylus">
	.selling-goods__item
		size(187.5px, 260px)
		flex-column()
		justify-content: space-between
		float: left
		box-sizing: border-box
		border-top: 1px solid #E6E6E6
		border-bottom: 1px solid #E6E6E6
		margin-top: -1px
		padding: 0 23px 19px 15px
		&:nth-child(odd)
			border-right: 1px solid #E6E6E6
		.goods
			size(168px, 143px)
			margin-top: 3px
		.info-box
			.name
				font-size: 12px
				color: #333333
				line-height: 17px
				margin-bottom: 11px
				overflow-line(2)
			.main-info
				position: relative
				.price
					font-size: 12px
					font-weight: bold
					color: #FA4A1F
					margin-bottom: 9px
					yuan()
				.sold-count
					font-size: 10px
					color: #B3B3B3
</style>