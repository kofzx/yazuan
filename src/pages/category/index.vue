<template>
	<div class="page" catchtouchmove="ture">
		<scroll-view
			:scroll-y="true"
			class="categories">
			<div 
				class="cate"
				:class="{ active: cate.id === cateActive }"
				v-for="cate in cates"
				:key="cate"
				@click="cateChange(cate.id)">
				{{cate.type_name}}
			</div>
			<div class="cate cate--hack"></div>
		</scroll-view>
		<scroll-view
			:scroll-y="true"
			class="contents bkc-white">
			<!-- 一级分类横条图片 -->
			<div class="cate-pic-box">
				<div class="short-line"></div>
				<span class="cate-name">{{cateObject.name}}</span>
				<div class="short-line"></div>
				<img :src="cateObject.pic" class="cate-pic">
			</div>
			<block
				v-for="(first_cat, first_cat_index) in contents"
				:key="first_cat">
				<!-- 二级分类 -->
				<div class="contents__child">
					<!-- 二级分类名 -->
					<div class="cate-name">{{first_cat.type_name}}</div>
					<!-- 主体内容 -->
					<div 
						class="contents__grandson__item"
						v-for="(second_cat, second_cat_index) in first_cat.good"
						:key="second_cat">
						<img :src="second_cat.cover" class="pic">
						<div class="main-info">
							<div class="name">{{second_cat.good_name}}</div>
							<span class="price">{{second_cat.price}}</span>
							<yz-cart-icon 
								size="mini"
								@click="addToCart($event, second_cat, second_cat_index)" />
						</div>
					</div>
				</div>
			</block>
			<div class="contents__grandson__item--hack"></div>
		</scroll-view>
		<yz-cart-fixed :num="cartNums" />
		<div 
			class="ball"
			v-for="ball in balls"
			:key="ball"
			:style="[ ball.inited ? 'transition: transform 0.5s ease-in; transform: translate3d(0, ' + offsetY + 'px,0); top: ' + ballY + 'px;' : '' ]">
			<span 
				class="inner"
				:style="[ ball.inited ? 'transition: transform 0.5s linear; transform: translate3d( ' + offsetX + 'px,0,0); left: ' + ballX + 'px; opacity: 1;' : '' ]"></span>
		</div>
	</div>
</template>

