<template>
	<div 
		class="theme-title-box"
		:style="styles">
		<img src="./theme-left.png" class="theme-title__left-pic">
		<span class="theme-title__text">{{title}}</span>
		<img src="./theme-right.png" class="theme-title__right-pic">
	</div>
</template>

<script>
	export default {
		name: 'themeTitle',
		props: {
			title: {
				type: String,
				required: true
			},
			marginTop: {
				type: Number,
				default: 0
			},
			marginBottom: {
				type: Number,
				default: 0
			}
		},
		computed: {
			styles () {
				const { marginTop, marginBottom } = this.$props;
				return `margin-top: ${marginTop}px; margin-bottom: ${marginBottom}px;`;
			}
		}
	}
</script>

<style>
	.theme-title-box {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.theme-title__left-pic,
	.theme-title__right-pic {
		width: 14px;
		height: 14px;
	}
	.theme-title__text {
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		font-size: 15px;
		color: #ECB85E;
		margin: 0 3.5px;
	}
</style>