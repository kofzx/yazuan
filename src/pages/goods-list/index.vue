<template>
	<div>
		<yz-search 
			plc="搜索商品"
			@searchSubmit="searchSubmit" />
		<ul class="sort-list bkc-white">
			<li 
				class="sort-list__item"
				v-for="(sort, index) in sortList"
				:key="sort"
				@click="changeSort(index)">
				<span 
					class="text"
					:class="{'active': index === sortActive}">{{sort}}</span>
				<block v-if="sort === '价格'">
					<yz-sort :sort-by="priceSortBy" />
				</block>
			</li>
		</ul>
		<selling-goods :data="sellingGoods" />
		<yz-cart-fixed :num="cart.length" />
	</div>
</template>

<script>
	import Storage from 'utils/Storage'
	import search from 'components/search/index.vue';
	import sort from 'components/sort/index.vue';
	import sellingGoods from 'templates/selling-goods.vue';
	import cartFixed from 'components/cart-fixed/index.vue';

	export default {
		name: 'goodsList',
		data() {
			return {
				sortList: ['销量', '新品', '好评', '价格'],
				sortActive: 0,
				priceSortBy: '',
				cart: [],
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
					{
						img: require('../../images/index/selling4.png'),
						name: 'ENDLESS LOVE 系列无限爱恋男戒',
						price: 9800,
						sold_count: 866
					},
				],
			}
		},
		methods: {
			switchSortBy (data) {
				const sortBy = this[data];
				switch (sortBy) {
					case '':
					case 'asc':
						this[data] = 'desc';
						break;
					case 'desc':
						this[data] = 'asc';
						break;
				}
			},
			changeSort (index) {
				const sortList = this.sortList;
				this.sortActive = index;

				if (index === sortList.lastIndexOf('价格')) {
					this.switchSortBy('priceSortBy');
				} else {
					this.priceSortBy = '';
				}
			},
			searchSubmit (e) {
				console.log(e);
			},
		},
		onShow () {
			Storage
				.get('cart')
				.then(data => {
					this.cart = data;
				})
		},
		components: {
			'yz-search': search,
			'yz-sort': sort,
			'yz-cart-fixed': cartFixed,
			'selling-goods': sellingGoods,
		}
	}
</script>

<style lang="stylus">
	.sort-list
		flex-row()
		height: 43px;
	.sort-list__item
		flex: 1
		flex-row()
		.text
			font-size: 14px
			font-weight: bold
			color: $theme-black
			&.active
				color: $active-red
				transition: color 0.2s ease
	.sort-groups
		margin-left: 3.5px
	.blank
		height: 27px
</style>