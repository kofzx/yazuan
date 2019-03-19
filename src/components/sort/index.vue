<template>
	<div 
		class="sort-groups"
		:class="[sortBy === 'asc' || sortBy === 'desc' ? 'sort-groups--' + sortBy : '']"></div>
</template>

<script>
	export default {
		name: 'sort',
		props: {
			sortBy: String
		}
	}
</script>

<style>
	.sort-groups {
		display: inline-block;
		width: 8px;
		height: 13px;
		position: relative;
	}
	.sort-groups::before,
	.sort-groups::after {
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		left: 50%;
		transform: translate3d(-50%,0,0);
		border-width: 4px 3px 4px 3px;
		border-style: solid;
		border-color: transparent;
	}
	.sort-groups::before {
		top: 1px;
		border-bottom-color: #333333;
		border-top-width: 0;
	}
	.sort-groups::after {
		bottom: 1px;
		border-top-color: #333333;
		border-bottom-width: 0;
	}
	.sort-groups--asc::before {
		border-bottom-color: #FA4A1F;
		transition: all 0.15s ease;
	}
	.sort-groups--desc::after {
		border-top-color: #FA4A1F;
		transition: all 0.15s ease;
	}
</style>