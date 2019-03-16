<template>
	<span 
		class="cart-icon" 
		:class="['cart-icon--' + size, 'cartIcon' + id]"
		@click="onClick"></span>
</template>

<script>
	export default {
		name: 'cartIcon',
		props: {
			size: {
				type: String,
				default: "normal"
			},
			id: String | Number,
		},
		methods: {
			onClick () {
				this.$emit("click");
			}
		}
	}
</script>

<style lang="stylus">
	.cart-icon
		display: inline-block
		position: absolute
		background-color: #FFF5E5
		border-radius: 50%
		&::before
			content: ''
			vh-center()
			bg-image($red-cart)
	.cart-icon--normal
		size(28px, 28px)
		&::before
			size(12px, 12px)
	.cart-icon--mini
		size(24px, 24px)
		&::before
			size(10px, 10px)
</style>