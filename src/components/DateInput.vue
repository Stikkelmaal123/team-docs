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

const formatDateInput = (event) => {
  let input = event.target.value.replace(/\D/g, "");

  // Format the date with dashes
  if (input.length > 0) {
    if (input.length > 2) {
      input = input.substring(0, 2) + "/" + input.substring(2);
    }

    if (input.length > 4) {
      input = input.substring(0, 5) + "/" + input.substring(5);
    }
  }

  emit("update:modelValue", input);
};
</script>

<template>
  <div class="date-input">
    <label class="date-input__label">{{ label }}</label>
    <div class="date-input__container">
      <input
        :value="modelValue"
        @input="formatDateInput"
        type="text"
        class="date-input__field"
        :placeholder="placeholder"
        maxlength="10"
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
