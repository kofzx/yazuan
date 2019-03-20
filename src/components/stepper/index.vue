<template>
	<div class="stepper-box">
		<div 
			class="minus" 
			:class="{'minus--disabled': minusDisabled}"
			@click="onMinus">-</div>
		<input 
			type="number"
			class="input"
			:maxlength="maxlength" 
			:class="{'input--disabled': disabled}"
			:disabled="disabled"
			:value="value"
			@blur="onBlur">
		<div 
			class="plus" 
			:class="{'plus--disabled': plusDisabled}"
			@click="onPlus">+</div>
	</div>
</template>

<script>
	export default {
		name: 'stepper',
		props: {
			value: Number,
			maxlength: Number,
			disabled: {
				type: Boolean,
				default: false
			},
			min: {
				type: Number,
				default: 1
			},
			max: {
				type: Number,
				default: 99
			},
		},
		computed: {
			minusDisabled () {
				return this.$props.value <= this.$props.min;
			},
			plusDisabled () {
				return this.$props.value >= this.$props.max;
			},
		},
		methods: {
			onMinus () {
				if (this.minusDisabled) return;
				this.$emit('minus');
			},
			onPlus () {
				if (this.plusDisabled) return;
				this.$emit('plus');
			},
			onBlur (e) {
				const value = parseInt(e.mp.detail.value);
				const { min, max } = this.$props;
				if (value < min) {
					this.value = min;
					this.$emit('overlimit', 'min', min);
					return;
				} 
				if (value > max) {
					this.value = max;
					this.$emit('overlimit', 'max', max);
					return;
				}
				this.$emit('blur', e);
			},
		}
	}
</script>

<style>
	.stepper-box {
		width: 110px;
		height: 30px;
		border: 1px solid #D6D6D6;
		border-radius: 2px;
		box-sizing: border-box;
		display: flex;
	}
	.stepper-box .minus,
	.stepper-box .plus {
		width: 30px;
		height: 28px;
		line-height: 28px;
		box-sizing: border-box;
		text-align: center;
		font-size: 16px;
		color: #D6D6D6;
	}
	.stepper-box .minus {
		border-right: 1px solid #D6D6D6;
	}
	.stepper-box .plus {
		border-left: 1px solid #D6D6D6;
	}
	.stepper-box .minus--disabled,
	.stepper-box .plus--disabled {
		color: #efefef;
		background-color: #efefef;
	}
	.stepper-box .input {
		flex: 1;
		height: 28px;
		box-sizing: border-box;
		text-align: center;
		font-size: 16px;
		font-weight: 500;
		font-family: PingFang-SC-Medium;
		color: #333333;
	}
	.stepper-box .input--disabled {
		background-color: #f8f8f8;
	}
</style>