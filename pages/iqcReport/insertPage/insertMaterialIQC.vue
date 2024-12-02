<template>
	<view class="flex h-screen bg-gray-100 overflow-auto">
	  <view class="bg-white w-full shadow-lg overflow-hidden">
	    <!-- Header -->
	    <view class="bg-[#407bff] text-white text-center py-8 rounded-b-full relative">
	      <h1 class="text-2xl font-semibold">Tạo báo cáo</h1>
	      <view class="absolute bg-[#407bff] w-16 h-16 rounded-full flex items-center justify-center border-4 border-white -bottom-8 left-1/2 transform -translate-x-1/2">
			<view class="circle"></view>
	      </view>
	    </view>
	
	    <!-- Form -->
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
			<view class="p-4 pt-16 space-y-6">
				<view class="flex items-center">
					<span class="font-bold text-xl">Thông tin cơ bản :</span>
				</view>
				<!-- Date report Input -->
				<view class="flex items-center border-b border-gray-300 pb-2">
					<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
					</svg>
					<picker
						mode="date"
						:value="formData.date_record"
						@change="onDateRecordChange"
					>
					  <view class="w-full ml-2 outline-none font-bold">{{ formData.date_record || 'Ngày nhập' }}</view>
					</picker>
				</view>
				<!-- date wh Input -->
				<view class="flex items-center border-b border-gray-300 pb-2">
					<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
					</svg>
					<picker
						mode="date"
						:value="formData.date_wh"
						@change="onDateWHChange"
					>
					  <view class="w-full ml-2 outline-none font-bold">{{ formData.date_wh || 'Ngày nhập kho' }}</view>
					</picker>
				</view>
			  
				<!-- Time Input -->
				<view class="flex items-center border-b border-gray-300 pb-2">
					<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
					</svg>
					<picker mode="time" :value="formData.time_report" @change="bindTimeChange">
						<view class="w-full ml-2 outline-none font-bold">{{formData.time_report || '12:00'}}</view>
					</picker>
				</view>
			  
				<!-- Select area -->
				<view class="flex items-center border-b border-gray-300 pb-2">
					<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
					  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
					</svg>
					<picker 
					  :range="array" 
					  :range-key="'label'" 
					  @change="bindPickerAreaChange" 
					  :value="findPickerIndex(formData.measurement_area)"
					>
					  <view class="w-full ml-2 outline-none font-bold">
					    {{ findLabelByValue(formData.measurement_area) || 'Chọn khu vực' }}
					  </view>
					</picker>
				</view>
				
				<!-- Input material -->
				<view class="flex items-center border-b border-gray-300 pb-2">
					<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
					</svg>
					<input
					  class="w-full ml-2 outline-none font-bold" 
					  v-model="formData.name_material"
					  type="text" 
					  autofocus 
					  placeholder="Nhập tên liệu" 
					/>
				</view>
				
				<!-- Input material number -->
				<view class="flex items-center border-b border-gray-300 pb-2">
					<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"/>
					</svg>
					<input
					  class="w-full ml-2 outline-none font-bold" 
					  v-model="formData.material_lot"
					  type="text" 
					  autofocus 
					  placeholder="Nhập số lô" 
					/>
				</view>
				
				<!-- Input user -->
				<view class="flex items-center border-b border-gray-300 pb-2">
					<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"/>
					</svg>
					<input
					  class="w-full ml-2 outline-none font-bold" 
					  v-model="formData.staff_check"
					  type="text" 
					  autofocus 
					  placeholder="Nhập mã số nhân viên" 
					/>
				</view>
				
				<!-- Input remark -->
				<view class="flex items-center border-b border-gray-300 pb-2">
					<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z"/>
					</svg>
					<textarea 
						class="w-full ml-2 outline-none font-bold" 
						@blur="bindTextAreaBlur" 
						auto-height 
						placeholder="Nhập ghi chú"
					/>
				</view>

				<view class="flex items-center">
					<span class="font-bold text-xl">Độ ẩm thực tế (%)</span>
				</view>
				<!-- Select material -->
				<view class="flex items-center border-b border-gray-300 pb-2">
					<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"/>
					</svg>
					<picker 
					    @change="bindPickerMaterialChange" 
					    :value="formData.material" 
					    :range="materialList">
					    <view class="w-full ml-2 outline-none font-bold">
					      {{ getMaterialName(formData.material) }}
					    </view>
					</picker>
				</view>
				
				<!-- Input location 1 -->
				<view class="flex items-center border-b border-gray-300 pb-2">
					<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
					</svg>
					<input
					  class="w-full ml-2 outline-none font-bold" 
					  v-model="formData.material_vt_1"
					  type="text" 
					  autofocus 
					  placeholder="Nhập vị trí 1"
					/>
				</view>
				
				<!-- Input location 2 -->
				<view class="flex items-center border-b border-gray-300 pb-2">
					<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
					</svg>
					<input
					  class="w-full ml-2 outline-none font-bold" 
					  v-model="formData.material_vt_2"
					  type="text" 
					  autofocus 
					  placeholder="Nhập vị trí 2"
					/>
				</view>
				
				<!-- Input location 3 -->
				<view class="flex items-center border-b border-gray-300 pb-2">
					<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
					</svg>
					<input
					  class="w-full ml-2 outline-none font-bold" 
					  v-model="formData.material_vt_3"
					  type="text" 
					  autofocus 
					  placeholder="Nhập vị trí 3"
					/>
				</view>
				
				<!-- Average -->
				<view class="flex items-center border-b border-gray-300 pb-2">
					<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm6-2a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0 0h-1a5 5 0 0 1-5-5v-.5"/>
					</svg>
					<span :class="[average.color, 'w-full ml-2 outline-none font-bold']">
					    {{ average.average }}%
					</span>
				</view>
				
				<!-- Status result -->
				<view class="flex items-center border-b border-gray-300 pb-2">
					<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
					</svg>
					<picker
					  :range="arrayStatus" 
					  :range-key="'label'" 
					  @change="bindPickerStatusChange" 
					  :value="findPickerIndexStatus(formData.status_material)"
					>
					  <view class="w-full ml-2 outline-none font-bold">
					    {{ findLabelStatus(formData.status_material) || 'Chọn trạng thái' }}
					  </view>
					</picker>
				</view>
				
				<view class="flex flex-col gap-2">
					<span class="font-bold text-sm text-red-500">- Ghi chú</span>
					<view class="flex flex-col gap-2">
						<view class="flex text-sm">
							<span class="font-bold">1.Tiêu chuẩn độ ẩm/</span>
							<span class="text-blue-500 font-bold">Humidity Standard :</span>
						</view>
						<view class="flex flex-col gap-2 ml-4 text-sm font-bold">
							<span>1. Da : ≤ 17.0%</span>
							<span>2. Bông, tơ tằm và sợi tổng hợp : ≤ 7.0%</span>
							<span>3. TPU/PVC : ≤ 2.0%</span>
							<span>4. Giấy đóng gói,hộp trong,thùng ngoài : ≤ 6.0%</span>
						</view>
					</view>
					<view class="flex flex-col gap-2">
						<view class="flex text-sm">
							<span class="font-bold">2.Tần suất kiểm tra/</span>
							<span class="text-blue-500 font-bold">Frequency :</span>
						</view>
						<view class="flex flex-col gap-2 ml-4 text-sm font-bold">
							<span>- Rút kiểm ngẫu nhiên 3 đôi/chuyền/ngày</span>
							<span class="text-blue-400">- Randomly inspection 3 pairs/line/day</span>
							<span>- Lấy giá trị trung bình của 3 lần đo trên mỗi mẫu vật liệu</span>
							<span class="text-blue-400">- Take the average of 3 measurements per sample of material</span>
						</view>
					</view>
				</view>
			  
			</view>
		</scroll-view>
		
		<view class="p-4 pt-6">
			<!-- Buttons -->
			<view class="space-y-4">
				<button @click="createReport()" class="w-full py-3 text-white bg-[#407bff] rounded-lg font-semibold transition">Tạo</button>
				<button @click="returnPage()" class="w-full py-3 text-[#407bff] border border-[#407bff] rounded-lg font-semibold hover:[#407bff] transition">Quay về</button>
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
				dataMaterial: [],
				isLoading: false,
				index: 0,
				indexStatus: 0,
				time: '12:01',
				array: [
					{ label: 'Liệu mới về', value: 1 },
					{ label: 'Liệu lưu trữ trong đạt', value: 2 },
					{ label: 'Liệu chuẩn bị phát cho hiện trường', value: 3 },
				],
				arrayStatus: [
					{ label: 'Đạt̀', value: 'S' },
					{ label: 'Không đạt', value: 'F' },
				],
				formData: {
					date_record: '',
					date_wh: '',
					time_report: '',
					measurement_area: '',
					material: null,
					material_vt_1: '',
					material_vt_2: '',
					material_vt_3: '',
					material_lot: '',
					staff_check: '',
					remark: '',
					name_material: '',
					average_material: null,
					status_material: '',
				}
			}
		},
		computed: {
			materialList() {
				return this.dataMaterial.map(item => item.MATERIAL_NAME);
			},
			average() {
				const vt1 = parseFloat(this.formData.material_vt_1);
				const vt2 = parseFloat(this.formData.material_vt_2);
				const vt3 = parseFloat(this.formData.material_vt_3);
				      
				if (isNaN(vt1) || isNaN(vt2) || isNaN(vt3)) {
				    return { text: 'Không có dữ liệu', color: 'text-gray-500', average: 0 };
				}
				      
				const averageCal = (vt1 + vt2 + vt3) / 3;
				const roundedAverage = parseFloat(averageCal.toFixed(1));
				this.formData.average_material = roundedAverage;
				
				if (averageCal < 17 && this.formData.material === 1) {
					return { text: 'Đạt', value: 'S', color: 'text-emerald-500', average: roundedAverage };
				} else if (averageCal < 7 && this.formData.material === 2) {
					return { text: 'Đạt', value: 'S', color: 'text-emerald-500', average: roundedAverage };
				} else if (averageCal < 2 && this.formData.material === 3) {
					return { text: 'Đạt', value: 'S', color: 'text-emerald-500', average: roundedAverage };
				} else if (averageCal < 6 && (this.formData.material === 4 || this.formData.material === 5 || this.formData.material === 6)) {
					return { text: 'Đạt', value: 'S', color: 'text-emerald-500', average: roundedAverage };
				} else {
					return { text: 'Vượt tiêu chuẩn', value: 'F', color: 'text-red-500', average: roundedAverage };
				}
				
			}
		},
		mounted() {
			this.getMaterial()
		},
		methods: {
			returnPage() {
				uni.navigateTo({
					url: '/pages/iqcReport/iqcMaterial'
				})
			},
			getMaterial() {
			    this.isLoading = true;
			
			    axios.get("/iqcReport/getMaterial")
			        .then((res) => {
			            //console.log('Material (JSON):', JSON.stringify(res.data, null, 2));
			
			            const newDataMaterial = res.data?.data || [];
			
			            if (Array.isArray(newDataMaterial) && newDataMaterial.length > 0) {
			                this.dataMaterial = [...this.dataMaterial, ...newDataMaterial];
			            } else {
			                console.error('No material data or data is empty.');
			            }
			        })
			        .catch((error) => {
			            console.error("Error fetching material data:", error);
			        })
			        .finally(() => {
			            this.isLoading = false;
			        });
			},
			createReport() {
				this.isLoading = true;
				
				if (!this.formData.date_record) {
				    uni.showToast({
				        icon: 'none',
				        title: 'Vui lòng nhập ngày !',
						duration: 2000
				    });
				    this.isLoading = false;
				    return;
				} else if (!this.formData.staff_check) {
					uni.showToast({
					    icon: 'none',
					    title: 'MSNV không được trống',
						duration: 2000
					});
					this.isLoading = false;
					return;
				} else if (!this.formData.status_material) {
					uni.showToast({
					    icon: 'none',
					    title: 'Vui lòng chọn trạng thái',
						duration: 2000
					});
					this.isLoading = false;
					return;
				}
				
				//console.log("FormData being sent:", this.formData);
				axios.post("/iqcReport/insertMaterialIQC",
					this.formData
				).then((response) => {
					console.log("Create success");
					uni.showToast({
						title: "Thành công",
						icon: 'none',
						success: (res) => {
						   this.exeRet = "success:" + JSON.stringify(res) + new Date()
						},
					})
				}).catch((error) => {
					console.error("Error create: ", error);
					alert("Create fail");
				}).finally(() => {
					this.isLoading = false;
					uni.navigateTo({
						url:'/pages/iqcReport/iqcMaterial'
					})
				})
			},
			onDateRecordChange(e) {
				const dateRecord = e.detail.value;
				this.formData.date_record = this.formatDate(dateRecord);
			},
			onDateWHChange(e) {
				const dateWH = e.detail.value;
				this.formData.date_wh = this.formatDate(dateWH);
			},
			bindTimeChange(e) {
				this.formData.time_report = e.detail.value;
			},
			bindPickerStatusChange(event) {
				const selectStatusIndex = event.detail.value;
				this.formData.status_material = this.arrayStatus[selectStatusIndex].value;
				
				console.log('status picker: ' + this.formData.status_material)
			},
			bindTextAreaBlur(e) {
				this.formData.remark = e.detail.value;
			},
			bindPickerAreaChange(event) {
			    const selectedIndex = event.detail.value;
			    this.formData.measurement_area = this.array[selectedIndex].value;
				
				console.log('area picker: ' + this.formData.measurement_area)
			},
			bindPickerMaterialChange(e){
				const selectedIndex = e.detail.value;
				const selectedMaterial = this.dataMaterial[selectedIndex];
				this.formData.material = selectedMaterial.MATERIAL_CODE;
			},
			getMaterialName(code) {
				const materialName = this.dataMaterial.find(item => item.MATERIAL_CODE === code);
				return materialName ? materialName.MATERIAL_NAME : 'Chọn liệu';
			},
			findPickerIndex(value) {
			    return this.array.findIndex(item => item.value === value);
			},
			findLabelByValue(value) {
			    const found = this.array.find(item => item.value === value);
			    return found ? found.label : null;
			},
			findPickerIndexStatus(value) {
				return this.arrayStatus.findIndex(item => item.value === value);
			},
			findLabelStatus(value) {
				const findLabel = this.arrayStatus.find(item => item.value === value);
				return findLabel ? findLabel.label : null;
			},
			formatDate(dateString) {
			    const date = new Date(dateString);
			    const day = String(date.getDate()).padStart(2, '0');
			    const month = String(date.getMonth() + 1).padStart(2, '0');
			    const year = date.getFullYear();
			    return `${year}/${month}/${day}`;
			},
		}
	}
</script>

<style>
	.scroll-Y {
		height: calc(100vh - 300px);
		overflow-y: auto;
	}
	
	.circle {
	  background-image: url('/static/circle.png');
	  background-size: contain;
	  background-repeat: no-repeat;
	  width: 50px;
	  height: 50px;
	}
	
</style>