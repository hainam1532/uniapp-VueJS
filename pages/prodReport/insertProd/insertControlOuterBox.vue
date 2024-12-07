<template>
	<view class="flex flex-col bg-gray-200 h-screen w-full">
		<view class="flex flex-col bg-[#407bff] rounded-b-3xl gap-4 p-2">
			<view class="mx-2 flex justify-between">
				<view class="return" @click="backMenu()"></view>
				<span class="font-semibold text-white py-1">
					Tạo biểu quản khống tem ngoài thùng
				</span>
				<view class="flex justify-center items-center">
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
								<svg class="w-6 h-6 text-sky-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
								  <path d="M11.782 5.72a4.773 4.773 0 0 0-4.8 4.173 3.43 3.43 0 0 1 2.741-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.934-2.865 3.137-3.921-.969 1.379-2.44 2.207-4.259 1.231-1.253-.673-2.19-3.438-5.959-3.318ZM6.8 11.979A4.772 4.772 0 0 0 2 16.151a3.431 3.431 0 0 1 2.745-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.933-2.865 3.137-3.921-.97 1.379-2.44 2.208-4.259 1.231-1.253-.673-2.19-3.443-5.963-3.317Z"/>
								</svg>
							</view>
							<view class="border-b border-dashed border-black border-b-2 my-5"></view>
							<view class="flex justify-center items-center text-center">
								<span class="font-bold text-2xl text-blue-500">THÔNG TIN CƠ BẢN</span>
							</view>
							<view class="flex flex-col gap-4 text-sm mt-4">
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="calendar"></view>
									<picker
										class="w-full ml-2 outline-none font-bold"
										mode="date"
										:value="formData.DATE_RECORD"
										@change="onDateChange"
									>
										<view class="w-full ml-2 text-xl outline-none font-bold">
											{{ formData.DATE_RECORD || 'Ngày' }}
										</view>
									</picker>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="calendar"></view>
									<input
										class="w-full ml-2 outline-none text-xl font-bold" 
										type="text"
										v-model="formData.QIP_STAFF"
										autofocus 
										placeholder="Nhập QC" 
									/>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="pen"></view>
									<input
										class="w-full ml-2 outline-none text-xl font-bold" 
										type="text"
										v-model="formData.STAMP_TYPE"
										autofocus 
										placeholder="Nhập tên liệu" 
									/>
								</view>
							</view>
							<view class="border-b border-dashed border-black border-b-2 my-5">
								<view class="absolute rounded-full w-5 h-5 -mt-2 -left-2"></view>
								<view class="absolute rounded-full w-5 h-5 -mt-2 -right-2"></view>
							</view>
							<scroll-view scroll-y="true" style="overflow-y: auto; height: calc(72vh - 300px);" >
								<view class="flex justify-center items-center text-center">
									<span class="font-bold text-2xl text-blue-500">DỮ LIỆU</span>
								</view>
								<view class="flex flex-col">
									<view class="flex flex-col gap-4 space-y-4 mt-2">
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Số lượng lãnh</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  type="text"
												   v-model="formData.QTY_SALARY"
												  autofocus
												  placeholder="Số lượng lãnh" 
												/>
											</view>
										</view>
										
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Số lượng sử dụng</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  type="text"
												   v-model="formData.QTY_USE"
												  autofocus 
												  placeholder="Số lượng sử dụng" 
												/>
											</view>
										</view>
										
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Số lượng hư hỏng</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  type="text" 
												  v-model="formData.QTY_DAME"
												  autofocus 
												  placeholder="Số lượng hư hỏng" 
												/>
											</view>
										</view>
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Số lượng còn lại</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  type="text" 
												  v-model="formData.QTY_REMAIN"
												  autofocus 
												  placeholder="Số lượng còn lại" 
												/>
											</view>
										</view>
										
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Bộ phận</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="location"></view>
												<picker
												    @change="bindPickerDepartmentChange" 
												    :value="formData.DEPARTMENT"
												    :range="departmentList">
												    <view class="w-full ml-2 outline-none font-bold">
												      {{ getDepartmentName(formData.DEPARTMENT) }}
												    </view>
												</picker>
											</view>
										</view>
									
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Ghi chú</h2>
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
				dataDepartment: [],
				formData: {
					DATE_RECORD : '',
					STAMP_TYPE: '',
					QTY_SALARY: '',
					QTY_USE: '',
					QTY_DAME: '',
					QTY_REMAIN: '',
					REMARK: '',
					DEPARTMENT: null,
					QIP_STAFF: ''
				},
				isLoading: false
			}
		},
		computed: {
			departmentList() {
				return this.dataDepartment.map(item => item.PLANT);
			},
		},
		mounted() {
			this.getPlant()
		},
		methods: {
			backMenu() {
				uni.navigateTo({
					url:'/pages/prodReport/prodControlOuterBox'
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
				this.formData.DATE_RECORD = this.formatDate(dateRecord);
			},
			bindPickerDepartmentChange(e) {
			    const selectedIndex = e.detail.value;
			    const selectedDepartment = this.dataDepartment[selectedIndex];
			    this.formData.DEPARTMENT = selectedDepartment.PLANT;
				
				//console.log(this.formData.DEPARTMENT)
			},
			getDepartmentName(code) {
				const departmentName = this.dataDepartment.find(item => item.PLANT === code);
				return departmentName ? departmentName.PLANT : 'Chọn bộ phận';
			},
			getPlant() {
			    this.isLoading = true;
			
			    uni.request({
			        url: "http://10.30.3.50:8386/api/configData/getPlant",
			        method: 'GET',
			        success: (res) => {
			            // console.log('Plant data:', JSON.stringify(res.data, null, 2));
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
			async createData() {
			    this.isLoading = true;
			    try {
			        // Không cần gọi lại formatDate vì DATE_DELIVERY đã được xử lý trong onDateRecordChange
			        if (!this.formData.DATE_RECORD) {
			            uni.showToast({
			                title: "Ngày không hợp lệ",
			                icon: "none",
			                duration: 2000,
			            });
			            return;
			        }
			
			        // Sử dụng uni.request thay vì axios
			        uni.request({
			            url: `http://10.30.3.50:8386/api/prodReport/createControlOuterBox`,
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
			                    url: '/pages/prodReport/prodControlOuterBox'
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