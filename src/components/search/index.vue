<template>
	<div class="search-box">
	  <form>
	    <div class="wrapper">
	      <img class="search-icon" src="./search.png" />
	      <input 
	      	class="input" 
	      	:placeholder="plc"
	      	placeholder-class="plc"
	      	@confirm="searchSubmit" 
	      	confirm-type="search" />
	    </div>
	  </form>
	</div>
</template>

<script>
	export default {
		name: 'search',
		props: {
			plc: {
				type: String,
				default: '请输入内容'
			}
		},
		methods: {
			searchSubmit (e) {
				this.$emit("searchSubmit", e);
			}
		}
	}
</script>

<style lang="stylus">
	.search-box
		width: 100%
		height: 46px
		background: #ffffff
		display: flex
		form
			width: 100%
			.wrapper 
				width: 92%
				height: 33px
				line-height: 33px
				background: #F4F4F4
				margin-top: 14px
				margin-left: auto
				margin-right: auto
				border-radius: 16px
				position: relative
				.search-icon
					width: 31rpx
					height: 31rpx
					float: left
					margin-left: 20px
					position: absolute
					top: 20rpx
					left: 0rpx
				.input
					width: 86.5%
					height: 33px
					font-size: 13px
					float: right
				.plc
					color: #B3B3B3
</style>