<template>
	<div class="page" catchtouchmove="ture">
		<scroll-view
			:scroll-y="true"
			class="categories">
			<div 
				class="cate"
				:class="{ active: cate.id === 4 }"
				v-for="cate in categories"
				:key="cate">
				{{cate.name}}
			</div>
			<div class="cate cate--hack"></div>
		</scroll-view>
		<scroll-view
			:scroll-y="true"
			class="contents bkc-white">
			<block
				v-for="(first_cat, first_cat_index) in categories"
				:key="first_cat">
				<!-- 一级分类横条图片 -->
				<div class="cate-pic-box">
					<div class="short-line"></div>
					<span class="cate-name">{{first_cat.name}}</span>
					<div class="short-line"></div>
					<img :src="first_cat.pic" class="cate-pic">
				</div>
				<!-- 二级分类 -->
				<div 
					class="contents__child"
					v-for="(second_cat, second_cat_index) in first_cat.child"
					:key="second_cat">
					<!-- 二级分类名 -->
					<div class="cate-name">{{second_cat.name}}</div>
					<!-- 主体内容 -->
					<div 
						class="contents__grandson__item"
						v-for="(item, index) in second_cat.child"
						:key="item">
						<img :src="item.pic" class="pic">
						<div class="main-info">
							<div class="name">{{item.name}}</div>
							<span class="price">{{item.price}}</span>
							<yz-cart-icon size="mini" />
						</div>
					</div>
				</div>
			</block>
		</scroll-view>
	</div>
</template>

<script>
	import data from './data';
	import cartIcon from 'components/cart-icon/index.vue';

	export default {
		name: '',
		data () {
			return {
				windowHeight: 100,
				categories: data.categories,
			}
		},
		onLoad () {
			console.log(this.categories);
		},
		components: {
			'yz-cart-icon': cartIcon
		}
	}
</script>

<style lang="stylus">
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
					size(79.5px, 79.5px)
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
	.cart-icon
		right: 0
		bottom: -5px
</style>