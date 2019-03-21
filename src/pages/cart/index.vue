<template>
	<div>
		<!-- 编辑 -->
		<div class="top-edit--blank">
			<div class="top-edit bkc-white" v-show="cart.length">
				<div class="checkbox">
					<yz-check-icon 
						:checked="checkAll"
						@check="onCheckAll" />
					<img src="../../images/cart/store.png">
					<span class="text">雅钻珠宝服务平台</span>
				</div>
				<span class="edit" @click="isEdit = !isEdit">{{isEdit ? '完成' : '编辑'}}</span>
			</div>
		</div>
		<!-- 空白 -->
		<div v-show="!cart.length"></div>
		<!-- 商品 -->
		<div class="bkc-white" v-show="cart.length">
			<checkbox-group 
				class="shopping-list"
				@change="checkboxChange">
				<div 
					class="shopping-list__item"
					v-for="(item, index) in cart"
					:key="item">
					<label class="label">
						<checkbox
							v-show="false"
							:value="item.good_name"
							:checked="item.checked"></checkbox>
						<yz-check-icon 
							:checked="item.checked"
							@check="onCheck(item.checked, index)" />
					</label>
					<img :src="item.good_img" class="goods">
					<div class="main-box">
						<div class="desc" :style="[isEdit ? 'display: none' : 'display: flex']">
							<div class="title">{{item.good_name}}</div>
							<div class="parameters">规格：25K纯金</div>
						</div>
						<div class="desc" :style="[isEdit ? 'display: flex' : 'display: none']">
							<yz-stepper
								:value="item.good_num"
								:max="50"
								:maxlength="2"
								@minus="onChangeNum('minus', index)"
								@plus="onChangeNum('plus', index)"
								@blur="onBlurNum($event, index)" />
						</div>
						<div class="info">
							<span class="price">{{item.price}}</span>
							<span class="count" :style="[isEdit ? 'display: none' : 'display: block']">{{item.good_num}}</span>
						</div>
					</div>
					<div 
						class="del-box" 
						:style="[isEdit ? 'display: flex' : 'display: none']"
						@click="onDel(index)">删除</div>
				</div>
			</checkbox-group>
		</div>
		<!-- 提交栏 -->
		<yz-submit-bar
			:show="cart.length"
			:price="totalPrice"
			:buttonText="'结算(' + cartNums + ')'">
			<div class="my-checkbox">
				<yz-check-icon 
					:checked="checkAll"
					@check="onCheckAll" />
				<span class="text">全选</span>
			</div>
		</yz-submit-bar>
	</div>
</template>

