<template>
  <BlockView block-id="1" />
  <div @click="handleInsertBlock">插入block</div>
  <div @click="handleRemoveBlock">删除block</div>
  <Menu />
</template>

<script setup lang="ts">
import { BlockView } from '../blocks/BlockBaseView';
import { BlockType } from '../core';
import { Menu } from '../compoment/menu';
import { createBlockId } from '../core/utils/getId';
import { reactive } from 'vue';
import { useEditor } from './useEditor';

const props = defineProps<{ container: HTMLElement}>()
const initialModel = reactive({
  '1': { type: BlockType.PageBlock, id: '1', parentId: '', children: ['2', '3', '4', '5']},
  '2': { type: BlockType.TextBlock, id: '2', parentId: '1', data: [{ text: '222' }], children: [] },
  '3': { type: BlockType.TextBlock, id: '3', parentId: '1', data: [{ text: '333' }], children: [] },
  '4': { type: BlockType.TextBlock, id: '4', parentId: '1', data: [{ text: '444' }], children: [] },
  '5': { type: BlockType.GirdBlock, id: '5', parentId: '1', children: ['6'] },
  '6': { type: BlockType.TextBlock, id: '6', parentId: '5', data: [{ text: '555' }], children: [] },
})
const editor = useEditor(initialModel, props.container);

const handleInsertBlock = () => {
  const id = createBlockId()
  const text = { type: BlockType.TextBlock, id, parentId: createBlockId(), data: [{ text: '666' }], children: [] }
  editor.insertBlock('5', 0, text);
}

const handleRemoveBlock = () => {
  editor.removeBlock('7');
}
</script>
