<template>
  <div>pageBlock</div>
  <div class="page-block-children">
    <template v-for="child in blockModel.children" :key="child.id">
      <BlockView :block-id="child"/>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { type IBlockModel } from '../../core';
import { BlockView } from '../BlockBaseView';

const props = defineProps<{ blockModel: IBlockModel }>()

</script>

<style scoped></style>
