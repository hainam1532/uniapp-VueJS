<template>
	<view class="flex flex-col bg-gradient-to-b from-blue-200 via-blue-100 to-white h-screen w-full">
		<view class="flex flex-col bg-[#407bff] rounded-b-3xl gap-4 p-2">
			<view class="mx-2 flex justify-between" v-if="data">
				<view class="return" @click="backMenu()"></view>
				<span class="font-semibold text-white py-1">
					Thông tin chi tiết -
					{{data.ID}}
				</span>
				<view class="flex justify-center items-center">
					<view class="add" @click="updateData()"></view>
				</view>
			</view>
		</view>

		<!-- DETAIL FORM -->
		<view class="flex h-screen bg-center bg-cover">
			<view class="w-full mx-auto z-10">
				<view class="flex flex-col">
					<view class="bg-white drop-shadow-2xl rounded-3xl p-4 m-4">
						<view class="flex-auto justify-evenly">
							<view class="flex items-center justify-between">
								<view class="flex items-center my-1">
									<span class="font-semibold">Apache Footwear Vietnam</span>
								</view>
								<svg class="w-6 h-6 text-sky-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
									width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M11.782 5.72a4.773 4.773 0 0 0-4.8 4.173 3.43 3.43 0 0 1 2.741-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.934-2.865 3.137-3.921-.969 1.379-2.44 2.207-4.259 1.231-1.253-.673-2.19-3.438-5.959-3.318ZM6.8 11.979A4.772 4.772 0 0 0 2 16.151a3.431 3.431 0 0 1 2.745-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.933-2.865 3.137-3.921-.97 1.379-2.44 2.208-4.259 1.231-1.253-.673-2.19-3.443-5.963-3.317Z" />
								</svg>
							</view>
							<view class="border-b border-dashed border-black border-b-2 my-5">
								<view class="absolute rounded-full w-5 h-5 bg-blue-200 -mt-2 -left-2"></view>
								<view class="absolute rounded-full w-5 h-5 bg-blue-200 -mt-2 -right-2"></view>
							</view>
							<view class="flex justify-center items-center text-center">
								<span class="font-bold text-xl text-blue-500">THÔNG TIN PHOM</span>
							</view>
							<view class="flex justify-around gap-4 text-sm py-4" v-if="data">
								<view class="flex flex-col gap-4 font-semibold">
									<span>Ngày kiểm:</span>
									<span class="font-medium ml-10">{{ formatDate(data.DATE_REPORT) }}</span>
								</view>
								<view class="flex flex-col gap-4 font-semibold">
									<span>Mã phom:</span>
									<span class="font-medium ml-10">{{ data.CODE_PHOM }}</span>
								</view>
								<view class="flex flex-col gap-4 font-semibold">
									<span>QC:</span>
									<span class="font-medium ml-10">{{ data.QC }}</span>
								</view>
							</view>
							<view class="border-b border-dashed border-black border-b-2 my-5">
								<view class="absolute rounded-full w-5 h-5 bg-blue-200 -mt-2 -left-2"></view>
								<view class="absolute rounded-full w-5 h-5 bg-blue-200 -mt-2 -right-2"></view>
							</view>
							<scroll-view scroll-y="true" style="overflow-y: auto; height: calc(84vh - 300px);">
								<view class="flex justify-center items-center text-center">
									<span class="font-bold text-xl text-blue-500">THÔNG TIN CƠ BẢN</span>
								</view>
								<view class="grid grid-cols-2 grid-rows-2 mt-2" v-if="data">
									<view class="flex col-span-2 justify-around items-center px-2 py-4">
										<view class="flex flex-col gap-2 justify-center items-center">
											<h2 class="font-semibold">7:30 - 9:30</h2>
											<view class="flex flex-col gap-2 justify-center items-center">
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Đạt:</span>
													<input
														class="border border-gray-300 rounded text-sm w-14 text-center"
														type="text" v-model="editableData.H07_SUCCESS" />
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Không đạt</span>
													<input
														class="border border-gray-300 rounded text-sm w-14 text-center"
														type="text" v-model="editableData.H07_FAIL" />
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
														type="text" v-model="editableData.H09_SUCCESS" />
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Không đạt</span>
													<input
														class="border border-gray-300 rounded text-sm w-14 text-center"
														type="text" v-model="editableData.H09_FAIL" />
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
														type="text" v-model="editableData.H12_SUCCESS" />
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Không đạt</span>
													<input
														class="border border-gray-300 rounded text-sm w-14 text-center"
														type="text" v-model="editableData.H12_FAIL" />
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
														type="text" v-model="editableData.H14_SUCCESS" />
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Không đạt</span>
													<input
														class="border border-gray-300 rounded text-sm w-14 text-center"
														type="text" v-model="editableData.H14_FAIL" />
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
														type="text" v-model="editableData.H16_SUCCESS" />
												</view>
												<view class="flex flex-col gap-2 justify-center items-center">
													<span>Không đạt</span>
													<input
														class="border border-gray-300 rounded text-sm w-14 text-center"
														type="text" v-model="editableData.H16_FAIL" />
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
							<view class="flex flex-col justify-center items-center text-lg">
								<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
									<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
									<g id="SVGRepo_iconCarrier">
										<path
											d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
											stroke="#000000" stroke-width="2" stroke-linecap="round"
											stroke-linejoin="round"></path>
									</g>
								</svg>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import axios from "../../../axios.js";
	export default {
	  data() {
	    return {
	      data: null,
	      editableData: null,
	      isLoading: false,
	    };
	  },
	  created() {
	    this.loadData();
	  },
	  methods: {
	    loadData() {
	      this.data = null;
	      
	      // Lấy dữ liệu đã lưu từ bộ nhớ tạm
	      uni.getStorage({
	        key: 'selectedData',
	        success: (res) => {
	          this.data = res.data;
	          this.editableData = { ...this.data };
	        },
	        fail: () => {
	          console.error("Không tìm thấy dữ liệu trong bộ nhớ tạm");
	        }
	      });
	    },
	    calculateRate(success, fail) {
	      success = parseFloat(success);
	      fail = parseFloat(fail);
	      if (isNaN(success) || isNaN(fail)) return 0;
	      if (success + fail === 0) return 0;
	      return ((fail / (success + fail)) * 100).toFixed(2);
	    },
	    async updateData() {
	        this.isLoading = true;
	        try {
	            const {
	                RATE_H07,
	                H07_SUCCESS,
	                H09_SUCCESS,
	                H12_SUCCESS,
	                H14_SUCCESS,
	                H14_FAIL,
	                H16_SUCCESS,
	                H16_FAIL,
	                H07_FAIL,
	                H09_FAIL,
	                H12_FAIL,
	                RATE_H09,
	                RATE_H12,
	                RATE_H14,
	                RATE_H16
	            } = this.editableData;
	    
	            const updateData = {
	                id: this.data.ID,
	                RATE_H07: this.calculateRate(H07_SUCCESS, H07_FAIL),
	                H07_SUCCESS,
	                H09_SUCCESS,
	                H12_SUCCESS,
	                H14_SUCCESS,
	                H14_FAIL,
	                H16_SUCCESS,
	                H16_FAIL,
	                H07_FAIL,
	                H09_FAIL,
	                H12_FAIL,
	                RATE_H09: this.calculateRate(H09_SUCCESS, H09_FAIL),
	                RATE_H12: this.calculateRate(H12_SUCCESS, H12_FAIL),
	                RATE_H14: this.calculateRate(H14_SUCCESS, H14_FAIL),
	                RATE_H16: this.calculateRate(H16_SUCCESS, H16_FAIL)
	            };
	    
	            // Thực hiện cập nhật dữ liệu bằng uni.request
	            uni.request({
	                url: `http://10.30.3.50:8386/api/iqcReport/updatePHOM/${this.data.ID}`,
	                method: 'POST',
	                data: updateData,
	                success: (response) => {
	                    console.log("Update response:", response);
	                    uni.showToast({
	                        title: "Cập nhật thành công",
	                        icon: 'none',
	                        duration: 2000
	                    });
	                },
	                fail: (error) => {
	                    console.error("Update error:", error);
	                    uni.showToast({
	                        title: "Cập nhật thất bại",
	                        icon: 'none',
	                        duration: 2000
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
	            console.error("Update error:", error);
	            uni.showToast({
	                title: "Cập nhật thất bại",
	                icon: 'none',
	                duration: 2000
	            });
	            this.isLoading = false;
	        }
	    },
	    formatDate(dateString) {
	      const date = new Date(dateString);
	      return date.toLocaleDateString("vi-VN");
	    },
	    backMenu() {
	      uni.navigateTo({
	        url: "/pages/iqcReport/iqcCheckPhom",
	      });
	    },
	  },
	};

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

	.barcode {
		left: 50%;
		box-shadow: 1px 0 0 1px, 5px 0 0 1px, 10px 0 0 1px, 11px 0 0 1px, 15px 0 0 1px, 18px 0 0 1px, 22px 0 0 1px, 23px 0 0 1px, 26px 0 0 1px, 30px 0 0 1px, 35px 0 0 1px, 37px 0 0 1px, 41px 0 0 1px, 44px 0 0 1px, 47px 0 0 1px, 51px 0 0 1px, 56px 0 0 1px, 59px 0 0 1px, 64px 0 0 1px, 68px 0 0 1px, 72px 0 0 1px, 74px 0 0 1px, 77px 0 0 1px, 81px 0 0 1px, 85px 0 0 1px, 88px 0 0 1px, 92px 0 0 1px, 95px 0 0 1px, 96px 0 0 1px, 97px 0 0 1px, 101px 0 0 1px, 105px 0 0 1px, 109px 0 0 1px, 110px 0 0 1px, 113px 0 0 1px, 116px 0 0 1px, 120px 0 0 1px, 123px 0 0 1px, 127px 0 0 1px, 130px 0 0 1px, 131px 0 0 1px, 134px 0 0 1px, 135px 0 0 1px, 138px 0 0 1px, 141px 0 0 1px, 144px 0 0 1px, 147px 0 0 1px, 148px 0 0 1px, 151px 0 0 1px, 155px 0 0 1px, 158px 0 0 1px, 162px 0 0 1px, 165px 0 0 1px, 168px 0 0 1px, 173px 0 0 1px, 176px 0 0 1px, 177px 0 0 1px, 180px 0 0 1px;
		display: inline-block;
		transform: translateX(-90px);
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
		width: 80%;
		/* Chiếm 90% chiều rộng */
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
			font-size: 22px;
			/* Tăng kích thước chữ */
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
			font-size: 24px;
			/* Thêm kích thước chữ */
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