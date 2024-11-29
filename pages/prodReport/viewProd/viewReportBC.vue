<template>
	view bc
</template>

<script>
	export default {
		data() {
			return {
				data: null,
			}
		},
		created() {
			this.loadData();
		},
		watch: {
			'$route.query.id': {
			  handler() {
				this.loadData();
			  },
			  immediate: true,
			},
		},
		methods: {
			loadData() {
				this.data = null;
				const id = this.$route.query.id;
				if (id) {
					const storedData = sessionStorage.getItem('selectedData');
					if (storedData) {
					  this.data = JSON.parse(storedData);
					} else {
					  console.error('Không tìm thấy dữ liệu trong sessionStorage');
					}
				} else {
					console.error('ID không tồn tại trong URL');
				}
			},
			formatDate(dateString) {
			    const date = new Date(dateString);
			    const day = String(date.getDate()).padStart(2, '0');
			    const month = String(date.getMonth() + 1).padStart(2, '0');
			    const year = date.getFullYear();
			    return `${day}/${month}/${year}`;
			},
			formatTime(timestamp) {
			    if (!timestamp) return '';
			
			    const date = new Date(timestamp);
			
			    if (isNaN(date.getTime())) return 'Invalid time';
			
			    let hours = date.getHours();
			    const minutes = String(date.getMinutes()).padStart(2, '0');
			    const seconds = String(date.getSeconds()).padStart(2, '0');
			    const ampm = hours >= 12 ? 'AM' : 'PM';
			
			    // Convert to 12-hour format
			    hours = hours % 12;
			    if (hours === 0) hours = 12;
			
			    return `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
			},
			backMenu() {
				uni.navigateTo({
					url: '/pages/iqcReport/iqcMaterial'
				})
			},
		}
	}
</script>

<style>
</style>