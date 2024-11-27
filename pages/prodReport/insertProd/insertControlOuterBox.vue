<template>
	<view class="flex flex-col bg-gray-200 h-screen w-full">
		<view class="flex flex-col bg-[#407bff] rounded-b-3xl gap-4 p-2">
			<view class="mx-2 flex justify-between">
				<svg @click="backMenu()" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.3508 12.7499L11.2096 17.4615L10.1654 18.5383L3.42264 11.9999L10.1654 5.46148L11.2096 6.53833L6.3508 11.2499L21 11.2499L21 12.7499L6.3508 12.7499Z" fill="#ffff"></path> </g></svg>
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
									<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
									  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
									</svg>
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
									<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
									  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
									</svg>
									<input
										class="w-full ml-2 outline-none text-xl font-bold" 
										type="text"
										v-model="formData.QIP_STAFF"
										autofocus 
										placeholder="Nhập QC" 
									/>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
									  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
									</svg>
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
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
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
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
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
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
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
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
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
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
												</svg>
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
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
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
			
			    axios.get("/configData/getPlant")
			        .then((res) => {
			            //console.log('Material (JSON):', JSON.stringify(res.data, null, 2));
			
			            const newDataMaterial = res.data?.data || [];
			
			            if (Array.isArray(newDataMaterial) && newDataMaterial.length > 0) {
			                this.dataDepartment = [...this.dataDepartment, ...newDataMaterial];
			            } else {
			                console.error('No department data or data is empty.');
			            }
			        })
			        .catch((error) => {
			            console.error("Error fetching department data:", error);
			        })
			        .finally(() => {
			            this.isLoading = false;
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
					
					//console.log(this.formData)
			
			        await axios.post(`/prodReport/createControlOuterBox`, this.formData);
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
			            url: '/pages/prodReport/prodControlOuterBox'
			        });
			    }
			},
		}
	}
</script>

<style>
</style>