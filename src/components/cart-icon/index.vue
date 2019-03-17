<template>
	<span 
		class="cart-icon" 
		:class="['cart-icon--' + size]"
		@click="onClick"></span>
</template>

<script>
	export default {
		name: 'cartIcon',
		props: {
			size: {
				type: String,
				default: "normal"
			}
		},
		methods: {
			onClick (e) {
				this.$emit("click", e);
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