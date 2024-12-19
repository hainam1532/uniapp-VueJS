<template>
	<view class="flex flex-col bg-gray-200 h-screen w-full">
		<view class="flex flex-col bg-[#407bff] rounded-b-3xl gap-4 p-2">
			<view class="mx-2 flex justify-between">
				<view class="return" @click="backMenu()"></view>
				<span class="font-semibold text-white py-1">
					Tạo biểu phát tem
				</span>
				<view class="flex justify-center items-center">
				</view>
			</view>
		</view>
		
		<!-- DETAIL FORM -->
		<view class="flex h-screen bg-center bg-cover">
			<view class="w-full mx-auto z-10">
				<view class="flex flex-col">
					<view class="bg-white drop-shadow-2xl rounded-3xl p-2 m-2">
						<view class="flex-auto justify-evenly">
							<view class="flex items-center justify-between">
								<view class="flex items-center my-1">
									<span class="font-semibold">Apache Footwear Vietnam</span>
								</view>
							</view>
							<view class="border-b border-dashed border-black border-b-2"></view>
							<view class="flex justify-center items-center text-center">
								<span class="font-bold text-[20px] mt-1 text-blue-500">THÔNG TIN CƠ BẢN</span>
							</view>
							<view class="flex flex-col gap-4 text-sm mt-2">
								<view class="flex items-center border-b border-gray-300 pb-1">
									<view class="calendar"></view>
									<picker
										class="w-full ml-2 outline-none font-bold"
										mode="date"
										:value="formData.DATE_DELIVERY"
										@change="onDateDeliveryChange"
									>
										<view class="w-full ml-2 text-[18px] outline-none font-bold">
											{{ formData.DATE_DELIVERY || 'Ngày lãnh' }}
										</view>
									</picker>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-1">
									<view class="calendar"></view>
									<picker
										class="w-full ml-2 outline-none font-bold"
										mode="date"
										:value="formData.DATE_PAY"
										@change="onDatePayChange"
									>
										<view class="w-full ml-2 text-[18px] outline-none font-bold">
										  {{ formData.DATE_PAY || 'Ngày phát' }}
										</view>
									</picker>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-1">
									<view class="pen"></view>
									<input
										class="w-full ml-2 outline-none text-[18px] font-bold" 
										type="text"
										v-model="formData.STAMP_TYPE"
										autofocus 
										placeholder="Nhập tên liệu" 
									/>
								</view>
							</view>
							<view class="border-b border-dashed border-black border-b-2">
							</view>
							<scroll-view scroll-y="true" style="overflow-y: auto; height: calc(75vh - 300px);" >
								<view class="flex justify-center items-center text-center">
									<span class="font-bold text-[20px] mt-1 text-blue-500">DỮ LIỆU</span>
								</view>
								<view class="flex flex-col">
									<view class="flex flex-col gap-2 space-y-2 ">
										<view class="flex flex-col gap-2">
											<h2 class="font-semibold text-[18px]">Số lượng lãnh</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  type="text"
												   v-model="formData.QTY_DELIVERY"
												  autofocus 
												  placeholder="Số lượng lãnh" 
												/>
											</view>
										</view>
										
										<view class="flex flex-col gap-2">
											<h2 class="font-semibold text-[18px]">Số lượng phát</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  type="text"
												   v-model="formData.QTY_PAY"
												  autofocus 
												  placeholder="Số lượng phát" 
												/>
											</view>
										</view>
										
										<view class="flex flex-col gap-2">
											<h2 class="font-semibold text-[18px]">Số lượng còn lại</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  type="text" 
												  v-model="formData.QTY_AMOUNT"
												  autofocus 
												  placeholder="Số lượng còn lại" 
												/>
											</view>
										</view>
										<view class="flex flex-col gap-2">
											<h2 class="font-semibold text-[18px]">Người phát</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  type="text" 
												  v-model="formData.PAY_PEOPLE"
												  autofocus 
												  placeholder="Người phát" 
												/>
											</view>
										</view>
										
										<view class="flex flex-col gap-2">
											<h2 class="font-semibold text-[18px]">Người nhận</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  type="text" 
												  v-model="formData.DELIVERY_PEOPLE"
												  autofocus 
												  placeholder="Người nhận" 
												/>
											</view>
										</view>
										<view class="flex flex-col gap-2">
											<h2 class="font-semibold text-[18px]">Ghi chú</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  type="text" 
												  v-model="formData.REMARK"
												  autofocus 
												  placeholder="Ghi chú" 
												/>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
							<view class="border-b border-dashed border-black border-b-2 my-5">
								<view class="absolute rounded-full w-5 h-5 -mt-2 -left-2"></view>
								<view class="absolute rounded-full w-5 h-5 -mt-2 -right-2"></view>
							</view>
							<view class="flex w-full text-lg">
								<!-- Buttons -->
								<view class="w-full">
									<button @click="createData()" class="w-full text-white bg-[#407bff] rounded-lg font-semibold transition">Tạo</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import axios from '../../../axios.js';
	export default {
		data() {
			return {
				data: null,
				formData: {
					DATE_DELIVERY : '',
					STAMP_TYPE: '',
					QTY_DELIVERY: '',
					DATE_PAY: '',
					QTY_PAY: '',
					QTY_AMOUNT: '',
					PAY_PEOPLE: '',
					DELIVERY_PEOPLE: '',
					REMARK: ''
				},
				isLoading: false
			}
		},
		methods: {
			backMenu() {
				uni.navigateTo({
					url:'/pages/prodReport/prodOuterBoxSeal'
				})
			},
			formatDate(dateString) {
			    const date = new Date(dateString);
			    const day = String(date.getDate()).padStart(2, '0');
			    const month = String(date.getMonth() + 1).padStart(2, '0');
			    const year = date.getFullYear();
			    return `${year}/${month}/${day}`;
			},
			onDateDeliveryChange(e) {
				const dateRecord = e.detail.value;
				this.formData.DATE_DELIVERY = this.formatDate(dateRecord);
			},
			onDatePayChange(e) {
				const dateRecord = e.detail.value;
				this.formData.DATE_PAY = this.formatDate(dateRecord);
			},
			async createData() {
			    this.isLoading = true;
			    try {
			        // Kiểm tra ngày lãnh (DATE_DELIVERY)
			        if (!this.formData.DATE_DELIVERY) {
			            uni.showToast({
			                title: "Ngày lãnh không hợp lệ",
			                icon: "none",
			                duration: 2000,
			            });
			            return;
			        }
			
			        // Kiểm tra ngày phát (DATE_PAY)
			        if (!this.formData.DATE_PAY) {
			            uni.showToast({
			                title: "Ngày phát không hợp lệ",
			                icon: "none",
			                duration: 2000,
			            });
			            return;
			        }
			
			        // Sử dụng uni.request thay cho axios.post
			        uni.request({
			            url: 'http://10.30.3.50:8386/api/prodReport/createOuterBoxSeal',
			            method: 'POST',
			            data: this.formData,
			            success: (res) => {
			                uni.showToast({
			                    title: "Tạo thành công",
			                    icon: "none",
			                    duration: 2000,
			                });
			            },
			            fail: (error) => {
			                console.error("Create error: " + error);
			                uni.showToast({
			                    title: "Tạo thất bại",
			                    icon: "none",
			                    duration: 2000,
			                });
			            },
			            complete: () => {
			                this.isLoading = false;
			                uni.navigateTo({
			                    url: '/pages/prodReport/prodOuterBoxSeal'
			                });
			            }
			        });
			    } catch (error) {
			        console.error("Create error: " + error);
			        uni.showToast({
			            title: "Tạo thất bại",
			            icon: "none",
			            duration: 2000,
			        });
			    }
			}
		}
	}
</script>

<style>
	.return {
	  background-image: url('/static/return.png');
	  background-size: contain;
	  background-repeat: no-repeat;
	  width: 30px;
	  height: 30px;
	  margin-top: 2px;
	  margin-left: 4px;
	}
	
	.user {
			background-image: url('/static/user.png');
			background-size: contain;
			background-repeat: no-repeat;
			width: 25px;
			height: 25px;
		}
		
		.clock {
			background-image: url('/static/clock.png');
			background-size: contain;
			background-repeat: no-repeat;
			width: 25px;
			height: 25px;
		}
		
		.location {
			background-image: url('/static/location.png');
			background-size: contain;
			background-repeat: no-repeat;
			width: 25px;
			height: 25px;
		}
		
		.calendar {
			background-image: url('/static/calendar.png');
			background-size: contain;
			background-repeat: no-repeat;
			width: 25px;
			height: 25px;
		}
		
		.pen {
			background-image: url('/static/pen.png');
			background-size: contain;
			background-repeat: no-repeat;
			width: 25px;
			height: 25px;
		}
</style>