<template>
	<div class="cart-basket">
		<img src="./fixed-cart.png" class="cart-basket__icon">
		<badge :num="num" />
	</div>
</template>

<script>
	import badge from 'components/badge/index.vue';

	export default {
		name: 'cartFixed',
		props: {
			num: Number | String
		},
		components: {
			'badge': badge
		}
	}
</script>

<style lang="stylus">
	.cart-basket
		size(48px, 48px)
		position: fixed
		right: 16px
		bottom: 43px
		box-shadow: 0px -4px 16px 0px rgba(39,39,39,0.15), 0px 7px 16px 0px rgba(39,39,39,0.15)
		border-radius: 50%
		background-color: #ffffff
		z-index: 1
		.badge
			position: absolute
			top: -5px
			right: 0
	.cart-basket__icon
		size(17px, 17px)
		vh-center()
</style>