<script setup>

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "dd/mm/yyyy",
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div class="date-input">
    <label class="date-input__label">{{ label }}</label>
    <div class="date-input__container">
      <input
        :value="modelValue"
        @input="updateValue"
        type="text"
        class="date-input__field"
        :placeholder="placeholder"
      />
      <img src="@/assets/icons/Calendar.png" alt="Calendar" class="date-input__icon" />
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

  &__icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
  }
}
</style>
