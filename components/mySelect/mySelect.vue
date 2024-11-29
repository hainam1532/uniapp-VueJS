<template>
  <div class="my-select" ref="dropdown" @click.stop>
    <!-- Input tìm kiếm -->
    <input
      type="text"
      v-model="searchTerm"
      @focus="openDropdown"
      @input="handleSearch"
      :placeholder="placeholder"
      class="search-input"
    />

    <!-- Danh sách các item -->
    <ul v-if="isDropdownVisible" class="dropdown" @scroll="handleScroll">
      <li
        v-for="(item, index) in filteredData"
        :key="index"
        @click="selectItem(item)"
        :class="{ selected: selectedValue === item[valueField] }"
        class="dropdown-item"
      >
        <span class="item-code">{{ item[valueField] }}</span>
      </li>
      <li v-if="filteredData.length === 0" class="dropdown-item no-data">
        {{ noDataText }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    value: {
      type: [String, Number],
      default: "",
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
      default: "Tìm kiếm...",
    },
    noDataText: {
      type: String,
      default: "Không có dữ liệu",
    },
  },
  data() {
    return {
      searchTerm: "", // Giá trị tìm kiếm
      selectedValue: this.value,
      isDropdownVisible: false,
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
    handleSearch() {
      this.$emit("search", this.searchTerm); // Emit sự kiện để cha xử lý nếu cần
    },
    selectItem(item) {
      this.selectedValue = item[this.valueField];
      this.searchTerm = `${item[this.valueField]}`; // Hiển thị cả code và name
      this.$emit("input", item[this.valueField]);
      this.$emit("select", item);
      this.closeDropdown();
    },
    openDropdown() {
      this.isDropdownVisible = true;
    },
    closeDropdown() {
      this.isDropdownVisible = false;
    },
    handleScroll(event) {
      const bottom =
        event.target.scrollHeight ===
        event.target.scrollTop + event.target.clientHeight;
      if (bottom) {
        this.loadMoreData();
      }
    },
    loadMoreData() {
      this.currentLimit += 10; // Tăng số dòng hiển thị
      this.$emit("load-more", {
        searchTerm: this.searchTerm,
        limit: this.currentLimit,
      });
    },
    handleClickOutside(event) {
      if (!this.$refs.dropdown.contains(event.target)) {
        this.closeDropdown();
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.my-select {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  height: 100%;
  padding: 8px;
  font-size: 18px;
  font-weight: bold;
}

.dropdown {
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  margin-top: 7px;
  padding: 0;
  list-style-type: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: absolute;
  background-color: #fff;
  width: 110%;
  z-index: 10;
  box-sizing: border-box;
}

.dropdown-item {
  padding: 8px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.selected {
  background-color: #d6f5d6;
}

.no-data {
  text-align: center;
  color: #999;
  padding: 10px;
}

.item-code {
  font-weight: bold;
  margin-right: 5px;
}

.item-name {
  color: #666;
}
</style>
