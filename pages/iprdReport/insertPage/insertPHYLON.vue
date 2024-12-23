<template>
	<view class="flex flex-col h-screen w-full bg-gradient-to-b from-blue-200 via-blue-100 to-white">
		<view class="flex justify-between gap-2 p-2">
			<view class="back" @click="goBack()"></view>
			<span class="font-bold text-[22px]">Tạo biểu nhiệt độ khuôn bơm liệu PHYLON</span>
			<view class=""></view>
		</view>
		<view class="flex text-center justify-center font-bold text-lg">
			Thông tin dữ liệu
		</view>
		<view class="flex flex-col gap-4 p-2">
			<view class="flex flex-col gap-2">
				<span class="font-bold text-[20px]">Ngày/Date :</span>
				<view class="flex items-center border-b-2 border-black pb-1">
					<span class="calendar"></span>
					<picker class="w-full ml-2 outline-none font-semibold" mode="date" :value="formData.DATEE"
						@change="onDateChange">
						<view class="w-full text-[20px] outline-none">
							{{ formData.DATEE || 'Ngày' }}
						</view>
					</picker>
				</view>
			</view>

			<view class="flex flex-col gap-2">
				<span class="font-bold text-[20px]">Ca/Shift :</span>
				<view class="flex items-center border-b-2 border-black pb-1">
					<span class="pen"></span>
					<picker class="w-full ml-2 outline-none font-semibold" :range="array" :value="index"
						@change="bindPickerChange">
						<view class="w-full text-[20px] outline-none">
							{{ array[index] || 'CA' }}
						</view>
					</picker>
				</view>
			</view>
			
			<view class="flex flex-col gap-2">
				<span class="font-bold text-[20px]">Mã máy/Machine No. :</span>
				<view class="flex items-center border-b-2 border-black pb-1">
					<span class="pen"></span>
					<input class="w-full ml-2 outline-none font-semibold text-[20px]" type="text"
						v-model="formData.MACHINE_NO" autofocus placeholder="Nhập mã máy" />
				</view>
			</view>

			<view class="flex flex-col gap-2">
				<span class="font-bold text-[20px]">Thời gian/Time :</span>
				<view class="flex items-center border-b-2 border-black pb-1">
					<span class="clock"></span>
					<picker class="w-full ml-2 outline-none font-semibold" :range="arrayStatus" :range-key="'label'"
						@change="bindPickerTimeChange" :value="findPickerTime(formData.TIME_RANGE)">
						<view class="w-full outline-none font-bold text-[20px]">
							{{ findLabelTime(formData.TIME_RANGE) || 'Chọn thời gian' }}
						</view>
					</picker>
				</view>
			</view>

			<view class="flex flex-col gap-2">
				<span class="font-bold text-[20px]">Khảo sát viên/Surveyor :</span>
				<view class="flex items-center border-b-2 border-black pb-1">
					<span class="pen"></span>
					<input class="w-full ml-2 outline-none font-bold text-[20px]" type="text"
						v-model="formData.SURVEYOR" autofocus placeholder="Nhập MSNV" />
				</view>
			</view>

			<view class="flex flex-col gap-2">
				<span class="font-bold text-[20px]">Chuyền/Line :</span>
				<view class="flex items-center border-b-2 border-black pb-1">
					<span class="location"></span>
					<mySelectModal class="ml-2 outline-none font-bold text-[20px]" :data="dataDepartment"
						valueField="DEPARTMENT_CODE" displayField="DEPARTMENT_NAME"
						placeholder="Nhập hoặc chọn dữ liệu..." title="Danh sách lựa chọn chuyền" @select="handleSelect"
						@clear="handleClear" />
				</view>
			</view>
		</view>
		<view class="flex text-center justify-center font-bold text-lg">
			Dữ liệu báo biểu
		</view>
		<view class="flex flex-col gap-4 p-2">
			<view class="flex flex-col gap-2">
				<span class="font-bold text-[20px]">Số trạm/Station No. :</span>
				<view class="grid grid-cols-3 grid-rows-1 gap-2">
					<view class="flex items-center border-b-2 border-black pb-1">
						<span class="pen"></span>
						<picker class="w-full ml-2 outline-none font-semibold" :range="arrayStation"
							:value="indexStation" @change="bindPickerStationChange">
							<view class="w-full text-[20px] outline-none">
								{{ arrayStation[indexStation] || 'Số trạm' }}
							</view>
						</picker>
					</view>

					<view class="flex items-center border-b-2 border-black pb-1">
						<span class="pen"></span>
						<picker class="w-full ml-2 outline-none font-semibold" :range="arrayStation2"
							:value="indexStation2" @change="bindPickerStationChange2">
							<view class="w-full text-[20px] outline-none">
								{{ arrayStation2[indexStation2] || 'Số trạm' }}
							</view>
						</picker>
					</view>

					<view class="flex items-center border-b-2 border-black pb-1">
						<span class="pen"></span>
						<picker class="w-full ml-2 outline-none font-semibold" :range="arrayStation3"
							:value="indexStation3" @change="bindPickerStationChange3">
							<view class="w-full text-[20px] outline-none">
								{{ arrayStation3[indexStation3] || 'Số trạm' }}
							</view>
						</picker>
					</view>
				</view>
			</view>

			<view class="flex flex-col gap-2">
				<span class="font-bold text-[20px]">Nhiệt độ khuôn tiêu chuẩn/Mould standard temperature :</span>
				<view class="grid grid-cols-3 grid-rows-1 gap-2">
					<view class="flex items-center border-b-2 border-black pb-1">
						<span class="pen"></span>
						<input class="w-full ml-2 outline-none font-semibold" type="text"
							v-model="formData.MOULD_TEMP_STD_1" autofocus placeholder="Nhập số lượng" />
					</view>

					<view class="flex items-center border-b-2 border-black pb-1">
						<span class="pen"></span>
						<input class="w-full ml-2 outline-none font-semibold" type="text"
							v-model="formData.MOULD_TEMP_STD_2" autofocus placeholder="Nhập số lượng" />
					</view>

					<view class="flex items-center border-b-2 border-black pb-1">
						<span class="pen"></span>
						<input class="w-full ml-2 outline-none font-semibold" type="text"
							v-model="formData.MOULD_TEMP_STD_3" autofocus placeholder="Nhập số lượng" />
					</view>
				</view>
			</view>

			<view class="flex flex-col gap-2">
				<span class="font-bold text-[20px]">Nhiệt độ khuôn thực tế/Mould actual temperature :</span>
				<view class="grid grid-cols-3 grid-rows-1 gap-2">
					<view class="flex items-center border-b-2 border-black pb-1">
						<span class="pen"></span>
						<input class="w-full ml-2 outline-none font-semibold" type="text"
							v-model="formData.MOULD_TEMP_ACTUAL_1" autofocus placeholder="Nhập số lượng" />
					</view>

					<view class="flex items-center border-b-2 border-black pb-1">
						<span class="pen"></span>
						<input class="w-full ml-2 outline-none font-semibold" type="text"
							v-model="formData.MOULD_TEMP_ACTUAL_2" autofocus placeholder="Nhập số lượng" />
					</view>

					<view class="flex items-center border-b-2 border-black pb-1">
						<span class="pen"></span>
						<input class="w-full ml-2 outline-none font-semibold" type="text"
							v-model="formData.MOULD_TEMP_ACTUAL_3" autofocus placeholder="Nhập số lượng" />
					</view>
				</view>
			</view>

			<view class="flex flex-col gap-2">
				<span class="font-bold text-[20px]">Kết quả xử lý/ Result :</span>
				<radio-group @change="checkboxChange" :value="selectedValue" class="checkbox-group">
					<label class="checkbox-label" v-for="item in items" :key="item.value">
						<view>
							<radio :value="item.value" :checked="item.checked" />
						</view>
						<view>{{ item.name }}</view>
					</label>
				</radio-group>
			</view>
		</view>

		<view class="flex-1">
			<button @click="createData()" class="w-full h-full font-semibold bg-[#3acdbb] text-white">Xác nhận</button>
		</view>

	</view>
