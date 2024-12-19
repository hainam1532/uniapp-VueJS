<template>
	<view class="flex flex-col bg-gradient-to-b from-blue-200 via-blue-100 to-white h-screen w-full">
		<view class="flex justify-between p-2" v-if="data">
			<view class="back" @click="backMenu()"></view>
			<span class="font-bold text-[25px]">
				Thông tin báo biểu PHYLON - [ {{data.ID}} ]
			</span>
			<view class="" @click="updateData()"></view>
		</view>

		<view class="flex h-screen bg-center bg-cover">
			<view class="w-full mx-auto z-10">
				<view class="flex flex-col">
					<view class="bg-white drop-shadow-2xl rounded-xl p-2 m-2">
						<view class="flex-auto justify-evenly">
							<view class="flex items-center justify-between">
								<view class="flex items-center my-1">
									<span class="font-bold ">Apache Footwear Vietnam</span>
								</view>
								<view class="flex items-center mx-2">
									<span v-if="data && data.DISPOSE_RESULT" :class="[
									    showStatus(data.DISPOSE_RESULT).color, 
									    showStatus(data.DISPOSE_RESULT).bg,
									    'font-bold text-[20px] py-1.5 px-4 rounded-md shadow-md inline-block'
									  ]">
										{{ showStatus(data.DISPOSE_RESULT).text }}
									</span>
								</view>
							</view>

							<view class="flex justify-center mt-4">
								<span class="font-bold text-[25px] text-blue-700">THÔNG TIN BÁO BIỂU</span>
							</view>


							<view class="grid grid-cols-2 grid-rows-1 gap-2" v-if="data">
								<view class="flex items-center border-b-2 border-black pb-1 mt-2 gap-2">
									<span class="font-bold text-[18px]">Ngày/Date :</span>
									<span class="font-medium">
										{{ formatDate(data.DATEE) || 'Không có ngày' }}
									</span>
								</view>

								<view class="flex items-center border-b-2 border-black pb-1 mt-2 gap-2">
									<span class="font-bold text-[18px]">Mã máy/Machine No. :</span>
									<span class="font-medium">
										{{ data.MACHINE_NO || 'Không có mã máy' }}
									</span>
								</view>

								<view class="flex items-center border-b-2 border-black pb-1 mt-2 gap-2">
									<span class="font-bold text-[18px]">Ca/Shift :</span>
									<span class="font-medium">
										{{ data.SHIFT || 'Không có ca' }}
									</span>
								</view>

								<view class="flex items-center border-b-2 border-black pb-1 mt-2 gap-2">
									<span class="font-bold text-[18px]">Chuyền/Line :</span>
									<span class="font-medium">
										{{ data.LINE_NO || 'Không có chuyền' }}
									</span>
								</view>

								<view class="flex items-center border-b-2 border-black pb-1 mt-2 gap-2">
									<span class="font-bold text-[18px]">Thời gian/Time :</span>
									<span class="font-medium">
										{{ data.TIME_RANGE || 'Không có thời gian' }}
									</span>
								</view>

								<view class="flex items-center border-b-2 border-black pb-1 mt-2 gap-2">
									<span class="font-bold text-[18px]">Khảo sát viên/Surveyor :</span>
									<span class="font-medium">
										{{ data.SURVEYOR || 'Thiếu người khảo sát' }}
									</span>
								</view>
							</view>

							<view class="border-dashed border-black border-b-2 my-4"></view>
							<view class="flex justify-center">
								<span class="font-bold text-[25px] text-blue-700">DỮ LIỆU BÁO BIỂU</span>
							</view>

							<view class="flex flex-col gap-4 mt-2" v-if="data">
								<view class="flex flex-col gap-2">
									<span class="font-bold text-[20px]">Số trạm/Station No. :</span>
									<view class="grid grid-cols-3 grid-rows-1 gap-2">
										<view class="flex items-center justify-center border-b-2 border-black pb-1">
											<span class="font-medium text-[20px]">
												{{ data.STATION_1 || '0' }}
											</span>
										</view>

										<view class="flex items-center justify-center border-b-2 border-black pb-1">
											<span class="font-medium text-[20px]">
												{{ data.STATION_2 || '0' }}
											</span>
										</view>

										<view class="flex items-center justify-center border-b-2 border-black pb-1">
											<span class="font-medium text-[20px]">
												{{ data.STATION_3 || '0' }}
											</span>
										</view>
									</view>
								</view>

								<view class="flex flex-col gap-2">
									<span class="font-bold text-[20px]">Nhiệt độ khuôn tiêu chuẩn/Mould standard
										temperature :</span>
									<view class="grid grid-cols-3 grid-rows-1 gap-2">
										<view class="flex items-center justify-center border-b-2 border-black pb-1">
											<span class="font-medium text-[20px]">
												{{ data.MOULD_TEMP_STD_1 || '0' }}
											</span>
										</view>

										<view class="flex items-center justify-center border-b-2 border-black pb-1">
											<span class="font-medium text-[20px]">
												{{ data.MOULD_TEMP_STD_2 || '0' }}
											</span>
										</view>

										<view class="flex items-center justify-center border-b-2 border-black pb-1">
											<span class="font-medium text-[20px]">
												{{ data.MOULD_TEMP_STD_3 || '0' }}
											</span>
										</view>
									</view>
								</view>

								<view class="flex flex-col gap-2">
									<span class="font-bold text-[20px]">Nhiệt độ khuôn thực tế/Mould actual temperature
										:</span>
									<view class="grid grid-cols-3 grid-rows-1 gap-2">
										<view class="flex items-center justify-center border-b-2 border-black pb-1">
											<span class="font-medium text-[20px]">
												{{ data.MOULD_TEMP_ACTUAL_1 || '0' }}
											</span>
										</view>

										<view class="flex items-center justify-center border-b-2 border-black pb-1">
											<span class="font-medium text-[20px]">
												{{ data.MOULD_TEMP_ACTUAL_2 || '0' }}
											</span>
										</view>

										<view class="flex items-center justify-center border-b-2 border-black pb-1">
											<span class="font-medium text-[20px]">
												{{ data.MOULD_TEMP_ACTUAL_3 || '0' }}
											</span>
										</view>
									</view>
								</view>
							</view>
							<view class="border-dashed border-black border-b-2 my-4"></view>
							<view class="flex justify-end mr-2" v-if="data">
								<span class="font-bold text-[15px]">
									id : {{data.ID || 'Không có ID'}}
								</span>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: null,
				editableData: null,
				isLoading: false,
				array: ['0', '1', '2', '3'],
				arrayStation: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
				arrayStation2: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
				arrayStation3: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
				index: 0,
				indexMachine: 0,
				indexStation: 0,
				indexStation2: 0,
				indexStation3: 0,
			};
		},
		created() {
			this.loadData();
		},
		methods: {
			backMenu() {
				uni.navigateTo({
					url: '/pages/iprdReport/materialPHYLON'
				})
			},
			showStatus(passFail) {
				switch (passFail) {
					case "S": // Khi pass_fail = "S"
						return {
							text: "Đạt", color: "text-green-600", bg: "bg-green-200"
						};
					case "F": // Khi pass_fail = "F"
						return {
							text: "Không đạt", color: "text-red-600", bg: "bg-red-200"
						};
					case null:
					case undefined:
					case "":
						return {
							text: "Không xác định", color: "text-gray-500", bg: "bg-gray-200"
						};
					default:
						return {
							text: "Không xác định", color: "text-gray-500", bg: "bg-gray-200"
						};
				}
			},
			formatDate(dateString) {
				const date = new Date(dateString);
				return date.toLocaleDateString("vi-VN");
			},
			loadData() {
				this.data = null;
				uni.getStorage({
					key: 'selectedData',
					success: (res) => {
						this.data = res.data;
						this.editableData = {
							...this.data
						};

						console.log('Select data: ', this.data)
					},
					fail: () => {
						console.error("Không tìm thấy dữ liệu trong bộ nhớ tạm");
					}
				});
			},
		}
	}
</script>

<style>
	.confirm {
		background-image: url('/static/confirm.png');
		background-size: contain;
		background-repeat: no-repeat;
		width: 30px;
		height: 30px;
	}

	.back {
		background-image: url('/static/left.png');
		background-size: contain;
		background-repeat: no-repeat;
		width: 40px;
		height: 40px;
	}
</style>