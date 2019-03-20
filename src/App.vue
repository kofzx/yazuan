<script>
	import Storage from 'utils/Storage';

	export default {
		methods: {
			// 设置一系列要用到的缓存
			async setStorages () {
				Storage.get('cart').catch(e => Storage.set('cart', []))
			},
		},
		created () {
			this.setStorages();
		},
	}
</script>

<style>

</style>