<script>
	import Storage from 'utils/Storage';
	import submitBar from 'components/submit-bar/index.vue';
	import checkIcon from 'components/check-icon/index.vue';
	import stepper from 'components/stepper/index.vue';

	export default {
		name: 'cart',
		data () {
			return {
				cart: [],
				checkAll: false,
				isEdit: false,
			}
		},
		computed: {
			// 购物车商品数量
			cartNums () {
				let cart = this.cart;
				let totalNums = 0;

				cart.length && cart
								.filter(item => item.checked)
								.forEach(item => totalNums += item.good_num);
				return totalNums;
			},
			// 总价
			totalPrice () {
				let cart = this.cart;
				let _totalPrice = 0;

				cart
					.filter(item => item.checked)
					.forEach(item => _totalPrice += item.good_num * item.price);
				return _totalPrice;
			},
		},
		methods: {
			/**
			 * 更新cart数据
			 * @private
			 * @param  index: Number 待改变项的索引
			 * @param  field: String 待改变项字段名
			 * @param  value: Number 改变的值
			 */
			_setCart (index, field, value) {
				let cart = this.cart;

				this.$set(cart[index], field, value);
				this.$set(cart, index, cart[index]);
				Storage.set('cart', cart);
			},
			// checkbox的监听改变事件
			checkboxChange (e) {
				const check_len = e.mp.detail.value.length;
				const cart_len = this.cart.length;

				this.checkAll = check_len === cart_len;
			},
			// checkbox的选中事件
			onCheck (checked, index) {
				this._setCart(index, 'checked', !checked);
			},
			/**
			 * 检查更新checkAll的状态，一般用于onShow
			 * @private
			 */
			_checkAll () {
				let cart = this.cart;
				this.checkAll = cart.every(item => item.checked === true);
			},
			/**
			 * 更改所有checkbox的状态，一般在“全选”使用
			 * @private
			 * @param  checked: Boolean 即checked的值
			 */
			_changeAll (checked) {
				let cart = this.cart;

				for (let i = 0; i < cart.length; i++) {
					this.$set(cart[i], 'checked', checked);
				}
			},
			// 全选事件
			onCheckAll () {
				let checkAll = this.checkAll;

				this._changeAll(!checkAll);
				this.checkAll = !checkAll;
			},
			// 增减商品数量
			onChangeNum (type, index) {
				let cart = this.cart;
				let good_num = cart[index].good_num;

				switch (type) {
					case 'minus':
						good_num -= 1;
						break;
					case 'plus':
						good_num += 1;
						break;
				}
				this._setCart(index, 'good_num', good_num);
			},
			// 输入框确认事件
			onBlurNum (e, index) {
				const value = parseInt(e.mp.detail.value);
				let cart = this.cart;

				this._setCart(index, 'good_num', value);
			},
			// 删除事件
			onDel (index) {
				console.log('onDel');
				let cart = this.cart;

				cart.splice(index, 1);
				Storage.set('cart', cart);
				this._onShow();
			},
			_onShow () {
				Storage
					.get('cart')
					.then(data => {
						this.cart = data;
						this._checkAll();
					});
			},
		},
		onShow () {
			this._onShow();
		},
		components: {
			'yz-submit-bar': submitBar,
			'yz-check-icon': checkIcon,
			'yz-stepper': stepper,
		}
	}
</script>

<style lang="stylus">
	bold-font()
		font-size: 14px
		font-weight: bold
	
	// 顶部编辑
	.top-edit--blank
		height: 50px
	.top-edit
		size(375px, 50px)
		flex-row()
		justify-content: space-between
		padding: 0 15px
		position: fixed
		top: 0
		left: 0
		z-index: 10
		.checkbox
			flex-row()
			img
				size(16.5px, 15px)
				margin-left: 11px
				margin-right: 5.5px
			.text
				bold-font()
				color: $theme-black
		.edit
			font-size: 13px
			color: #3388FF
	// 商品清单
	$shopping-list__item-height = 120px
	.shopping-list__item
		height: $shopping-list__item-height
		border-top: 1px solid #E6E6E6
		padding: 0 15px
		flex-row()
		justify-content: space-between
		position: relative
		.label
			display: flex
			size(18px, 18px)
		.goods
			size(78px, 85px)
			margin: 0 15px
		.main-box
			flex: 1
			height: 69px
			flex-column()
			justify-content: space-between
			align-items: flex-start
			.desc
				height: 43px
				flex-column()
				justify-content: space-between
				align-items: flex-start
			.title
				font-size: 14px
				color: $theme-black
				overflow-line(1)
			.parameters
				font-size: 12px
				color: #666666
			.info
				width: 100%
				flex-row()
				justify-content: space-between
				.price
					font-size: 14px
					color: $active-red
					yuan()
					&::before
						font-size: 1em
						margin-right: 2px
				.count
					font-size: 12px
					color: #666666
					count()
		.del-box
			size(70px, $shopping-list__item-height - 1)
			flex-row()
			background-color: $theme-gold
			font-size: 14px
			color: #96580A
			position: absolute
			top: 0
			right: 0
	.my-checkbox
		float: left
		line-height: 55px
		.check-icon,
		.check-icon--unchecked
			position: relative
			top: 5px
			margin-left: 15px
		.text
			bold-font()
			color: $theme-black
			margin-left: $margin-m
</style>