<template>
	<view class="flex flex-col bg-gray-200 h-screen w-full">
		<view class="flex flex-col bg-[#407bff] rounded-b-3xl gap-4 p-2">
			<view class="mx-2 flex justify-between">
				<view class="return" @click="backMenu()"></view>
				<span class="font-semibold text-white py-1">
					Tạo báo cáo PHOM
				</span>
				<view class="flex justify-center items-center"></view>
			</view>
		</view>
		<!-- FORM INPUT -->
		<view class="flex h-screen bg-center bg-cover">
			<view class="w-full mx-auto z-10">
				<view class="flex flex-col">
					<view class="bg-white drop-shadow-2xl rounded-3xl p-4 m-4">
						<view class="flex-auto justify-evenly">
							<view class="flex items-center justify-between">
								<view class="flex items-center my-1">
									<span class="font-semibold">Apache Footwear Vietnam</span>
								</view>
								<svg class="w-6 h-6 text-sky-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
								  <path d="M11.782 5.72a4.773 4.773 0 0 0-4.8 4.173 3.43 3.43 0 0 1 2.741-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.934-2.865 3.137-3.921-.969 1.379-2.44 2.207-4.259 1.231-1.253-.673-2.19-3.438-5.959-3.318ZM6.8 11.979A4.772 4.772 0 0 0 2 16.151a3.431 3.431 0 0 1 2.745-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.933-2.865 3.137-3.921-.97 1.379-2.44 2.208-4.259 1.231-1.253-.673-2.19-3.443-5.963-3.317Z"/>
								</svg>
							</view>
							<view class="border-b border-dashed border-b-2 my-5"></view>
							<view class="flex justify-center items-center text-center">
								<span class="font-bold text-xl text-blue-500">THÔNG TIN PHOM</span>
							</view>
							<view class="flex flex-col justify-center gap-4 text-sm py-4">
								<view class="flex items-center border-b border-gray-300 pb-2">
									<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
									  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
									</svg>
									<picker
										mode="date"
										:value="editableData.DATE_REPORT"
										@change="onDateRecordChange"
									>
									  <view class="w-full ml-2 text-lg outline-none font-bold">{{ editableData.DATE_REPORT || 'Ngày nhập' }}</view>
									</picker>
								</view>
							</view>
							<view class="flex justify-around items-center gap-4 text-sm">
								<view class="flex flex-col gap-4 font-semibold">
									<span>Mã phom:</span>
									<input
										class="border border-gray-300 rounded text-sm w-14  text-center"
										type="text"
										v-model="editableData.CODE_PHOM"
									/>
								</view>
								<view class="flex flex-col gap-4 font-semibold">
									<span>QC:</span>
									<input
										class="border border-gray-300 rounded text-sm w-14 text-center"
										type="text"
										v-model="editableData.QC"
									/>
								</view>
							</view>
							<view class="border-b border-dashed border-b-2 my-5">
								<view class="absolute rounded-full w-5 h-5 -mt-2 -left-2"></view>
								<view class="absolute rounded-full w-5 h-5 -mt-2 -right-2"></view>
							</view>
							<scroll-view scroll-y="true" style="overflow-y: auto; height: calc(80vh - 300px);" >
								<view class="flex justify-center items-center text-center">
									<span class="font-bold text-xl text-blue-500">THÔNG TIN CƠ BẢN</span>
								</view>
								<view class="grid grid-cols-2 grid-rows-2 mt-2">
									<view class="flex col-span-2 justify-around items-center px-2 py-4">
										<view class="flex flex-col gap-2 justify-center items-center">
											<h2 class="font-semibold">7:30 - 9:30</h2>
											<view class="flex flex-col gap-2 justify-center items-center">
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Đạt:</span>
													<input
														class="border border-gray-300 rounded text-sm w-14 text-center"
														type="text"
														v-model="editableData.H07_SUCCESS"
													/>
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Không đạt</span>
													<input
														class="border border-gray-300 rounded text-sm w-14 text-center"
														type="text"
														v-model="editableData.H07_FAIL"
													/>
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Tỷ lệ không đạt</span>
													<span class="text-sm px-2 font-semibold text-red-500">
														{{ calculateRate(editableData.H07_SUCCESS, editableData.H07_FAIL) }}%
													</span>
												</view>
											</view>
										</view>
										
										<view class="flex flex-col gap-2 justify-center items-center">
											<h2 class="font-semibold">9:30 - 11:30</h2>
											<view class="flex flex-col gap-2 justify-center items-center">
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Đạt:</span>
													<input
														class="border border-gray-300 rounded text-sm w-14 text-center"
														type="text"
														v-model="editableData.H09_SUCCESS"
													/>
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Không đạt</span>
													<input
														class="border border-gray-300 rounded text-sm w-14 text-center"
														type="text"
														v-model="editableData.H09_FAIL"
													/>
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Tỷ lệ không đạt</span>
													<span class="text-sm px-2 font-semibold text-red-500">
														{{ calculateRate(editableData.H09_SUCCESS, editableData.H09_FAIL) }}%
													</span>
												</view>
											</view>
										</view>
									</view>
									<view class="flex col-span-2 justify-around px-2 py-1.5 mt-4">
										<view class="flex flex-col gap-2 justify-center items-center">
											<h2 class="font-semibold">12:30 - 14:30</h2>
											<view class="flex flex-col gap-2 justify-center items-center">
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Đạt:</span>
													<input
														class="border border-gray-300 rounded text-sm w-14 text-center"
														type="text"
														v-model="editableData.H12_SUCCESS"
													/>
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Không đạt</span>
													<input
														class="border border-gray-300 rounded text-sm w-14 text-center"
														type="text"
														v-model="editableData.H12_FAIL"
													/>
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Tỷ lệ không đạt</span>
													<span class="text-sm px-2 font-semibold text-red-500">
														{{ calculateRate(editableData.H12_SUCCESS, editableData.H12_FAIL) }}%
													</span>
												</view>
											</view>
										</view>
										<view class="flex flex-col gap-2 justify-center items-center">
											<h2 class="font-semibold">14:30 - 16:30</h2>
											<view class="flex flex-col gap-2 justify-center items-center">
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Đạt:</span>
													<input
														class="border border-gray-300 rounded text-sm w-14 text-center"
														type="text"
														v-model="editableData.H14_SUCCESS"
													/>
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Không đạt</span>
													<input
														class="border border-gray-300 rounded text-sm w-14 text-center"
														type="text"
														v-model="editableData.H14_FAIL"
													/>
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Tỷ lệ không đạt</span>
													<span class="text-sm px-2 font-semibold text-red-500">
														{{ calculateRate(editableData.H14_SUCCESS, editableData.H14_FAIL) }}%
													</span>
												</view>
											</view>
										</view>
									</view>
									<view class="flex col-span-2 justify-around items-center px-2 mt-4">
										<view class="flex flex-col gap-2 justify-center items-center">
											<h2 class="font-semibold">16:30 - 18:30</h2>
											<view class="flex flex-col gap-2 justify-center items-center">
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Đạt:</span>
													<input
														class="border border-gray-300 rounded text-sm w-14 text-center"
														type="text"
														v-model="editableData.H16_SUCCESS"
													/>
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Không đạt</span>
													<input
														class="border border-gray-300 rounded text-sm w-14 text-center"
														type="text"
														v-model="editableData.H16_FAIL"
													/>
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Tỷ lệ không đạt</span>
													<span class="text-xl px-2 font-semibold text-red-500">
														{{ calculateRate(editableData.H16_SUCCESS, editableData.H16_FAIL) }}%
													</span>
												</view>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
							<view class="border-b border-dashed border-b-2 my-5">
								<view class="absolute rounded-full w-5 h-5 -mt-2 -left-2"></view>
								<view class="absolute rounded-full w-5 h-5 -mt-2 -right-2"></view>
							</view>
							<view class="flex flex-col justify-center items-center">
								<button @click="createData()" class="w-full text-white bg-[#407bff] rounded-lg font-semibold transition">Tạo</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import axios from '../../../axios.js'
	export default {
		data() {
			return {
				data: null,
				editableData: {
					DATE_REPORT: '',
					CODE_PHOM: '',
					QC: '',
					H07_SUCCESS: '',
					H07_FAIL: '',
					H09_SUCCESS: '',
					H09_FAIL: '',
					H12_SUCCESS: '',
					H12_FAIL: '',
					H14_SUCCESS: '',
					H14_FAIL: '',
					H16_SUCCESS: '',
					H16_FAIL: '',
					RATE_H07: '',
					RATE_H09: '',
					RATE_H12: '',
					RATE_H14: '',
					RATE_H16: ''
				},
				isLoading: false,
			};
		},
		methods: {
			backMenu() {
				uni.navigateTo({
					url:'/pages/iqcReport/iqcCheckPhom'
				})
			},
			calculateRate(success, fail) {
			  success = parseFloat(success);
			  fail = parseFloat(fail);
			  if (isNaN(success) || isNaN(fail)) return 0;
			  if (success + fail === 0) return 0;
			  return ((fail / (success + fail)) * 100).toFixed(2);
			},
			formatDate(dateString) {
			    const date = new Date(dateString);
			    const day = String(date.getDate()).padStart(2, '0');
			    const month = String(date.getMonth() + 1).padStart(2, '0');
			    const year = date.getFullYear();
			    return `${year}/${month}/${day}`;
			},
			onDateRecordChange(e) {
				const dateRecord = e.detail.value;
				this.editableData.DATE_REPORT = this.formatDate(dateRecord);
			},
			async createData() {
			    this.isLoading = true;
			    try {
			        const calculateRate = (success, fail) => {
			            const s = parseInt(success, 10) || 0;
			            const f = parseInt(fail, 10) || 0;
			            return f === 0 && s === 0 ? 0 : ((f / (s + f)) * 100).toFixed(2);
			        };
			
			        // Không cần gọi lại formatDate vì DATE_REPORT đã được xử lý trong onDateRecordChange
			        if (!this.editableData.DATE_REPORT) {
			            uni.showToast({
			                title: "Ngày không hợp lệ",
			                icon: "none",
			                duration: 2000,
			            });
			            return;
			        }
			
			        this.editableData.RATE_H07 = calculateRate(this.editableData.H07_SUCCESS, this.editableData.H07_FAIL);
			        this.editableData.RATE_H09 = calculateRate(this.editableData.H09_SUCCESS, this.editableData.H09_FAIL);
			        this.editableData.RATE_H12 = calculateRate(this.editableData.H12_SUCCESS, this.editableData.H12_FAIL);
			        this.editableData.RATE_H14 = calculateRate(this.editableData.H14_SUCCESS, this.editableData.H14_FAIL);
			        this.editableData.RATE_H16 = calculateRate(this.editableData.H16_SUCCESS, this.editableData.H16_FAIL);
			
			        console.log("Data to send:", this.editableData);
			
			        await axios.post(`/iqcReport/createPHOM`, this.editableData);
			        uni.showToast({
			            title: "Tạo thành công",
			            icon: "none",
			            duration: 2000,
			        });
			    } catch (error) {
			        console.error("Create error: " + error);
			        uni.showToast({
			            title: "Tạo thất bại",
			            icon: "none",
			            duration: 2000,
			        });
			    } finally {
			        this.isLoading = false;
			        uni.navigateTo({
			            url: '/pages/iqcReport/iqcCheckPhom'
			        });
			    }
			},
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
	
	.add {
	  background-image: url('/static/add.png');
	  background-size: contain;
	  background-repeat: no-repeat;
	  width: 30px;
	  height: 30px;
	  margin-top: 2px;
	  margin-left: 4px;
	}
	/* Kích thước chữ mặc định cho điện thoại */
	span {
	  font-size: 14px;
	}
	
	h2 {
		font-size: 18px;
		color: coral;
	}
	
	input {
		width: 80%; /* Chiếm 90% chiều rộng */
		font-size: 16px;
		font-weight: bold;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	
	/* Khi thiết bị là iPad hoặc kích thước màn hình lớn hơn */
	@media screen and (min-width: 768px) {
		.return {
		  background-image: url('/static/return.png');
		  background-size: contain;
		  background-repeat: no-repeat;
		  width: 30px;
		  height: 30px;
		  margin-top: 2px;
		  margin-left: 4px;
		}
		
		.add {
		  background-image: url('/static/add.png');
		  background-size: contain;
		  background-repeat: no-repeat;
		  width: 30px;
		  height: 30px;
		  margin-top: 2px;
		  margin-left: 4px;
		}
	  span {
	    font-size: 22px; /* Tăng kích thước chữ */
	  }
	  
		input {
			font-size: 20px;
			font-weight: bold;
		}
		
		h2 {
			font-size: 20px;
			color: coral;
		}
	  
	}
	
	/* Khi thiết bị là iPad Pro hoặc lớn hơn */
	@media screen and (min-width: 1024px) {
		.return {
		  background-image: url('/static/return.png');
		  background-size: contain;
		  background-repeat: no-repeat;
		  width: 30px;
		  height: 30px;
		  margin-top: 2px;
		  margin-left: 4px;
		}
		
		.add {
		  background-image: url('/static/add.png');
		  background-size: contain;
		  background-repeat: no-repeat;
		  width: 30px;
		  height: 30px;
		  margin-top: 2px;
		  margin-left: 4px;
		}
	  span {
	    font-size: 24px; /* Thêm kích thước chữ */
	  }
	  
	  input {
	  	font-size: 35px;
		font-weight: bold;
	  }
	  
	  h2 {
	  	font-size: 30px;
		color: coral;
	  }
	}
</style>