</template>

<script>
	import mySelectModal from '../../../components/mySelect2/mySelect2.vue';

	export default {
		components: {
			mySelectModal,
		},
		data() {
			return {
				dataDepartment: [],
				array: ['0', '1', '2', '3'],
				arrayStation: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
				arrayStation2: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
				arrayStation3: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
				arrayStatus: [{
						label: '6h-8h',
						value: '6h-8h'
					},
					{
						label: '8h-10h',
						value: '8h-10h'
					},
					{
						label: '10h-12h',
						value: '10h-12h'
					},
					{
						label: '12h-14h',
						value: '12h-14h'
					},
					{
						label: '14h-16h',
						value: '14h-16h'
					},
					{
						label: '16h-18h',
						value: '16h-18h'
					},
					{
						label: '18h-20h',
						value: '18h-20h'
					},
					{
						label: '20h-22h',
						value: '20h-22h'
					},
					{
						label: '22h-24h',
						value: '22h-24h'
					},
				],
				items: [{
						value: 'S',
						name: 'Đạt'
					},
					{
						value: 'F',
						name: 'Không đạt',
					}
				],
				index: 0,
				indexMachine: 0,
				indexStation: 0,
				indexStation2: 0,
				indexStation3: 0,
				isLoading: false,
				selectedValue: null,
				formData: {
					DATEE: '',
					SHIFT: 0,
					MACHINE_NO: '',
					TIME_RANGE: '',
					SURVEYOR: '',
					LINE_NO: '',
					STATION_1: 0,
					STATION_2: 0,
					STATION_3: 0,
					MOULD_TEMP_STD_1: '',
					MOULD_TEMP_STD_2: '',
					MOULD_TEMP_STD_3: '',
					MOULD_TEMP_ACTUAL_1: '',
					MOULD_TEMP_ACTUAL_2: '',
					MOULD_TEMP_ACTUAL_3: '',
					DISPOSE_RESULT: ''
				}

			};
		},
		mounted() {
			this.getDepartment();
		},
		methods: {
			goBack() {
				uni.navigateTo({
					url: '/pages/iprdReport/materialPHYLON'
				})
			},
			onDateChange(e) {
				const dateRecord = e.detail.value;
				this.formData.DATEE = this.formatDate(dateRecord);
			},
			formatDate(dateString) {
				const date = new Date(dateString);
				const day = String(date.getDate()).padStart(2, '0');
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const year = date.getFullYear();
				return `${year}/${month}/${day}`;
			},
			checkboxChange(e) {
				var selectedValue = e.detail.value[0];
				for (let item of this.items) {
					if (item.value === selectedValue) {
						item.checked = true;
					} else {
						item.checked = false;
					}
				}
				this.formData.DISPOSE_RESULT = selectedValue

				console.log(this.formData.DISPOSE_RESULT);
			},
			bindPickerTimeChange(event) {
				const selectTimeIndex = event.detail.value;
				this.formData.TIME_RANGE = this.arrayStatus[selectTimeIndex].value;

				console.log(this.formData.TIME_RANGE)
			},
			bindPickerChange: function(e) {
				console.log('Choose shift: ', e.detail.value)
				this.index = e.detail.value
				this.formData.SHIFT = this.index;
			},
			bindPickerStationChange: function(e) {
				this.indexStation = e.detail.value;
				this.formData.STATION_1 = this.arrayStation[e.detail.value];
				console.log('Selected value: ', this.formData.STATION_1);
			},
			bindPickerStationChange2: function(e) {
				this.indexStation2 = e.detail.value;
				this.formData.STATION_2 = this.arrayStation2[e.detail.value];
				console.log('Selected value 2: ', this.formData.STATION_2);
			},
			bindPickerStationChange3: function(e) {
				this.indexStation3 = e.detail.value;
				this.formData.STATION_3 = this.arrayStation3[e.detail.value];
				console.log('Selected value 3: ', this.formData.STATION_3);
			},
			bindPickerMachineChange: function(e) {
				this.indexStation3 = e.detail.value;
				this.formData.STATION_3 = this.arrayStation3[e.detail.value];
				console.log('Selected value 3: ', this.formData.STATION_3);
			},
			findPickerTime(value) {
				return this.arrayStatus.findIndex(item => item.value === value);
			},
			findLabelTime(value) {
				const findLabel = this.arrayStatus.find(item => item.value === value);
				return findLabel ? findLabel.label : null;
			},
			handleSelect(item) {
				console.log("Đã chọn:", item);
				this.formData.LINE_NO = item.DEPARTMENT_CODE;

				console.log(this.formData.LINE_NO)
			},
			handleClear() {
				console.log("Đã hủy chọn");
			},
			getDepartment() {
				this.isLoading = true;

				uni.request({
					//url: 'http://10.30.3.50:8386/api/configData/getDepartment',
					url: 'http://10.30.3.50:8386/api/configData/getDepartment',
					method: 'GET',
					success: (res) => {
						const newDataDepartment = res.data?.data || [];
						if (Array.isArray(newDataDepartment) && newDataDepartment.length > 0) {
							this.dataDepartment = newDataDepartment.map((item) => ({
								DEPARTMENT_CODE: item.DEPARTMENT_CODE,
								DEPARTMENT_NAME: item.DEPARTMENT_NAME,
							}));
						} else {
							console.error('No department data or data is empty.');
						}
					},
					fail: (error) => {
						console.error("Error fetching department data:", error);
					},
					complete: () => {
						this.isLoading = false;
					},
				});
			},
			async createData() {
				this.isLoading = true;
				try {
					// Không cần gọi lại formatDate vì DATE_DELIVERY đã được xử lý trong onDateRecordChange
					if (!this.formData.DATEE) {
						uni.showToast({
							title: "Ngày không hợp lệ",
							icon: "none",
							duration: 2000,
						});
						return;
					}

					// Sử dụng uni.request thay vì axios
					uni.request({
						url: `http://10.30.3.50:8386/api/iprdReport/createReportPHYLON`,
						method: 'POST',
						data: this.formData,
						success: (response) => {
							console.log("Create success");
							uni.showToast({
								title: "Tạo thành công",
								icon: "none",
								duration: 2000,
							});
							this.isLoading = false;
							uni.navigateTo({
								url: '/pages/iprdReport/materialPHYLON'
							});
						},
						fail: (error) => {
							console.error("Create error: " + error);
							uni.showToast({
								title: "Tạo thất bại",
								icon: "none",
								duration: 2000,
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
		},
	};
</script>

<style>
	.checkbox-group {
		display: flex;
		flex-direction: column;
		gap: 16px;
		/* Khoảng cách giữa các label */
	}

	.checkbox-label {
		display: flex;
		font-weight: bolder;
		font-size: 20px;
		align-items: center;
		gap: 8px;
		/* Khoảng cách giữa checkbox và văn bản */
		padding: 8px;
		/* Khoảng cách bên trong */
		border: 1px solid black;
		/* Viền màu xám nhạt */
		border-radius: 8px;
		/* Bo tròn các góc */
	}

	.confirm {
		background-image: url('/static/confirm.png');
		background-size: contain;
		background-repeat: no-repeat;
		width: 40px;
		height: 40px;
	}

	.add {
		background-image: url('/static/add2.png');
		background-size: contain;
		background-repeat: no-repeat;
		width: 40px;
		height: 40px;
	}

	.back {
		background-image: url('/static/left.png');
		background-size: contain;
		background-repeat: no-repeat;
		width: 40px;
		height: 40px;
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

	.scroll-container {
		height: calc(100vh - 300px);
		overflow-y: auto;
	}
</style>