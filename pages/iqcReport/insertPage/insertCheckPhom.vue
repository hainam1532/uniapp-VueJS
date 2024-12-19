<template>
	<view class="flex flex-col bg-gradient-to-b from-blue-200 via-blue-100 to-white h-screen w-full">
		<view class="flex flex-col bg-[#407bff] rounded-b-3xl gap-2 p-2">
			<view class="mx-2 flex justify-between">
				<view class="return" @click="backMenu()"></view>
				<span class="font-semibold text-white text-[20px]">
					Tạo báo cáo PHOM
				</span>
				<view class="flex justify-center items-center"></view>
			</view>
		</view>
		<!-- FORM INPUT -->
		<view class="flex flex-col bg-cover">
			<view class="w-full mx-auto z-10">
				<view class="flex flex-col">
					<view class="bg-white drop-shadow-2xl rounded-2xl p-2 m-4">
						<view class="flex-auto justify-evenly">
							<view class="flex items-center justify-between">
								<view class="flex items-center">
									<span class="font-semibold mx-2">Apache Footwear Vietnam</span>
								</view>
								
							</view>
							<view class="border-b border-dashed border-b-2 border-black my-2">
							</view>
							<view class="flex justify-center items-center text-center">
								<span class="font-bold text-[20px] text-blue-500">THÔNG TIN PHOM</span>
							</view>
							<view class="flex flex-col justify-center gap-4 text-sm p-1">
								<view class="flex items-center border-b border-gray-300 pb-1">
									<view class="calendar"></view>
									<picker
										mode="date"
										:value="editableData.DATE_REPORT"
										@change="onDateRecordChange"
									>
									  <view class="w-full ml-2 text-[15px] outline-none font-bold">{{ editableData.DATE_REPORT || 'Ngày nhập' }}</view>
									</picker>
								</view>
							</view>
							<view class="flex justify-around items-center gap-2 text-[20px]">
								<view class="flex flex-col gap-2 font-semibold">
									<span>Mã phom:</span>
									<input
										class="border border-gray-300 rounded text-sm text-center"
										type="text"
										v-model="editableData.CODE_PHOM"
									/>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									<span>QC:</span>
									<input
										class="border border-gray-300 rounded text-sm text-center"
										type="text"
										v-model="editableData.QC"
									/>
								</view>
							</view>
							<view class="border-b border-dashed border-b-2 border-black my-2">
							</view>
							<scroll-view scroll-y="true" style="overflow-y: auto; height: calc(80vh - 300px);" >
								<view class="flex justify-center items-center text-center">
									<span class="font-bold text-[20px] text-blue-500">THÔNG TIN CƠ BẢN</span>
								</view>
								<view class="grid grid-cols-2 grid-rows-2">
									<view class="flex col-span-2 justify-around items-center">
										<view class="flex flex-col gap-2 justify-center items-center">
											<h2 class="font-semibold">7:30 - 9:30</h2>
											<view class="flex flex-col gap-2 justify-center items-center">
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Đạt:</span>
													<input
														class="border border-gray-300 rounded text-sm text-center"
														type="text"
														v-model="editableData.H07_SUCCESS"
													/>
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Không đạt</span>
													<input
														class="border border-gray-300 rounded text-sm text-center"
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
														class="border border-gray-300 rounded text-sm text-center"
														type="text"
														v-model="editableData.H09_SUCCESS"
													/>
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Không đạt</span>
													<input
														class="border border-gray-300 rounded text-sm text-center"
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
									<view class="flex col-span-2 justify-around mt-2">
										<view class="flex flex-col gap-2 justify-center items-center">
											<h2 class="font-semibold">12:30 - 14:30</h2>
											<view class="flex flex-col gap-2 justify-center items-center">
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Đạt:</span>
													<input
														class="border border-gray-300 rounded text-sm text-center"
														type="text"
														v-model="editableData.H12_SUCCESS"
													/>
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Không đạt</span>
													<input
														class="border border-gray-300 rounded text-sm text-center"
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
														class="border border-gray-300 rounded text-sm text-center"
														type="text"
														v-model="editableData.H14_SUCCESS"
													/>
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Không đạt</span>
													<input
														class="border border-gray-300 rounded text-sm text-center"
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
									<view class="flex col-span-2 justify-around items-center mt-2">
										<view class="flex flex-col gap-2 justify-center items-center">
											<h2 class="font-semibold">16:30 - 18:30</h2>
											<view class="flex flex-col gap-2 justify-center items-center">
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Đạt:</span>
													<input
														class="border border-gray-300 rounded text-sm text-center"
														type="text"
														v-model="editableData.H16_SUCCESS"
													/>
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Không đạt</span>
													<input
														class="border border-gray-300 rounded text-sm text-center"
														type="text"
														v-model="editableData.H16_FAIL"
													/>
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Tỷ lệ không đạt</span>
													<span class="text-sm px-2 font-semibold text-red-500">
														{{ calculateRate(editableData.H16_SUCCESS, editableData.H16_FAIL) }}%
													</span>
												</view>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
							<view class="border-b border-dashed border-b-2 border-black my-2">
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
			
			        // Sử dụng uni.request thay vì axios
			        uni.request({
			            url: 'http://10.30.3.50:8386/api/iqcReport/createPHOM',
			            method: 'POST',
			            data: this.editableData,
			            success: (response) => {
			                console.log('Create response:', response);
			                uni.showToast({
			                    title: "Tạo thành công",
			                    icon: "none",
			                    duration: 2000,
			                });
			            },
			            fail: (error) => {
			                console.error('Create error:', error);
			                uni.showToast({
			                    title: "Tạo thất bại",
			                    icon: "none",
			                    duration: 2000,
			                });
			            },
			            complete: () => {
			                this.isLoading = false;
			                uni.navigateTo({
			                    url: '/pages/iqcReport/iqcCheckPhom'
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
			        this.isLoading = false;
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
	
</style>