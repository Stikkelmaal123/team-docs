<script setup>
const props = defineProps({
  day: {
    type: Date,
    default: null,
  },
});

const emit = defineEmits(["select"]);
function handleClick() {
  if (props.day) {
    emit("select", props.day);
  }
}
</script>


<template>
  <div
    class="calendar__cell"
    :class="{ empty: !day }"
    @click="handleClick"
  >
    <span v-if="day">{{ day.getDate() }}</span>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/main.scss";
</style>
