<template>
	<view class="h-screen w-full bg-gradient-to-b from-blue-200 via-blue-100 to-white flex flex-col">
		<view class="flex flex-col bg-[#407bff] rounded-b-3xl gap-2 p-1">
			<view class="mx-2 flex justify-between">
				<view class="return" @click="backMenu()"></view>
				<span class="font-semibold text-white py-1">
					Tạo biểu hiệu chỉnh máy rà kim
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
								<view class="flex items-center p-1">
									<span class="font-semibold">Apache Footwear Vietnam</span>
								</view>
							</view>
							<view class="border-b border-dashed border-black border-b-2"></view>
							<view class="flex justify-center items-center text-center">
								<span class="font-bold text-[20px] mt-1 text-blue-500">THÔNG TIN CƠ BẢN</span>
							</view>
							<view class="grid grid-cols-3 grid-rows-1 gap-2 text-sm mt-2">
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="calendar"></view>
									<picker
										class="w-full ml-2 outline-none font-bold"
										mode="date"
										:value="formData.DATE_REPORT"
										@change="onDateChange"
									>
										<view class="w-full ml-2 text-[18px] outline-none font-bold">
											{{ formData.DATE_REPORT || 'Ngày' }}
										</view>
									</picker>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="clock"></view>
									<picker mode="time" :value="formData.TIME" @change="bindTimeChange">
										<view class="w-full ml-2 text-[18px] outline-none font-bold">{{formData.TIME || '12:00'}}</view>
									</picker>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="pen"></view>
									<input
										class="w-full ml-2 outline-none text-[18px] font-bold" 
										type="text"
										v-model="formData.QC"
										autofocus 
										placeholder="Nhập QC" 
									/>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="pen"></view>
									<my-select
										:data="dataDeviceNeedle"
										v-model="selectedDeviceNeedle"
										valueField="NAME_DEVICE"
										placeholder="Chọn thiết bị"
										@select="handleDeviceNeedleSelect"
									/>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="location"></view>
									<picker
									    @change="bindPickerDepartmentChange"
									    :value="formData.DEPARTMENT_CODE"
									    :range="departmentList">
									    <view class="w-full ml-2 text-[18px] outline-none font-bold">
									      {{ formData.DEPARTMENT_CODE || 'Chọn chuyền' }}
									    </view>
									</picker>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="pen"></view>
									<input
										class="w-full ml-2 outline-none text-[18px] font-bold" 
										type="text"
										v-model="formData.REMARK"
										autofocus 
										placeholder="Nhập ghi chú" 
									/>
								</view>
							</view>
							<view class="border-b border-dashed border-black border-b-2">
							</view>
							<scroll-view scroll-y="true" style="overflow-y: auto; height: calc(100vh - 300px);" >
								<view class="flex justify-center items-center text-center">
									<span class="font-bold text-[20px] mt-1 text-blue-500">DỮ LIỆU</span>
								</view>
								<view class="flex flex-col">
									<view class="flex flex-col gap-2 space-y-2 mt-2">
										<view class="flex flex-col gap-2">
											<h2 class="font-bold text-[18px]">Trái / (Vị trí / 1,4,7)</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  type="text"
												   v-model="formData.FAIL_LEFT_POSITION"
												  autofocus
												  placeholder="Nhập..." 
												/>
											</view>
										</view>
										
										<view class="flex flex-col gap-4">
											<h2 class="font-bold text-[18px]">Giữa / (Vị trí / 2,5,8)</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  type="text"
												   v-model="formData.FAIL_MIDDLE_POSITION"
												  autofocus 
												  placeholder="Nhập..." 
												/>
											</view>
										</view>
										
										<view class="flex flex-col gap-4">
											<h2 class="font-bold text-[18px]">Phải / (Vị trí / 3,6,9)</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  type="text" 
												  v-model="formData.FAIL_RIGHT_POSITION"
												  autofocus 
												  placeholder="Nhập..." 
												/>
											</view>
										</view>
										<view class="flex flex-col gap-2">
										    <h2 class="font-bold text-[18px]">Trạng thái</h2>
											<radio-group @change="checkboxChange" :value="selectedValue" class="checkbox-group">
											  <label class="checkbox-label" v-for="item in items" :key="item.value">
											    <view>
											      <radio :value="item.value" :checked="item.value === selectedValue" />
											    </view>
											    <view>{{ item.name }}</view>
											  </label>
											</radio-group>
										</view>
									</view>
								</view>
							</scroll-view>
							<view class="border-b border-dashed border-black border-b-2">
							</view>
							<view class="flex w-full text-lg">
								<!-- Buttons -->
								<view class="w-full">
									<button @click="createData()" class="w-full mt-2 text-white bg-[#407bff] rounded-lg font-semibold transition">Tạo</button>
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
	import mySelect from '../../../components/mySelect/mySelect.vue'
	export default {
		components: {
		    mySelect,
		},
		data() {
			return {
				data: null,
				dataDepartment: [],
				dataDeviceNeedle: [],
				selectedValue: null,
				selectedDeviceNeedle: '',
				items: [{
						value: '7',
						name: 'Đạt',
						checked: 'false'
					},
					{
						value: '9',
						name: 'Không đạt',
						checked: 'false'
					},
				],
				formData: {
					DATE_REPORT : '',
					TIME: '',
					QC: '',
					METAL_NO: null,
					DEPARTMENT_CODE: null,
					REMARK: '',
					FAIL_LEFT_POSITION: '',
					FAIL_MIDDLE_POSITION: '',
					FAIL_RIGHT_POSITION: '',
					PASS_FAIL: ''
				},
				isLoading: false,
				items: [
					{
						value: '7',
						name: 'Đạt'
					},
					{
						value: '9',
						name: 'Không đạt',
					}
				]
			}
		},
		computed: {
			departmentList() {
				return this.dataDepartment.map(item => item.DEPARTMENT_CODE);
			},
			deviceNeedle() {
				return this.dataDeviceNeedle.map(item => item.NAME_DEVICE);
			}
		},
		mounted() {
			this.getPlant()
			this.getDeviceNeedle()
		},
		methods: {
			checkboxChange(e) {
			    var selectedValue = e.detail.value[0];
			    for (let item of this.items) {
			      if (item.value === selectedValue) {
			        item.checked = true;
			      } else {
			        item.checked = false;
			      }
			    }
				this.formData.PASS_FAIL = selectedValue
			
			    console.log(this.formData.PASS_FAIL);
			  },
			backMenu() {
				uni.navigateTo({
					url:'/pages/prodReport/prodNeedleCorrection'
				})
			},
			formatDate(dateString) {
			    const date = new Date(dateString);
			    const day = String(date.getDate()).padStart(2, '0');
			    const month = String(date.getMonth() + 1).padStart(2, '0');
			    const year = date.getFullYear();
			    return `${year}/${month}/${day}`;
			},
			onDateChange(e) {
				const dateRecord = e.detail.value;
				this.formData.DATE_REPORT = this.formatDate(dateRecord);
			},
			bindTimeChange(e) {
				this.formData.TIME = e.detail.value;
			},
			bindPickerDepartmentChange(e) {
			    const selectedIndex = e.detail.value;
			    const selectedDepartment = this.dataDepartment[selectedIndex];
			    this.formData.DEPARTMENT_CODE = selectedDepartment.DEPARTMENT_CODE;
				
				//console.log(this.formData.DEPARTMENT)
			},
			getDepartmentName(code) {
				const departmentName = this.dataDepartment.find(item => item.DEPARTMENT_CODE === code);
				return departmentName ? departmentName.DEPARTMENT_CODE : 'Chọn bộ phận';
			},
			bindPickerDeviceNeedleChange(e) {
			    const selectedIndex = e.detail.value;
			    const selectedDepartment = this.dataDepartment[selectedIndex];
			    this.formData.METAL_NO = selectedDepartment.NAME_DEVICE;
				
				//console.log(this.formData.DEPARTMENT)
			},
			getDeviceNeedle(code) {
				const deviceName = this.dataDeviceNeedle.find(item => item.NAME_DEVICE === code);
				return deviceName ? deviceName.NAME_DEVICE : 'Chọn thiết bị';
			},
			handleDeviceNeedleSelect(selectedItem) {
				// Cập nhật giá trị cho formData
				this.formData.METAL_NO = selectedItem.NAME_DEVICE;
			},
			getPlant() {
			    this.isLoading = true;
			
			    uni.request({
			        url: "http://10.30.3.50:8386/api/configData/getDepartment",
			        method: 'GET',
			        success: (res) => {
			            const newDataMaterial = res.data?.data || [];
			
			            if (Array.isArray(newDataMaterial) && newDataMaterial.length > 0) {
			                this.dataDepartment = [...this.dataDepartment, ...newDataMaterial];
			            } else {
			                console.error('No department data or data is empty.');
			            }
			        },
			        fail: (error) => {
			            console.error("Error fetching department data:", error);
			        },
			        complete: () => {
			            this.isLoading = false;
			        }
			    });
			},
			getDeviceNeedle() {
			    this.isLoading = true;
			
			    uni.request({
			        url: "http://10.30.3.50:8386/api/configData/getDeviceNeedle",
			        method: 'GET',
			        success: (res) => {
			            const newDataDeviceNeedle = res.data?.data || [];
			
			            if (Array.isArray(newDataDeviceNeedle) && newDataDeviceNeedle.length > 0) {
			                this.dataDeviceNeedle = [...this.dataDeviceNeedle, ...newDataDeviceNeedle];
			            } else {
			                console.error('No device data or data is empty.');
			            }
			        },
			        fail: (error) => {
			            console.error("Error fetching device data:", error);
			        },
			        complete: () => {
			            this.isLoading = false;
			        }
			    });
			},
			async createData() {
			    this.isLoading = true;
			    try {
			        // Kiểm tra trường hợp không có ngày hợp lệ
			        if (!this.formData.DATE_REPORT) {
			            uni.showToast({
			                title: "Ngày không hợp lệ",
			                icon: "none",
			                duration: 2000,
			            });
			            return;
			        }
			
			        // Sử dụng uni.request thay vì axios
			        uni.request({
			            url: "http://10.30.3.50:8386/api/prodReport/createReportNeedle",
			            method: 'POST',
			            data: this.formData,
			            success: (response) => {
			                console.log("Create success");
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
			                    url: '/pages/prodReport/prodNeedleCorrection'
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
	
	.checkbox-group {
	  display: flex;
	  flex-direction: column;
	  gap: 16px; /* Khoảng cách giữa các label */
	}
	
	.checkbox-label {
	  display: flex;
	  font-weight: bolder;
	  font-size: 20px;
	  align-items: center;
	  gap: 8px; /* Khoảng cách giữa checkbox và văn bản */
	  padding: 8px; /* Khoảng cách bên trong */
	  border: 1px solid #e5e7eb; /* Viền màu xám nhạt */
	  border-radius: 8px; /* Bo tròn các góc */
	}
</style>