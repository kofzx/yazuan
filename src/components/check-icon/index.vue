<template>
	<block>
		<span 
			class="check-icon" 
			:style="[checked ? 'display: inline-block' : 'display: none']"
			@click="onCheck(checked)"></span>
		<span 
			class="check-icon--unchecked" 
			:style="[checked ? 'display: none' : 'display: inline-block']"
			@click="onCheck(checked)"></span>
	</block>
</template>

<script>
	export default {
		name: 'checkIcon',
		props: {
			checked: Boolean
		},
		methods: {
			onCheck () {
				this.$emit('check');
			}
		}
	}
</script>

<style lang="stylus">
	.check-icon,
	.check-icon--unchecked
		display: inline-block
		size(18px, 18px)
		box-sizing: border-box
		position: relative
		click-area-increase(40px)
	.check-icon
		bg-image($check)
	.check-icon--unchecked
		border: 1px solid rgb(217,205,211)
		border-radius: 50%
</style>