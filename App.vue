<script>
export default {
	onLaunch: function () {
		console.log('App Launch')
		// #ifdef APP-PLUS
		plus.screen.lockOrientation('portrait-primary'); //锁定竖屏
		// #endif
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
	@import 'tailwindcss/base';
	@import 'tailwindcss/utilities';

	.body {
		font-family: "Bebas Neue";
	}
	
	.overflow-auto::-webkit-scrollbar {
	    width: 6px; /* Adjust the width as needed */
	}
	
	.overflow-auto::-webkit-scrollbar-thumb {
		background-color: #a0aec0;
		border-radius: 5px;
	}
	
	.overflow-auto::-webkit-scrollbar-track {
	    background-color: #e2e8f0; /* Color of the scrollbar track */
	    border-radius: 5px; /* Rounded corners */
	}
</style>
