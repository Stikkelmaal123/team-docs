<script setup>
defineProps({
  modelValue: {
    type: Date,
    default: null,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateDate = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div class="date-input">
    <label class="date-input__label">{{ label }}</label>
    <div class="date-input__container">
      <input
        type="date"
        :value="modelValue"
        @input="updateDate"
        class="date-input__field"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/main.scss" as *;

.date-input {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;

  &__label {
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: #333;
  }

  &__container {
    position: relative;
    width: 100%;
  }

  &__field {
    padding: $spacing-sm;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background-color: #f8f9fa;
    width: 100%;
    height: 38px;
    font-size: $font-size-base;
  }
}
</style>