<script>
	import { get } from 'api';
	import Storage from 'utils/Storage'
	import throttle from 'utils/throttle';
	import cartIcon from 'components/cart-icon/index.vue';
	import cartFixed from 'components/cart-fixed/index.vue';

	const BALLS_LENGTH = 5,
		  BALL_HALF = 10;
	function getBalls() {
		let balls = [];
		for (let i = 0; i < BALLS_LENGTH; i++) {
			balls.push({ inited: false });
		}
		return balls;
	}

	export default {
		name: '',
		data () {
			return {
				cates: [],
				contents: [],
				cateObject: {},
				cateActive: 1,
				cartBasketRect: {},		// 购物车篮的rect信息
				offsetX:0,
				offsetY: 0,
				ballX: 0,
				ballY: 0,
				balls: getBalls(),
				cart: 0,
			}
		},
		computed: {
			cartNums () {
				let cart = this.cart;
				let totalNums = 0;

				cart.length && cart.forEach(item => totalNums += item.good_num);
				return totalNums;
			}
		},
		methods: {
			/**
			 * 设置active项目，除了设置id以外，还需要更新一级分类名称及图片
			 * @private
			 * @param id: Number 分类id
			 */
			_setActive (id) {
				this.cateActive = id;
				const index = this.cates.findIndex(cate => cate.id === id);

				this.$set(this.cateObject, "name", this.cates[index].type_name);
				this.$set(this.cateObject, "pic", this.cates[index].iocn);
			},
			// 分类点击事件
			cateChange (id) {
				this._setActive(id);
				this.loadContents(id);
			},
			// 加载分类
			loadCates () {
				return new Promise(resolve => {
					get('good/type', { pid: 0 })
						.then(res => {
							this.cates = res.data;
							resolve(res.data[0].id);
						})
				})
			},
			// 加载右侧主体内容
			loadContents (id) {
				get('good/typegood', { id: id })
					.then(res => {
						this.contents = res.data;
					})
			},
			/**
			 * 更新good_num商品数量
			 * @private
			 * @param  item: Object 商品条目
			 * @return item: Object 商品条目
			 */
			_updateGoodNum (item) {
				if (item.hasOwnProperty('good_num')) {
					item.good_num += 1;
				} else {
					item.good_num = 1;
				}
				return item;
			},
			// 添加购物车
			addToCart: throttle(function(e, item, index) {
				const ballX = e.mp.touches[0].clientX - BALL_HALF,
					  ballY = e.mp.touches[0].clientY - BALL_HALF,
					  cartX = this.cartBasketRect.left,
					  cartY = this.cartBasketRect.top;

				if (ballY > cartY) return false;

				this.ballX = ballX;
				this.ballY = ballY;

				this.offsetX = -Math.abs(cartX - ballX + BALL_HALF);
				this.offsetY = Math.abs(cartY - ballY - BALL_HALF);

				for (let i = 0; i < BALLS_LENGTH; i++) {
					const ball = this.balls[i];
					if (!ball.inited) {
			            ball.inited = true;

						setTimeout(async () => {
							ball.inited = false;
							// 购物车数量+1
							const updateItem = this._updateGoodNum(item);
							let cart = await Storage.get('cart');
							if (cart.length > 0) {
								cart[index] = updateItem;
							} else {
								cart.push(updateItem);
							}
							
							this.cart = cart;
							Storage.set('cart', cart);
						}, 500);
			            break;
			        }
				}
			}, 500),
			// 获取购物车蓝的坐标信息
			getBasketRect () {
				return new Promise(resolve => {
					wx.createSelectorQuery()
						.selectAll('.cart-basket')
						.boundingClientRect(rects => {
				      		rects.map(rect => {
				      			resolve(rect);
				      		});
				    	}).exec();
				})
			},
		},
		async onLoad () {
			let cate_id = await this.loadCates();
			this._setActive(cate_id);
			this.loadContents(cate_id);
			this.cartBasketRect = await this.getBasketRect();
		},
		onShow () {
			Storage
				.get('cart')
				.then(data => {
					this.cart = data;
				})
		},
		components: {
			'yz-cart-icon': cartIcon,
			'yz-cart-fixed': cartFixed,
		}
	}
</script>

<style lang="stylus">
	$contents__grandson__item-h = 79.5px
	// 左侧分类
	.categories
		size(85px, 667px)
		display: inline-block
		.cate
			size(85px, 60px)
			line-height: 60px
			text-align: center
			font-size: 13px
			color: #666666
			box-sizing: border-box
			border-left: 3px solid transparent
			&.active
				color: $theme-gold
				background-color: $white
				border-left-color: $theme-gold
			&.cate--hack
				height: @height * 2
	// 右侧分类信息
	.contents
		size(290px, 667px)
		display: inline-block
		padding-left: 10px
		padding-right: 15px
		box-sizing: border-box
		.cate-pic-box
			size(265px, 90px)
			border-radius: 6px
			overflow: hidden
			margin-top: $margin-m
			position: relative
			flex-row()
			.cate-name
				font-size: 16px
				font-weight: bold
				color: $white
				margin: 0 $margin-x
				z-index: 1
			.short-line
				width: 33.5px
				border-top: 2px solid $white
				z-index: 1
			.cate-pic
				full()
				position: absolute
				top: 0
				left: 0
		.contents__child
			margin-top: 14.5px
			.cate-name
				font-size: 12px
				color: #999999
			.contents__grandson__item
				flex-row()
				align-items: stretch
				margin-top: 22px
				.pic
					size(79.5px, $contents__grandson__item-h)
					margin-right: 12px
				.main-info
					flex: 1
					flex-column()
					justify-content: space-between
					align-items: flex-start
					position: relative
					.name
						font-size: 14px
						font-weight: bold
						color: $theme-black
						overflow-line(2)
					.price
						font-size: 11px
						font-weight: bold
						color: $active-red
						yuan()
						&::before
							margin-right: 6px
	.contents__grandson__item--hack
		height: $contents__grandson__item-h * 1.5
	.cart-icon
		right: 0
		bottom: -5px
		z-index: 1
	.ball
		position: fixed
		.inner
			position: fixed
			size(20px, 20px)
			display: block
			background-color: lightpink
			border-radius: 50%
			opacity: 0
</style>