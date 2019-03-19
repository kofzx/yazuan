<template>
    <div class="total-box clearfix" v-show="show">
    	<slot />
    	<div class="total-box--blank">
    		<div class="settlement">{{buttonText}}</div>
			<div class="total">
				<span class="text">{{label}}</span>
				<span class="price">{{price}}</span>
			</div>
    	</div>
	</div>
</template>

<script>
    export default {
		name: 'submitBar',
		props: {
			show: Boolean,
			label: {
				type: String,
				default: '合计： '
			},
			price: Number,
			buttonText: String
		}
	}
</script>

<style>
	.clearfix::before, 
	.clearfix::after {
		display:table; 
		content:""; 
		clear:both;
	}
	.total-box--blank {
		height: 55px;
	}
    .total-box {
		width: 375px;
		height: 55px;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #ffffff;
    }
    .total-box .total,
    .total-box .settlement {
		float: right;
    }
    .total-box .total {
    	line-height: 55px;
    }
    .total-box .total .text {
    	font-size: 14px;
		font-weight: bold;
		color: #3B3B3B;
    }
    .total-box .total .price {
    	font-size: 16px;
		font-weight: bold;
		color: #FA4A1F;
    }
    .total-box .total .price::before {
    	content: '￥';
		font-size: 1em;
		margin-right: 2px;
    }
    .total-box .settlement {
    	width: 105px;
		height: 55px;
		line-height: 55px;
		text-align: center;
		font-size: 14px;
		font-weight: bold;
		color: #96580A;
		background-color: #ECB85E;
		margin-left: 15px;
    }
</style>