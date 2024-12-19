<template>
  <view class="select-wrapper">
    <!-- Input: dùng để mở modal và hiển thị giá trị đã chọn -->
    <view class="input-container">
      <input
        type="text"
        v-model="displayValue"
        @focus="openModal"
        :placeholder="placeholder"
        class="select-input"
        readonly
      />
      <!-- Nút xóa giá trị đã chọn -->
      <button v-if="selectedValue" class="clear-btn" @click="clearSelection">
        &#10005; <!-- Icon X -->
      </button>
    </view>

    <!-- Modal Background -->
    <view v-if="isModalVisible" class="modal-overlay" @click="closeModal">
      <view class="modal-content" @click.stop>
        <h3 class="modal-title">{{ title }}</h3>
        
        <!-- Input tìm kiếm -->
        <input
          type="text"
          v-model="searchTerm"
          @input="handleSearch"
          :placeholder="placeholder"
          class="search-input"
        />
        
        <!-- Danh sách các item -->
        <ul class="dropdown" @scroll="handleScroll">
          <li
            v-for="(item, index) in filteredData"
            :key="index"
            @click="selectItem(item)"
            :class="{ selected: selectedValue === item[valueField] }"
            class="dropdown-item"
          >
            <span class="item-code">{{ item[valueField] }}</span>
            <span class="item-name">{{ item[displayField] }}</span>
          </li>
          <li v-if="filteredData.length === 0" class="dropdown-item no-data">
            {{ noDataText }}
          </li>
        </ul>
        
        <!-- Nút đóng modal -->
        <button class="close-btn" @click="closeModal">Đóng</button>
      </view>
    </view>
  </view>
</template>




<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    valueField: {
      type: String,
      required: true,
    },
    displayField: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Chọn dữ liệu...",
    },
    title: {
      type: String,
      default: "Chọn dữ liệu",
    },
    noDataText: {
      type: String,
      default: "Không có dữ liệu",
    },
  },
  data() {
    return {
      isModalVisible: false, // Kiểm soát modal
      searchTerm: "", // Giá trị tìm kiếm
      selectedValue: null, // Giá trị được chọn
      displayValue: "", // Giá trị hiển thị trên input
      currentLimit: 10, // Giới hạn số dòng hiển thị
    };
  },
  computed: {
    filteredData() {
      // Lọc dữ liệu dựa trên searchTerm
      const search = this.searchTerm.toLowerCase();
      return this.data
        .filter(
          (item) =>
            item[this.valueField]?.toLowerCase().includes(search) ||
            item[this.displayField]?.toLowerCase().includes(search)
        )
        .slice(0, this.currentLimit);
    },
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
      this.searchTerm = ""; // Reset search term khi mở modal
    },
    closeModal() {
      this.isModalVisible = false;
    },
    handleSearch() {
      this.currentLimit = 10; // Reset limit khi tìm kiếm
    },
    selectItem(item) {
      this.selectedValue = item[this.valueField];
      this.displayValue = `${item[this.valueField]} - ${item[this.displayField]}`;
      this.$emit("input", item[this.valueField]);
      this.$emit("select", item);
      this.closeModal();
    },
    handleScroll(event) {
      const bottom =
        event.target.scrollHeight ===
        event.target.scrollTop + event.target.clientHeight;
      if (bottom) {
        this.currentLimit += 10; // Load thêm dữ liệu
      }
    },
    clearSelection() {
      this.selectedValue = null;
      this.displayValue = "";
      this.$emit("input", null);
      this.$emit("clear"); // Emit sự kiện để cha xử lý nếu cần
    },
  },
};
</script>

<style scoped>
.select-wrapper {
  position: relative;
  width: 100%;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.select-input {
  width: 100%;
  height: 40px;
  padding: 0;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box;
}

.clear-btn {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: #aaa;
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
}

.clear-btn:hover {
  color: #ff4d4f;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 8px;
  width: 400px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.search-input {
  width: 100%;
  height: 30px;
  padding: 4px 15px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.dropdown {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.dropdown-item {
  padding: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.dropdown-item:hover {
  background-color: #f9f9f9;
}

.selected {
  background-color: #d6f5d6;
}

.no-data {
  text-align: center;
  color: #999;
  padding: 10px;
}

.close-btn {
  display: block;
  margin: 10px auto 0;
  padding: 2px 20px;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.close-btn:hover {
  background-color: #ff7875;
}
</style>


