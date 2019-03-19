<template>
	<div>
		<!-- 轮播 -->
		<div class="rel bkc-white">
			<swiper
				class="corner-swiper"
				:autoplay="true"
				:current="swiperCurrent"
				@change="swiperChange">
				<swiper-item 
					class="corner-swiper__item"
					v-for="img in 3"
					:key="img">
					<img src="../../images/index/banner.png">
				</swiper-item>
			</swiper>
			<div class="dots"> 
	          <block 
	          	v-for="(img, img_index) in 3" 
	          	:key="img"> 
	            <div 
	            	class="dot"
					:class="{ active: img_index == swiperCurrent }"></div> 
	          </block> 
	        </div>
		</div>
		<!-- 陈述信息 -->
		<div class="statement-tag-box bkc-white">
			<img src="../../images/index/logo.png" class="logo">
			<div class="statement-tags">
				<block
					v-for="tag in statementTags"
					:key="tag">
					<!-- <img src="../../images/index/tick.png" class="tick"> -->
					<span class="tick"></span>
					<span class="text">{{tag}}</span>
				</block>
			</div>
		</div>
		<!-- 分类导航 -->
		<div class="category-nav-box bkc-white">
			<a 
				href="" 
				class="category-nav flex-1"
				v-for="cat in categories"
				:key="cat">
				<img :src="cat.img" class="cat-img">
				<span class="cat-name">{{cat.name}}</span>
			</a>
		</div>
		<!-- 新品上市 -->
		<div class="new-product-box">
			<img src="../../images/index/new-product-bg.jpg" class="new-product-box__bg">
			<yz-theme-title 
				title="新品上市" 
				margin-top="18" 
				margin-bottom="14" />
			<div class="new-products">
				<div 
					class="new-products__item"
					v-for="product in products"
					:key="product">
					<img :src="product.img" class="product">
					<div class="bottom-box rel">
						<div class="name">{{product.name}}</div>
						<span class="cart"></span>
						<img src="../../images/index/product-item-bg.png" class="bg">
					</div>
				</div>
			</div>
		</div>
		<!-- 珠宝热卖 -->
		<div class="jewelry-selling-box">
			<div class="title-box bkc-white">
				<yz-theme-title title="珠宝热卖" />
			</div>
			<selling-goods :data="sellingGoods" />
			<div class="more-box bkc-white" @click="goGoodsList">
				<span class="text">查看更多</span>
				<span class="more"></span>
			</div>
		</div>
		<!-- 尊享定制 -->
		<div class="customize-box bkc-white">
			<yz-theme-title
				title="尊享定制"
				margin-top="14.5"
				margin-bottom="13.5" />
			<img src="../../images/index/customize.png" class="customize">
		</div>
		<!-- 探索雅钻 -->
		<div class="explore-box bkc-white">
			<yz-theme-title 
				title="探索雅钻"
				margin-top="15"
				margin-bottom="15" />
			<div class="explore-video">
				<txv-video 
					vid="e0354z3cqjp" 
					playerid="txv1"
					object-fit="fill"
					:controls="showControls"
					:showCenterPlayBtn="false">
					<img 
						src="../../images/index/play.png" 
						class="playBtn"
						v-show="showCustomPlayBtn"
						@click="onPlay">
				</txv-video>
			</div>
		</div>
		<yz-cart-fixed :num="cartNums" />
	</div>
</template>

<script>
	import Storage from 'utils/Storage'
	import themeTitle from 'components/theme-title/index.vue';
	import sellingGoods from 'templates/selling-goods.vue';
	import cartFixed from 'components/cart-fixed/index.vue';

	export default {
		name: 'index',
		data () {
			return {
				swiperCurrent: 0,
				statementTags: ['质量保证', '服务保证', '售后无忧'],
				cartNums: 0,
				categories: [
					{ img: require('../../images/index/cat1.png'), name: '戒指' },
					{ img: require('../../images/index/cat2.png'), name: '项链' },
					{ img: require('../../images/index/cat3.png'), name: '耳坠' },
					{ img: require('../../images/index/cat4.png'), name: '手镯' },
					{ img: require('../../images/index/cat5.png'), name: '吊坠' },
				],
				products: [
					{ img: require('../../images/index/product1.png'), name: '翡翠戒指' },
					{ img: require('../../images/index/product2.png'), name: '美国新品吊饰' },
					{ img: require('../../images/index/product3.png'), name: '新品翡翠耳环' },
					{ img: require('../../images/index/product4.png'), name: '青春品牌手链' },
					{ img: require('../../images/index/product5.png'), name: '精品项链' },
					{ img: require('../../images/index/product6.png'), name: '新品翡翠耳环' },
				],
				sellingGoods: [
					{
						img: require('../../images/index/selling1.png'),
						name: 'ENDLESS LOVE 系列无限爱恋男戒',
						price: 5800,
						sold_count: 866
					},
					{
						img: require('../../images/index/selling2.png'),
						name: 'ENDLESS LOVE 系列无限爱恋男戒',
						price: 9800,
						sold_count: 866
					},
					{
						img: require('../../images/index/selling3.png'),
						name: 'ENDLESS LOVE 系列无限爱恋男戒',
						price: 5800,
						sold_count: 866
					},
					{
						img: require('../../images/index/selling4.png'),
						name: 'ENDLESS LOVE 系列无限爱恋男戒',
						price: 9800,
						sold_count: 866
					},
				],
				showControls: false,
				showCustomPlayBtn: true,
			}
		},
		methods: {
			swiperChange (e) {
				this.swiperCurrent = e.mp.detail.current;
			},
			onPlay () {
				const TxvContext = requirePlugin("tencentvideo");  
				let txvContext = TxvContext.getTxvContext('txv1');
				txvContext.play();

				this.showCustomPlayBtn = false;
				this.showControls = true;
			},
			goGoodsList () {
				wx.navigateTo({
					url: '../goods-list/main'
				});
			}
		},
		onShow () {
			Storage
				.get('cartNums')
				.then(data => {
					this.cartNums = data;
				})
		},
		components: {
			'yz-theme-title': themeTitle,
			'yz-cart-fixed': cartFixed,
			'selling-goods': sellingGoods,
		}
	}
