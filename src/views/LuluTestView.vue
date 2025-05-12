<script setup>
import { ref, computed, onMounted } from "vue";
import LuluTestFilter from "@/components/LuluTestFilter.vue";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const selectedFilter = ref("");
const selectedValue = ref("");
const searchQuery = ref("");
const showSuggestions = ref(false);

const allData = ref([]);

// Fetch real data from Firebase
async function fetchEventsFromFirestore() {
  const snapshot = await getDocs(collection(db, "events"));
  allData.value = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

onMounted(() => {
  fetchEventsFromFirestore();
});

const dropdownOptions = computed(() => {
  if (!selectedFilter.value) return [];

  const all = allData.value.map((item) => item[selectedFilter.value]);
  const unique = [...new Set(all)];

  if (!searchQuery.value) return unique;

  return unique.filter((val) =>
    val.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const filteredData = computed(() => {
  if (!selectedFilter.value || !selectedValue.value) {
    return allData.value;
  };

  return allData.value.filter(
    (item) => item[selectedFilter.value] === selectedValue.value,
  );
});

function onFilterChange(filterKey) {
  selectedFilter.value = filterKey;
  selectedValue.value = "";
  searchQuery.value = "";
  showSuggestions.value = false;
};

function selectOption(option) {
  selectedValue.value = option;
  searchQuery.value = option;
  showSuggestions.value = false;
};

function onSearchInput() {
  selectedValue.value = "";
  showSuggestions.value = true;
};
</script>

<template>
  <div class="test-view">
    <LuluTestFilter @update:filter="onFilterChange" />

    <div v-if="selectedFilter" class="test-view__dropdown">
      <label class="test-view__label">
        Vælg:
        <input
          class="test-view__input"
          type="text"
          v-model="searchQuery"
          placeholder="Søg..."
          @focus="showSuggestions = true"
          @input="onSearchInput"
          @blur="() => setTimeout(() => (showSuggestions = false), 150)"
        />
      </label>

      <ul v-if="showSuggestions" class="test-view__suggestion-list">
        <li
          v-if="dropdownOptions.length"
          v-for="option in dropdownOptions"
          :key="option"
          class="test-view__suggestion-item"
          @click="selectOption(option)"
        >
          {{ option }}
        </li>
        <li v-else class="test-view__suggestion-empty">
          Ingen resultater
        </li>
      </ul>
    </div>

    <div class="test-view__list">
      <p v-if="filteredData.length === 0">Ingen resultater fundet.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.test-view {
  &__dropdown {
    width: 100%;
    position: relative;
    margin: 0 0 1.5rem 1.5rem;
  }

  &__label {
    display: flex;
    flex-direction: column;
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 0.4rem;
  }

  &__input {
    padding: 0.5rem 0.75rem;
    font-size: 0.95rem;
    border: 1.5px solid #ccc;
    border-radius: 0.3rem;
    width: 41.5rem;
    box-sizing: border-box;
  }

  &__suggestion-list {
    position: absolute;
    z-index: 10;
    list-style: none;
    padding: 0;
    margin-top: 0.2rem;
    border: 1px solid #ccc;
    background: white;
    max-height: 150px;
    overflow-y: auto;
    width: 41.5rem;
  }

  &__suggestion-item {
    padding: 0.4rem 0.6rem;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  &__suggestion-empty {
    padding: 0.4rem 0.6rem;
    color: #888;
    font-style: italic;
  }

  &__list {
    margin-left: 1.5rem;
  }
}
</style>