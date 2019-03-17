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
			:class="[ inited ? 'show' : 'hide' ]"
			:style="[ 'left: ' + bus_x + 'px; top: ' + bus_y + 'px;']"></div>
	</div>
</template>

<script>
	import data from './data';
	import util from 'utils';
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
				bus_x: null,
				bus_y: null,
				finger: {},
				busPos: {},

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
				this.contentActive = e.mp.currentTarget.id;

				var topPoint = {};
			    this.finger['x'] = e.touches["0"].clientX;//点击的位置
			    this.finger['y'] = e.touches["0"].clientY;

			    if (this.finger['y'] < this.busPos['y']) {
			      topPoint['y'] = this.finger['y'] - 150;
			    } else {
			      topPoint['y'] = this.busPos['y'] - 150;
			    }
			    topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2;

			    if (this.finger['x'] > this.busPos['x']) {
			      topPoint['x'] = (this.finger['x'] - this.busPos['x']) / 2 + this.busPos['x'];
			    } else {
			      topPoint['x'] = (this.busPos['x'] - this.finger['x']) / 2 + this.finger['x'];
			    }

			    this.linePos = util.bezier([this.busPos, topPoint, this.finger], 50);
			    this.startAnimation(e);
			},
			startAnimation (e) {
			    var index = 0, that = this,
			      bezier_points = that.linePos['bezier_points'];
			    var delay = 35;

			    this.inited = true;
			    this.bus_x = that.finger['x'];
			    this.bus_y = that.finger['y'];
			    var len = bezier_points.length;
			    index = len;
			    this.timer = setInterval(function () {
			      for(let i = index - 1; i > -1; i--) {
			      	setTimeout(() => {
			      		that.bus_x = bezier_points[i]['x'];
			        	that.bus_y = bezier_points[i]['y'];
			      	}, delay);

			        if (i < 1) {
			          clearInterval(that.timer);
			          setTimeout(() => {
			          	that.inited = false;
			          }, delay * 10)
			        }
			      }
			    }, delay);
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

			this.busPos['x'] = this.cartBasketRect.left + this.cartBasketRect.width / 2 - 10;
    		this.busPos['y'] = this.cartBasketRect.top;
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
		display: inline-block
		size(20px, 20px)
		position: fixed
		left: 50%
		top: 50%
		overflow: hidden
		z-index: 1
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