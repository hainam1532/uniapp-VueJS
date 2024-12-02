<template>
	<view class="flex flex-col bg-gray-200 h-screen w-full overflow-hidden">
		<view class="flex flex-col bg-[#407bff] rounded-b-3xl gap-4 p-2">
			<view class="mx-2 flex justify-between">
				<view class="return" @click="backMenu()"></view>
				<span class="font-semibold text-white py-1">
					Tạo biểu phát tem
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
							<scroll-view scroll-y="true" style="overflow-y: auto; height: calc(40vh - 240px);">
								<view class="flex flex-col gap-4 text-sm mt-4">
									<h2 class="font-semibold text-xl">Ngày :</h2>
									<view class="flex items-center border-b border-gray-300 pb-2">
										<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
										  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
										</svg>
										<picker
											class="w-full ml-2 outline-none font-bold"
											mode="date"
											:value="formData.DATE_REPORT"
											@change="onDateDeliveryChange"
										>
											<view class="w-full ml-2 text-[18px] outline-none font-bold">
												{{ formData.DATE_REPORT || 'Chọn ngày' }}
											</view>
										</picker>
									</view>
									<view class="flex flex-col gap-4">
										<h2 class="font-semibold text-xl">Chuyền :</h2>
										<view class="flex items-center border-b border-gray-300 pb-2">
											<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
											  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
											  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
											</svg>
											<picker
											    @change="bindPickerDepartmentChange"
											    :value="formData.DEPARTMENT_CODE"
											    :range="departmentList">
											    <view class="w-full ml-2 text-[18px] outline-none font-bold">
											      {{ formData.DEPARTMENT_CODE || 'Chọn chuyền' }}
											    </view>
											</picker>
											
										</view>
									</view>
									<view class="flex flex-col gap-4">
										<h2 class="font-semibold text-xl">PO :</h2>
										<view class="flex items-center border-b border-gray-300 pb-2">
											<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
											  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
											  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
											</svg>
											<view class="flex justify-between items-center" >
												<input
												  class="w-full ml-2 text-[18px] outline-none font-bold" 
												  type="text" 
												  v-model="formData.PROD"
												  autofocus
												  placeholder="Nhập PO" 
												/>
											</view>
										</view>
									</view>
									<view class="flex flex-col gap-4">
										<h2 class="font-semibold text-xl">ART :</h2>
										<view class="flex items-center border-b border-gray-300 pb-2">
											<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
											  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
											  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
											</svg>
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
									</view>
									<view class="flex flex-col gap-4">
										<h2 class="font-semibold text-xl">Hình thể</h2>
										<view class="flex items-center border-b border-gray-300 pb-2">
											<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
											  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
											</svg>
											<span class="w-full ml-2 outline-none font-bold">{{formData.STYLE}}</span>
										</view>
									</view>
									<view class="flex flex-col gap-4">
										<h2 class="font-semibold text-xl">Ghi chú</h2>
										<view class="flex items-center border-b border-gray-300 pb-2">
											<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
											  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
											</svg>
											<input
											  class="w-full ml-2 text-[18px] outline-none font-bold" 
											  type="text" 
											  v-model="formData.ISSUE"
											  autofocus 
											  placeholder="Ghi chú" 
											/>
										</view>
									</view>
								</view>
							</scroll-view>
							<view class="border-b border-dashed border-black border-b-2 my-5">
								<view class="absolute rounded-full w-5 h-5 -mt-2 -left-2"></view>
								<view class="absolute rounded-full w-5 h-5 -mt-2 -right-2"></view>
							</view>
							
							<view class="flex justify-center items-center text-center">
								<span class="font-bold text-2xl text-blue-500">Kiểm tra ở FI</span>
							</view>
							<scroll-view scroll-y="true" style="overflow-y: auto; height: calc(40vh - 240px);">
								<view class="flex flex-col">
									<view class="grid grid-cols-2 grid-rows-1 gap-4 mt-4">
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Size B</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
												<picker
												    @change="bindPickerSizeBFI"
												    :value="formData.FI_SIZE_B"
												    :range="sizeBFIList">
												    <view class="w-full ml-2 text-[18px] outline-none font-bold">
												      {{ formData.FI_SIZE_B || 'Chọn size' }}
												    </view>
												</picker>
											</view>
										</view>
										
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Chân trái/phải</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
												<picker
												  :range="arrayFoot" 
												  :range-key="'label'" 
												  @change="bindPickerFootBFIChange" 
												  :value="findPickerFootBFI(formData.FOOT_B_FI)"
												>
												  <view class="w-full ml-2 outline-none font-bold">
												    {{ findLabelFootBFI(formData.FOOT_B_FI) || 'Chọn chân' }}
												  </view>
												</picker>
											</view>
										</view>
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Số lượng B</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  type="text" 
												  v-model="formData.FI_QTY_B"
												  autofocus 
												  placeholder="Số lượng B" 
												/>
											</view>
										</view>
										
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Nguyên nhân</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
												<my-select
													class="w-full ml-2"
													:data="dataIssueBFI"
													v-model="selectedIssueBFI"
													valueField="PROBLEM_CODE"
													placeholder="Chọn nguyên nhân"
													@select="handleISSUESelectBFI"
												/>
											</view>
										</view>
									</view>
									
									<view class="grid grid-cols-2 grid-rows-1 gap-4 mt-4">
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Size C</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
												<picker
												    @change="bindPickerSizeCFI"
												    :value="formData.FI_SIZE_C"
												    :range="sizeCFIList">
												    <view class="w-full ml-2 text-[18px] outline-none font-bold">
												      {{ formData.FI_SIZE_C || 'Chọn size' }}
												    </view>
												</picker>
											</view>
										</view>
										
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Chân trái/phải</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
												<picker
												  :range="arrayFoot" 
												  :range-key="'label'" 
												  @change="bindPickerFootCFIChange" 
												  :value="findPickerFootCFI(formData.FOOT_C_FI)"
												>
												  <view class="w-full ml-2 outline-none font-bold">
												    {{ findLabelFootCFI(formData.FOOT_C_FI) || 'Chọn chân' }}
												  </view>
												</picker>
											</view>
										</view>
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Số lượng C</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  type="text" 
												  v-model="formData.FI_QTY_C"
												  autofocus 
												  placeholder="Số lượng C" 
												/>
											</view>
										</view>
										
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Nguyên nhân</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
												<my-select
													:data="dataIssueCFI"
													v-model="selectedIssueCFI"
													valueField="PROBLEM_CODE"
													placeholder="Chọn nguyên nhân"
													@select="handleISSUESelectCFI"
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
							<view class="flex justify-center items-center text-center">
								<span class="font-bold text-2xl text-blue-500">Kiểm tra ở chuyền sản xuất</span>
							</view>
							<scroll-view scroll-y="true" style="overflow-y: auto; height: calc(40vh - 240px);">
								<view class="flex flex-col">
									<view class="grid grid-cols-2 grid-rows-1 gap-4 mt-4">
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Size B</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
												<picker
												    @change="bindPickerSizeBProd"
												    :value="formData.LINE_SIZE_B"
												    :range="sizeBProdList">
												    <view class="w-full ml-2 text-[18px] outline-none font-bold">
												      {{ formData.LINE_SIZE_B || 'Chọn size' }}
												    </view>
												</picker>
											</view>
										</view>
										
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Chân trái/phải</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
												<picker
												  :range="arrayFoot" 
												  :range-key="'label'" 
												  @change="bindPickerFootBProdChange" 
												  :value="findPickerFootBProd(formData.FOOT_B_PROD)"
												>
												  <view class="w-full ml-2 outline-none font-bold">
												    {{ findLabelFootBProd(formData.FOOT_B_PROD) || 'Chọn chân' }}
												  </view>
												</picker>
											</view>
										</view>
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Số lượng B</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  type="text" 
												  v-model="formData.LINE_QTY_B"
												  autofocus 
												  placeholder="Số lượng B" 
												/>
											</view>
										</view>
										
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Nguyên nhân</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
												<my-select
													class="w-full ml-2"
													:data="dataIssueBProd"
													v-model="selectedIssueBProd"
													valueField="PROBLEM_CODE"
													placeholder="Chọn nguyên nhân"
													@select="handleISSUESelectBProd"
												/>
											</view>
										</view>
									</view>
									
									<view class="grid grid-cols-2 grid-rows-1 gap-4 mt-4">
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Size C</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
												<picker
												    @change="bindPickerSizeCProd"
												    :value="formData.LINE_SIZE_C"
												    :range="sizeCProdList">
												    <view class="w-full ml-2 text-[18px] outline-none font-bold">
												      {{ formData.LINE_SIZE_C || 'Chọn size' }}
												    </view>
												</picker>
											</view>
										</view>
										
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Chân trái/phải</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
												<picker
												  :range="arrayFoot" 
												  :range-key="'label'" 
												  @change="bindPickerFootCProdChange" 
												  :value="findPickerFootCProd(formData.FOOT_C_PROD)"
												>
												  <view class="w-full ml-2 outline-none font-bold">
												    {{ findLabelFootCProd(formData.FOOT_C_PROD) || 'Chọn chân' }}
												  </view>
												</picker>
											</view>
										</view>
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Số lượng C</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
												<input
												  class="w-full ml-2 outline-none font-bold" 
												  type="text" 
												  v-model="formData.LINE_QTY_C"
												  autofocus 
												  placeholder="Số lượng C" 
												/>
											</view>
										</view>
										
										<view class="flex flex-col gap-4">
											<h2 class="font-semibold text-xl">Nguyên nhân</h2>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
												</svg>
												<my-select
													class="w-full ml-2"
													:data="dataIssueCProd"
													v-model="selectedIssueCProd"
													valueField="PROBLEM_CODE"
													placeholder="Chọn nguyên nhân"
													@select="handleISSUESelectCProd"
												/>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
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
	import mySelect from '../../../components/mySelect/mySelect.vue'
	export default {
		components: {
		    mySelect,
		},
		data() {
			return {
				data: null,
				dataDepartment: [],
				dataPO: [],
				dataART: [],
				dataSIZEBFI:[],
				dataSIZECFI:[],
				dataSIZEBProd:[],
				dataSIZECProd:[],
				dataIssueBFI: [],
				dataIssueCFI: [],
				dataIssueBProd: [],
				dataIssueCProd: [],
				selectedDepartment: "",
				selectedPO: "",
				selectedART: "",
				selectedIssueBFI: "",
				selectedIssueCFI: "",
				selectedIssueBProd: "",
				selectedISsueCProd: "",
				formData: {
					DEPARTMENT_CODE: '',
					PROD_NO: '',
					STYLE: '',
					ISSUE: '',
					DATE_REPORT: '',
					FI_SIZE_B: '',
					FI_QTY_B: '',
					FI_SIZE_C: '',
					FI_QTY_C: '',
					LINE_SIZE_B: '',
					LINE_QTY_B: '',
					LINE_SIZE_C: '',
					LINE_QTY_C: '',
					UNION_CODE: '',
					ART: '',
					FOOT_B_FI: '',
					FOOT_C_FI: '',
					FOOT_B_PROD: '',
					FOOT_C_PROD: '',
					FI_SIZE_B_2: '',
					FI_QTY_B_2: '',
					LINE_SIZE_B_2: '',
					LINE_QTY_B_2: '',
					FOOT_B_FI_2: '',
					FOOT_B_PROD_2: '',
					ISSUE_B_FI_1: '',
					ISSUE_C_FI_2: '',
					ISSUE_PROD_FI_1: '',
					ISSUE_PROD_FI_2: '',
					ISSUE_B_FI_3: '',
					ISSUE_PROD_FI_4: ''
				},
				isLoading: false,
				arrayFoot: [
					{ label: 'Trái', value: 'L' },
					{ label: 'Phải', value: 'R' },
					{ label: 'Cả 2', value: 'L/R' },
				],
			}
		},
		computed: {
			departmentList() {
				return this.dataDepartment.map(item => item.DEPARTMENT_CODE);
			},
			sizeBFIList() {
				return this.dataSIZEBFI.map(item => item.SIZE_NO);
			},
			sizeCFIList() {
				return this.dataSIZECFI.map(item => item.SIZE_NO);
			},
			sizeBProdList() {
				return this.dataSIZEBProd.map(item => item.SIZE_NO);
			},
			sizeCProdList() {
				return this.dataSIZECProd.map(item => item.SIZE_NO);
			}
		},
		mounted() {
			this.getDepartment()
			this.getART()
			this.getISSUE()
			this.getSIZE()
		},
		methods: {
			backMenu() {
				uni.navigateTo({
					url:'/pages/prodReport/prodReportBC'
				})
			},
			bindPickerFootBFIChange(event) {
				const selectStatusIndex = event.detail.value;
				this.formData.FOOT_B_FI = this.arrayFoot[selectStatusIndex].value;
			},
			bindPickerFootCFIChange(event) {
				const selectStatusIndex = event.detail.value;
				this.formData.FOOT_C_FI = this.arrayFoot[selectStatusIndex].value;
			},
			bindPickerFootBProdChange(event) {
				const selectStatusIndex = event.detail.value;
				this.formData.FOOT_B_PROD = this.arrayFoot[selectStatusIndex].value;
			},
			bindPickerFootCProdChange(event) {
				const selectStatusIndex = event.detail.value;
				this.formData.FOOT_C_PROD = this.arrayFoot[selectStatusIndex].value;
			},
			findPickerFootBFI(value) {
				return this.arrayFoot.findIndex(item => item.value === value);
			},
			findPickerFootCFI(value) {
				return this.arrayFoot.findIndex(item => item.value === value);
			},
			findPickerFootBProd(value) {
				return this.arrayFoot.findIndex(item => item.value === value);
			},
			findPickerFootCProd(value) {
				return this.arrayFoot.findIndex(item => item.value === value);
			},
			findLabelFootBFI(value) {
				const findLabel = this.arrayFoot.find(item => item.value === value);
				return findLabel ? findLabel.label : null;
			},
			findLabelFootCFI(value) {
				const findLabel = this.arrayFoot.find(item => item.value === value);
				return findLabel ? findLabel.label : null;
			},
			findLabelFootBProd(value) {
				const findLabel = this.arrayFoot.find(item => item.value === value);
				return findLabel ? findLabel.label : null;
			},
			findLabelFootCProd(value) {
				const findLabel = this.arrayFoot.find(item => item.value === value);
				return findLabel ? findLabel.label : null;
			},
			formatDate(dateString) {
			    const date = new Date(dateString);
			    const day = String(date.getDate()).padStart(2, '0');
			    const month = String(date.getMonth() + 1).padStart(2, '0');
			    const year = date.getFullYear();
			    return `${year}/${month}/${day}`;
			},
			onDateDeliveryChange(e) {
				const dateRecord = e.detail.value;
				this.formData.DATE_REPORT = this.formatDate(dateRecord);
			},
			getDepartment() {
			    this.isLoading = true;
			
			    axios.get("/configData/getDepartment")
				.then((res) => {
					//console.log('Material (JSON):', JSON.stringify(res.data, null, 2));
					const newDataDepartment = res.data?.data || [];
					if (Array.isArray(newDataDepartment) && newDataDepartment.length > 0) {
						this.dataDepartment = [...this.dataDepartment, ...newDataDepartment];
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
			bindPickerDepartmentChange(e){
				const selectedIndex = e.detail.value;
				const selectedDepartment = this.dataDepartment[selectedIndex];
				this.formData.DEPARTMENT_CODE = selectedDepartment.DEPARTMENT_CODE;
			},
			bindPickerSizeBFI(e){
				const selectedIndex = e.detail.value;
				const selectedSIZE = this.dataSIZEBFI[selectedIndex];
				this.formData.FI_SIZE_B = selectedSIZE.SIZE_NO;
			},
			bindPickerSizeCFI(e){
				const selectedIndex = e.detail.value;
				const selectedSIZE = this.dataSIZECFI[selectedIndex];
				this.formData.FI_SIZE_C = selectedSIZE.SIZE_NO;
			},
			bindPickerSizeBProd(e){
				const selectedIndex = e.detail.value;
				const selectedSIZE = this.dataSIZEBProd[selectedIndex];
				this.formData.LINE_SIZE_B = selectedSIZE.SIZE_NO;
			},
			bindPickerSizeCProd(e){
				const selectedIndex = e.detail.value;
				const selectedSIZE = this.dataSIZECProd[selectedIndex];
				this.formData.LINE_SIZE_C = selectedSIZE.SIZE_NO;
			},
			getART() {
			    this.isLoading = true;
			
			    axios.get("/configData/getART")
			        .then((res) => {
			            //console.log('Material (JSON):', JSON.stringify(res.data, null, 2));
			
			            const newDataART = res.data?.data || [];
			
			            if (Array.isArray(newDataART) && newDataART.length > 0) {
			                this.dataART = [...this.dataART, ...newDataART];
			            } else {
			                console.error('No ART data or data is empty.');
			            }
			        })
			        .catch((error) => {
			            console.error("Error fetching ART data:", error);
			        })
			        .finally(() => {
			            this.isLoading = false;
			        });
			},
			handleARTSelect(selectedItem) {
			    console.log("ART đã chọn:", selectedItem);
			
			    // Cập nhật giá trị cho formData
			    this.formData.ART = selectedItem.PROD_NO;
			    this.formData.STYLE = selectedItem.NAME_S;
			},
			getSIZE() {
			    this.isLoading = true;
			
			    axios.get("/configData/getSize")
			        .then((res) => {
			            //console.log('Material (JSON):', JSON.stringify(res.data, null, 2));
			
			            const newDataSIZE = res.data?.data || [];
			
			            if (Array.isArray(newDataSIZE) && newDataSIZE.length > 0) {
			                this.dataSIZEBFI = [...this.dataSIZEBFI, ...newDataSIZE];
							this.dataSIZECFI = [...this.dataSIZECFI, ...newDataSIZE];
							this.dataSIZEBProd = [...this.dataSIZEBProd, ...newDataSIZE];
							this.dataSIZECProd = [...this.dataSIZECProd, ...newDataSIZE];
			            } else {
			                console.error('No ART data or data is empty.');
			            }
			        })
			        .catch((error) => {
			            console.error("Error fetching ART data:", error);
			        })
			        .finally(() => {
			            this.isLoading = false;
			        });
			},
			getISSUE() {
			    this.isLoading = true;
			
			    axios.get("/configData/getIssue")
			        .then((res) => {
			            //console.log('Material (JSON):', JSON.stringify(res.data, null, 2));
			
			            const newDataISSUE = res.data?.data || [];
			
			            if (Array.isArray(newDataISSUE) && newDataISSUE.length > 0) {
			                this.dataIssueBFI = [...this.dataIssueBFI, ...newDataISSUE];
							this.dataIssueCFI = [...this.dataIssueCFI, ...newDataISSUE];
							this.dataIssueBProd = [...this.dataIssueBProd, ...newDataISSUE];
							this.dataIssueCProd = [...this.dataIssueCProd, ...newDataISSUE];
			            } else {
			                console.error('No ART data or data is empty.');
			            }
			        })
			        .catch((error) => {
			            console.error("Error fetching ART data:", error);
			        })
			        .finally(() => {
			            this.isLoading = false;
			        });
			},
			handleSIZEBFI(selectedItem) {
			    console.log("ART đã chọn:", selectedItem);
			
			    // Cập nhật giá trị cho formData
			    this.formData.FI_SIZE_B = selectedItem.SIZE_NO;
			},
			handleSIZECFI(selectedItem) {
			    console.log("ART đã chọn:", selectedItem);
			
			    // Cập nhật giá trị cho formData
			    this.formData.FI_SIZE_C = selectedItem.SIZE_NO;
			},
			handleSIZEBProd(selectedItem) {
			    console.log("ART đã chọn:", selectedItem);
			
			    // Cập nhật giá trị cho formData
			    this.formData.LINE_SIZE_B = selectedItem.SIZE_NO;
			},
			handleSIZECProd(selectedItem) {
			    console.log("ART đã chọn:", selectedItem);
			
			    // Cập nhật giá trị cho formData
			    this.formData.LINE_SIZE_C = selectedItem.SIZE_NO;
			},
			handleISSUESelectBFI(selectedItem) {
			    console.log("ART đã chọn:", selectedItem);
			
			    // Cập nhật giá trị cho formData
			    this.formData.ISSUE_B_FI_1 = selectedItem.PROBLEM_CODE;
			},
			handleISSUESelectCFI(selectedItem) {
			    console.log("ART đã chọn:", selectedItem);
			
			    // Cập nhật giá trị cho formData
			    this.formData.ISSUE_C_FI_2 = selectedItem.PROBLEM_CODE;
			},
			handleISSUESelectBProd(selectedItem) {
			    console.log("ART đã chọn:", selectedItem);
			
			    // Cập nhật giá trị cho formData
			    this.formData.ISSUE_PROD_FI_1 = selectedItem.PROBLEM_CODE;
			},
			handleISSUESelectCProd(selectedItem) {
			    console.log("ART đã chọn:", selectedItem);
			
			    // Cập nhật giá trị cho formData
			    this.formData.ISSUE_PROD_FI_2 = selectedItem.PROBLEM_CODE;
			},
			async createData() {
			    this.isLoading = true;
			    try {
			        
			        if (!this.formData.DATE_REPORT) {
			            uni.showToast({
			                title: "Ngày lãnh không hợp lệ",
			                icon: "none",
			                duration: 2000,
			            });
			            return;
			        }
					
			
			        await axios.post(`/prodReport/createReportBC`, this.formData);
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
			            url: '/pages/prodReport/prodReportBC'
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
</style>