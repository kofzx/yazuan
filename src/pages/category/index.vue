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
				{{cate.name}}
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
					<div class="cate-name">{{first_cat.name}}</div>
					<!-- 主体内容 -->
					<div 
						class="contents__grandson__item"
						v-for="(second_cat, second_cat_index) in first_cat.child"
						:key="second_cat">
						<img :src="second_cat.pic" class="pic">
						<div class="main-info">
							<div class="name">{{second_cat.name}}</div>
							<span class="price">{{second_cat.price}}</span>
							<yz-cart-icon 
								size="mini"
								:id="second_cat.id"
								@click="addToCart" />
						</div>
					</div>
				</div>
			</block>
			<div class="contents__grandson__item--hack"></div>
		</scroll-view>
		<div class="cart-basket"></div>
		<div 
			class="ball"
			:animation="animationY"
			:style="[ 'top: ' + ballY + 'px'  ]">
			<span 
				class="inner"
				:animation="animationX"
				:style="[ 'left: ' + ballX + 'px'  ]"></span>
		</div>
	</div>
</template>

<script>
	import data from './data';
	import cartIcon from 'components/cart-icon/index.vue';

	export default {
		name: '',
		data () {
			return {
				cates: data.cates,
				categories: data.categories,
				contents: [],
				cateObject: {},
				cateActive: 1,
				contentActive: 0,
				cartBasketRect: {},		// 购物车篮的rect信息
				inited: false,
				ballX: 0,
				ballY: 0,
			}
		},
		methods: {
			_setActive (id) {
				this.cateActive = id;
				const index = this.cates.findIndex(cate => cate.id === id);

				this.$set(this.cateObject, "name", this.cates[index].name);
				this.$set(this.cateObject, "pic", this.cates[index].pic);
			},
			// 分类点击事件
			cateChange (id) {
				this._setActive(id);
				this.loadContents(id);
			},
			// 加载右侧内容
			loadContents (id) {
				wx.request({
					url: "http://www.localtest_yazuan.com/category.php?id=" + id,
					success: res => {
						this.contents = res.data;
					}
				});
			},
			// 添加购物车
			addToCart (e) {
				const ballX = e.mp.touches[0].clientX,
			          ballY = e.mp.touches[0].clientY;
			    this.createAnimation(ballX, ballY);
			},
			createAnimation (ballX, ballY) {
				let bottomX = this.cartBasketRect.left + this.cartBasketRect.width / 2 - 10,
			        bottomY = this.cartBasketRect.top,
			        animationX = this.flyX(bottomX, ballX),      // 创建小球水平动画
			        animationY = this.flyY(bottomY, ballY);       // 创建小球垂直动画

			    this.ballX = ballX;
			    this.ballY = ballY;
			    this.inited = true;

			    this.setDelayTime(100).then(() => {
			      // 100ms延时,  确保小球已经显示
			      this.animationX = animationX.export();
			      this.animationY = animationY.export();
			      // 400ms延时, 即小球的抛物线时长
			      return this.setDelayTime(400);
			    }).then(() => {
			    	this.animationX = this.flyX(0, 0, 0).export();
			    	this.animationY = this.flyY(0, 0, 0).export();
			    	this.inited = false;
			    })
			},
			setDelayTime(sec) {
			    return new Promise((resolve, reject) => {
			      setTimeout(() => {resolve()}, sec)
			    });
			},
			flyX (bottomX, ballX, duration = 400) {
			    let animation = wx.createAnimation({
			      duration: duration,
			      timingFunction: 'linear',
			    })
			    animation.translateX(bottomX - ballX).step();
			    return animation;
			},
			flyY (bottomY, ballY, duration = 400) {
			    let animation = wx.createAnimation({
			      duration: duration,
			      timingFunction: 'ease-in',
			    })
			    animation.translateY(bottomY - ballY).step();
			    return animation;
			},
			/**
			 * 获取对应className的rect信息
			 * @return rect
			*/
			getRect (className) {
				return new Promise(resolve => {
					wx.createSelectorQuery()
						.selectAll('.' + className)
						.boundingClientRect(rects => {
				      		rects.map(rect => {
				      			resolve(rect);
				      		});
				    	}).exec();
				})
			},
			async getCartBasketRect () {
				return this.getRect('cart-basket');
			}
		},
		async onLoad () {
			this._setActive(1);
			this.loadContents(1);
			this.cartBasketRect = await this.getCartBasketRect();
		},
		components: {
			'yz-cart-icon': cartIcon
		}
	}
</script>

<style lang="stylus">
	$contents__grandson__item-h = 79.5px
	.show 
		display: block !important
	.hide 
		display: none !important
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
				color: #ECB85E
				background-color: #ffffff
				border-left-color: #ECB85E
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
				color: #FFFFFF
				margin: 0 $margin-x
				z-index: 1
			.short-line
				width: 33.5px
				border-top: 2px solid #FFFFFF
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
						color: #333333
						overflow-line(2)
					.price
						font-size: 11px
						font-weight: bold
						color: #FA4A1F
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
			display: inline-block
			size(20px, 20px)
			background-color: red
			border-radius: 50%
	.cart-basket
		size(48px, 48px)
		position: fixed
		right: 36px
		bottom: 43px
		box-shadow: 0px -4px 16px 0px rgba(39,39,39,0.15), 0px 7px 16px 0px rgba(39,39,39,0.15)
		border-radius: 50%
		background-color: #ffffff
</style>