<template>
	<view class="h-screen w-full bg-gradient-to-b from-blue-200 via-blue-100 to-white flex flex-col">
		<view class="flex flex-col bg-[#407bff] rounded-b-3xl gap-2 p-1">
			<view class="mx-2 flex justify-between">
				<view class="return" @click="backMenu()"></view>
				<span class="font-semibold text-white py-1 text-[20px]">
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
								<view class="flex items-center">
									<span class="font-semibold">Apache Footwear Vietnam</span>
								</view>
							</view>
							<view class="border-b border-dashed border-black border-b-2">
							</view>
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
									<picker mode="time" :value="formData.TIME_REPORT" @change="bindTimeChange">
										<view class="w-full ml-2 text-[18px] outline-none font-bold">{{formData.TIME_REPORT || '12:00'}}</view>
									</picker>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="user"></view>
									<input
										class="w-full ml-2 outline-none text-[18px] font-bold" 
										type="text"
										v-model="formData.STAFF_CHECK"
										autofocus 
										placeholder="Nhập QC" 
									/>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="pen"></view>
									<input
										class="w-full ml-2 outline-none text-[18px] font-bold" 
										type="text"
										v-model="formData.PO"
										autofocus 
										placeholder="Nhập PO" 
									/>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="pen"></view>
									<view class="flex" >
										<!-- Dropdown MySelect -->
										<my-select
											:data="dataART"
											v-model="selectedART"
											valueField="PROD_NO"
											placeholder="Chọn ART"
											@select="handleARTSelect"
										/>
									</view>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="pen"></view>
									<span class="w-full ml-2 outline-none text-[18px] font-bold">{{formData.MODEL || "Model"}}</span>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="location"></view>
									<picker
									    @change="bindPickerDepartmentChange"
									    :value="formData.LINE"
									    :range="departmentList">
									    <view class="w-full ml-2 text-[18px] outline-none font-bold">
									      {{ formData.LINE || 'Chọn chuyền' }}
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
							<scroll-view scroll-y="true" style="overflow-y: auto; height: calc(83vh - 300px);" >
								<view class="flex justify-center items-center text-center">
									<span class="font-bold text-[18px] mt-2 text-blue-500">DỮ LIỆU</span>
								</view>
								<view class="flex flex-col">
									<view class="flex flex-col gap-2 space-y-2 mt-2">
										<view class="flex flex-col gap-2">
											<h2 class="font-bold text-[18px]">Tên liệu</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<picker
												    @change="bindPickerMaterialChange"
												    :value="formData.MATERIAL"
												    :range="materialList">
												    <view class="w-full ml-2 text-[18px] outline-none font-bold">
												      {{ getMaterialName(formData.MATERIAL) }}
												    </view>
												</picker>
											</view>
										</view>
										
										<view class="flex flex-col gap-2">
											<h2 class="font-bold text-[18px]">Vị trí 1</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  v-model="formData.MATERIAL_VT_1"
												  type="text" 
												  autofocus 
												  placeholder="Nhập vị trí 1"
												/>
											</view>
										</view>
										
										<view class="flex flex-col gap-2">
											<h2 class="font-bold text-[18px]">Vị trí 2</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  v-model="formData.MATERIAL_VT_2"
												  type="text" 
												  autofocus 
												  placeholder="Nhập vị trí 2"
												/>
											</view>
										</view>
										<view class="flex flex-col gap-2">
											<h2 class="font-bold text-[18px]">Vị trí 3</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  v-model="formData.MATERIAL_VT_3"
												  type="text" 
												  autofocus 
												  placeholder="Nhập vị trí 3"
												/>
											</view>
										</view>
										<view class="flex flex-col gap-2">
											<h2 class="font-bold text-[18px]">Trung bình</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<span :class="[average.color, 'w-full ml-2 outline-none font-bold']">
												    {{ average.average }}%
												</span>
											</view>
										</view>
										<view class="flex flex-col gap-2">
										    <h2 class="font-bold text-[18px]">Kết quả</h2>
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
								</view>
							</scroll-view>
							<view class="border-b border-dashed border-black border-b-2 mt-2">
							</view>
							<view class="flex w-full text-lg">
								<!-- Buttons -->
								<view class="w-full">
									<button @click="createData()" class="w-full text-white mt-2 bg-[#407bff] rounded-lg font-semibold transition">Tạo</button>
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
				dataART: [],
				dataDepartment: [],
				dataMaterial: [],
				dataDeviceNeedle: [],
				selectedART: "",
				selectedValue: null,
				selectedDeviceNeedle: '',
				items: [{
						value: 'S',
						name: 'Đạt',
						checked: 'false'
					},
					{
						value: 'F',
						name: 'Không đạt',
						checked: 'false'
					},
				],
				formData: {
					DATE_REPORT: '',
					TIME_REPORT: '',
					PO: '',
					ART: '',
					MODEL: '',
					MATERIAL: null, 
					STAFF_CHECK: '',
					REMARK: '',
					LINE: null,
					MATERIAL_VT_1: '',
					MATERIAL_VT_2: '',
					MATERIAL_VT_3: '',
					AVERAGE_MATERIAL: null,
					STATUS_MATERIAL: ''
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
			materialList() {
				return this.dataMaterial.map(item => item.MATERIAL_NAME);
			},
			deviceNeedle() {
				return this.dataDeviceNeedle.map(item => item.NAME_DEVICE);
			},
			average() {
				const vt1 = parseFloat(this.formData.MATERIAL_VT_1);
				const vt2 = parseFloat(this.formData.MATERIAL_VT_2);
				const vt3 = parseFloat(this.formData.MATERIAL_VT_3);
				      
				if (isNaN(vt1) || isNaN(vt2) || isNaN(vt3)) {
				    return { text: 'Không có dữ liệu', color: 'text-gray-500', average: 0 };
				}
				      
				const averageCal = (vt1 + vt2 + vt3) / 3;
				const roundedAverage = parseFloat(averageCal.toFixed(1));
				this.formData.AVERAGE_MATERIAL = roundedAverage;
				
				if (averageCal <= 17 && this.formData.MATERIAL === 1) {
					return { text: 'Đạt', value: 'S', color: 'text-emerald-500', average: roundedAverage };
				} else if (averageCal <= 7 && this.formData.MATERIAL === 2) {
					return { text: 'Đạt', value: 'S', color: 'text-emerald-500', average: roundedAverage };
				} else if (averageCal <= 2 && this.formData.MATERIAL === 3) {
					return { text: 'Đạt', value: 'S', color: 'text-emerald-500', average: roundedAverage };
				} else if (averageCal <= 6 && (this.formData.MATERIAL === 4 || this.formData.MATERIAL === 5 || this.formData.MATERIAL === 6)) {
					return { text: 'Đạt', value: 'S', color: 'text-emerald-500', average: roundedAverage };
				} else {
					return { text: 'Vượt tiêu chuẩn', value: 'F', color: 'text-red-500', average: roundedAverage };
				}
				
			}
		},
		mounted() {
			this.getPlant()
			this.getDeviceNeedle()
			this.getART()
			this.getMaterial()
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
				this.formData.STATUS_MATERIAL = selectedValue
			
			    console.log(this.formData.STATUS_MATERIAL);
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
				this.formData.TIME_REPORT = e.detail.value;
			},
			bindPickerDepartmentChange(e) {
			    const selectedIndex = e.detail.value;
			    const selectedDepartment = this.dataDepartment[selectedIndex];
			    this.formData.LINE = selectedDepartment.DEPARTMENT_CODE;
				
				//console.log(this.formData.DEPARTMENT)
			},
			bindPickerMaterialChange(e) {
			    const selectedIndex = e.detail.value;
			    const selectedMaterial = this.dataMaterial[selectedIndex];
			    this.formData.MATERIAL = selectedMaterial.MATERIAL_CODE;
				
				//console.log(this.formData.MATERIAL)
			},
			getMaterialName(code) {
				const materialName = this.dataMaterial.find(item => item.MATERIAL_CODE === code);
				return materialName ? materialName.MATERIAL_NAME : 'Chọn liệu';
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
			getMaterial() {
			    this.isLoading = true;
			
			    uni.request({
			        url: "http://10.30.3.50:8386/api/configData/getMaterial",
			        method: 'GET',
			        success: (res) => {
			            const newDataMaterial = res.data?.data || [];
			            if (Array.isArray(newDataMaterial) && newDataMaterial.length > 0) {
			                this.dataMaterial = [...this.dataMaterial, ...newDataMaterial];
			            } else {
			                console.error('No material data or data is empty.');
			            }
			        },
			        fail: (error) => {
			            console.error("Error fetching material data:", error);
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
			getART() {
			    this.isLoading = true;
			
			    uni.request({
			        url: "http://10.30.3.50:8386/api/configData/getART",
			        method: 'GET',
			        success: (res) => {
			            const newDataART = res.data?.data || [];
			
			            if (Array.isArray(newDataART) && newDataART.length > 0) {
			                this.dataART = [...this.dataART, ...newDataART];
			            } else {
			                console.error('No ART data or data is empty.');
			            }
			        },
			        fail: (error) => {
			            console.error("Error fetching ART data:", error);
			        },
			        complete: () => {
			            this.isLoading = false;
			        }
			    });
			},
			async createData() {
			    this.isLoading = true;
			    try {
			        // Không cần gọi lại formatDate vì DATE_DELIVERY đã được xử lý trong onDateRecordChange
			        if (!this.formData.DATE_REPORT) {
			            uni.showToast({
			                title: "Ngày không hợp lệ",
			                icon: "none",
			                duration: 2000,
			            });
			            return;
			        } else if (!this.STATUS_MATERIAL) {
			            uni.showToast({
			                title: "Kết quả chưa được chọn",
			                icon: "none",
			                duration: 2000
			            })
			        }
			
			        // Sử dụng uni.request thay vì axios
			        uni.request({
			            url: "http://10.30.3.50:8386/api/prodReport/createReportMaterialControl",
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
			                    url: '/pages/prodReport/prodMaterialProduction'
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
			},
			handleARTSelect(selectedItem) {
			    console.log("ART đã chọn:", selectedItem);
			
			    // Cập nhật giá trị cho formData
			    this.formData.ART = selectedItem.PROD_NO;
			    this.formData.MODEL = selectedItem.NAME_S;
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