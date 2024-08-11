<template>
  <div :class="`${blockModel.type} block`" :data-id="blockModel.id">
    <component :is="blockViewMap[blockModel.type]" :block-model="blockModel"/>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { blockViewMap,  } from '../../core';
import { getEditor } from '../../content/useEditor';

const props = defineProps<{ blockId: string }>()
const blockModel = computed(() => {
  return getEditor().model[props.blockId];
})
</script>