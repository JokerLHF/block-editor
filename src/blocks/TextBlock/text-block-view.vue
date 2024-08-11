<template>
  <div contenteditable="true"  @keydown="handleKeyDown">
    <span v-for="data in props.blockModel.data" :key="data.text" data-type="text">{{ getText(data.text) }}</span>
  </div>
</template>

<script setup lang="ts">
import { BlockType, type IBlockModel } from '../../core';
import { createBlockId } from '../../core/utils/getId';
import { isCollesped } from '../../core/utils/selection';
import { getEditor } from '../../content/useEditor';

const props = defineProps<{ blockModel: IBlockModel }>();

const getText = (text: string) => {
  return text.length ? text : '\uFEFF'
}

const handleKeyDown = (e: KeyboardEvent) => {
  const editor = getEditor();
  const selection = editor.selection.value;
  if (!selection) {
    return;
  }

  const { anchor, focus } = selection;

  e.preventDefault();
  const { parentId, id, data } = props.blockModel;
  const curText = data[0].text as string;

  const currentBlockIndex = editor.model[parentId].children.indexOf(id)

  if (isCollesped(anchor, focus)) {
    const index = anchor.offset;
    const nextBlockText = curText.slice(index);
    editor.removeText(id, index, nextBlockText);

    const newId = createBlockId();
    const textBlock = { type: BlockType.TextBlock, id: newId, parentId, data: [{ text: nextBlockText }], children: [] };
    editor.insertBlock(parentId, currentBlockIndex + 1, textBlock);

    editor.setSelection({
      anchor: { blockId: newId, offset: 0 },
      focus: { blockId: newId, offset: 0 },
    });
  } else {
    const removeText = curText.slice(anchor.offset);
    editor.removeText(id, anchor.offset, removeText);

    const newId = createBlockId();
    const nextBlockText = curText.slice(focus.offset);
    const textBlock = { type: BlockType.TextBlock, id: newId, parentId, data: [{ text: nextBlockText }], children: [] };
    editor.insertBlock(parentId, currentBlockIndex + 1, textBlock);

    editor.setSelection({
      anchor: { blockId: newId, offset: 0 },
      focus: { blockId: newId, offset: 0 },
    });
  }
}

</script>

<style scoped>

</style>
