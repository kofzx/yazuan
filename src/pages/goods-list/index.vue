<template>
	<div>
		<yz-search 
			plc="搜索商品"
			@searchSubmit="searchSubmit" />
		<ul class="sort-list bkc-white">
			<li 
				class="sort-list__item"
				v-for="sort in sortList"
				:key="sort">
				<span class="text">{{sort}}</span>
				<block v-if="sort === '价格'">
					<yz-sort />
				</block>
			</li>
		</ul>
	</div>
</template>

<script>
	import search from 'components/search/index.vue';
	import sort from 'components/sort/index.vue';

	export default {
		name: 'goodsList',
		data() {
			return {
				sortList: ['销量', '新品', '好评', '价格'],
			}
		},
		methods: {
			searchSubmit (e) {
				console.log(e);
			},
		},
		components: {
			'yz-search': search,
			'yz-sort': sort
		}
	}
</script>

<style lang="stylus">
	.sort-list
		flex-row()
		height: 43px;
	.sort-list__item
		flex: 1
		text-align: center
		line-height: 43px
		.text
			font-size: 14px
			font-weight: bold
			color: #333333
			&.active
				color: #FA4A1F
</style>