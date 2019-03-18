<template>
	<span 
		class="badge" 
		:class="{ 'badge--9plus': getCount === '9+' }"
		v-if="getCount">{{getCount}}</span>
</template>

<script>
	export default {
		name: 'badge',
		props: {
			num: {
				type: Number | String,
				default: 0
			} 
		},
		computed: {
			getCount () {
				const count = this.$props.num;
				const count_int = parseInt(count);
				return count_int > 9 ? '9+' : count_int;
			}
		}
	}
</script>

<style>
	.badge {
		width: 17px;
		height: 17px;
		line-height: 17px;
		background: #FA4A1F;
		border-radius:50%;
		text-align: center;
		font-family: PingFang-SC-Bold;
		font-size: 11px;
		font-weight: bold;
		color: #ffffff;
		transition: width 0.2s ease;
	}
	.badge--9plus {
		width: 20px;
	}
</style>