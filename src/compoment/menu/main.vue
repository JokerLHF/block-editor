<template>
  <div :style="menuStyle" class="menu">M</div>
</template>

<script setup lang="ts">
import { CSSProperties, onMounted, onUnmounted, ref } from 'vue';
const menuStyle = ref<CSSProperties>({
  display: 'none',
  position: 'absolute',
  left: 0,
  top: 0
});

const handleMouseMove = (e: MouseEvent) => {
  const blockEl = (e.target as HTMLElement).closest('.block');
  
  if (!blockEl) {
    menuStyle.value = {
      ...menuStyle.value,
      display: 'none',
    }
    return;
  }
  const { x, y } = blockEl.getBoundingClientRect();
  menuStyle.value = {
    ...menuStyle.value,
    display: 'block',
    left: `${x - 30}px`,
    top: `${y}px`,
  }
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
})
onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
})
</script>
<style scoped>
  .menu {
    width: 20px;
    border-radius: 8px;
    background-color: antiquewhite;
  }
</style>