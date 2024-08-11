import { nextTick, onMounted, onUnmounted, watch } from "vue"
import { isEqualSelection } from "../utils/selection";
import { type Editor } from "..";

export interface SelectionPoint {
  offset: number;
  blockId: string;
}

export interface ISelection {
  anchor: SelectionPoint,
  focus: SelectionPoint
};

export const useSelection = (editor: Editor) => {

  const toModelSelection = () => {
    const selection = window.getSelection();
    if (!selection) {
      return null;
    }
    const { anchorNode, anchorOffset, focusNode, focusOffset } = selection;
    // 判断是否是 editor 内的选区
    const editorEl = editor.container;
    if (!editorEl?.contains(anchorNode) || !editorEl.contains(focusNode)) {
      return null;
    }
    /**
     * TODO：目前做block级别的选区，后续text内部会有多个text，选区要修改
     */
    const anchorBlockId = (anchorNode?.parentNode as HTMLElement).closest('.block')?.getAttribute('data-id');
    const focusBlockId = (focusNode?.parentNode as HTMLElement).closest('.block')?.getAttribute('data-id');

    if (anchorBlockId && focusBlockId) {
      return {
        anchor: { blockId: anchorBlockId, offset: anchorOffset },
        focus: { blockId: focusBlockId, offset: focusOffset },
      };
    }
    return null;
  }

  const toDOMSelction = () => {
    const modelSelection = editor.selection.value;
    if (!modelSelection) {
      return null;
    }
    
    /**
     * TODO：目前做block级别的选区，后续text内部会有多个text，选区要修改
     */
    const { anchor, focus } = modelSelection;
    const anchorText = document.querySelector(`[data-id="${anchor.blockId}"]`)?.querySelector(`[data-type="text"]`)?.firstChild;
    const focusText = document.querySelector(`[data-id="${anchor.blockId}"]`)?.querySelector(`[data-type="text"]`)?.firstChild;

    if (anchorText && focusText) {
      const range = window.document.createRange()
      range.setStart(anchorText, anchor.offset)
      range.setEnd(focusText, focus.offset)
      return range;
    }

    return null;
  }

  const handleSelectionChange = () => {
    const selection = toModelSelection();
    if (isEqualSelection(selection, editor.selection.value)) {
      return;
    }
  
    editor.setSelection(selection);
  }

  onMounted(() => {
    document.addEventListener('selectionchange', handleSelectionChange)
  })

  onUnmounted(() => {
    document.removeEventListener('selectionchange', handleSelectionChange)
  })

  watch(() => editor?.selection.value, async () => {
    // DOM 渲染完成之后才能拿到选区
    await nextTick()
    const domSelection = toDOMSelction();
    window.document.getSelection()?.removeAllRanges();
    console.log('domSelection', domSelection);
    
    if (domSelection) {
      window.document.getSelection()?.addRange(domSelection);
    }
  });
}