</script>

<style lang="stylus">
	// 轮播
	.corner-swiper,
	.corner-swiper__item
		size(375px, 195px)
	.corner-swiper__item
		img
			full()
	.dots 
		position: absolute 
		left: 0 
		right: 0 
		bottom: 13px
		flex-row()
		.dot
			size(7px, 7px)
			margin: 0 $margin-s
			background-color: $white 
			border-radius: 50%
			&.active 
				background-color: $theme-gold
	// 陈述信息
	.statement-tag-box
		flex-row()
		justify-content: space-between
		padding: 14px 15px 13px 15px
		.logo
			size(77px, 18px)
	.statement-tags
		flex-row()
		.tick
			size(10px, 10px)
			display: inline-block
			margin-left: $margin-xx
			margin-right: 4px
			bg-image($tick)
		.text
			font-size: 11px
			color: $theme-black
	// 分类导航
	.category-nav-box
		size(375px, 110px)
		flex-row()
	.category-nav
		flex-column()
		.cat-img
			size(52px, 52px)
			margin-bottom: $margin-x
		.cat-name
			font-size: 12px
			color: $theme-black
			max-width: 60px
			overflow-line(1)
	// 新品上市
	.new-product-box
		size(375px, 367px)
		position: relative
		margin-top: $margin-m
		padding-bottom: 5px
		overflow: hidden
	.new-product-box__bg
		position: absolute
		z-index: -3
		full()
	.new-products
		flex-row()
		flex-wrap: wrap
		justify-content: space-between
		padding: 0 15px
	.new-products__item
		flex-column()
		justify-content: space-between
		size(110px, 150px)
		flex: 0 0 110px
		background-color: $white
		margin-bottom: 7.5px
		z-index: -2
		.product
			size(90px, 90px)
			margin-top: $margin-s
		.bottom-box
			size(110px, 53px)
			text-align: center
		.name
			font-size: 11px
			font-weight: bold
			color: $theme-black
			margin-top: 13px
			margin-bottom: $margin-s
			margin-left: auto
			margin-right: auto
			z-index: 2
			max-width: 88px
			overflow-line(1)
		.cart
			display: inline-block
			size(18px, 18px)
			background-color: $active-red
			border-radius: 50%
			position: relative
			&::before
				content: ''
				size(8px, 8px)
				vh-center()
				bg-image($white-cart)
		.bg
			position: absolute
			full()
			left: 0
			bottom: 0
			z-index: -1
	// 珠宝热卖
	.jewelry-selling-box
		margin-top: $margin-m
		.title-box
			flex-row()
			size(375px, 50px)
		.more-box
			flex-row()
			size(375px, 45px)
			.text
				font-size: 12px
				color: $theme-black
				margin-right: 6.5px
			.more
				size(13px, 13px)
				bg-image($more)
	// 尊享定制
	.customize-box		
		size(375px, 198px)
		flex-column()
		justify-content: flex-start
		margin-top: $margin-m	
		.customize	
			size(345px, 140px)
			border-radius: 10px
	// 探索雅钻
	.explore-box
		size(375px, 248px)
		flex-column()
		justify-content: flex-start
		margin-top: $margin-m	
		margin-bottom: $margin-xx
		.explore-video
			size(345px, 185px)
			border-radius: 8px
			overflow: hidden
			position: relative
			.playBtn
				size(45px, 45px)
				vh-center()
				top: 46%
				left: 49%
</style>