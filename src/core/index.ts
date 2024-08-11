import { Reactive, ref } from 'vue';
import  {PageBlockView}  from '../blocks/PageBlock';
import {TextBlockView} from '../blocks/TextBlock';
import { GirdBlockView } from '../blocks/GirdBlock';
import { ISelection } from './hooks/use-selection';

export enum BlockType {
  PageBlock = 'PageBlock',
  TextBlock = 'TextBlock',
  GirdBlock = 'GirdBlock',
}

export const blockViewMap = {
  [BlockType.PageBlock]: PageBlockView,
  [BlockType.TextBlock]: TextBlockView,
  [BlockType.GirdBlock]: GirdBlockView,
}

export interface IBlockModel {
  type: BlockType;
  id: string;
  children: string[];
  parentId: string;
  [key: string]: any;
}

// export const initialModel = reactive<IBlockModel>({
//   type: BlockType.PageBlock,
//   id: '1',
//   children: [
//     { type: BlockType.TextBlock, id: '2', data: [{ text: 111 }], children: [] },
//     { type: BlockType.TextBlock, id: '3', data: [{ text: 222 }], children: [] },
//     { type: BlockType.TextBlock, id: '4', data: [{ text: 333 }], children: [] },
//     { type: BlockType.GirdBlock, id: '5', children: [
//       { type: BlockType.TextBlock, id: '6', data: [{ text: 444 }], children: [] },
//     ] },
//   ]
// })

export type IModel = Reactive<Record<string, IBlockModel>>;
export class Editor {
  selection = ref<ISelection | null>(null);

  constructor(public model: IModel, public container: HTMLElement) {}

  setSelection(_selection: ISelection | null) {
    this.selection.value = _selection;
  }

  insertBlock(parentId: string, index: number, blockModel: IBlockModel) {
    this.model[parentId].children.splice(index, 0, blockModel.id);
    this.model[blockModel.id] = blockModel;
  }

  removeBlock(id: string) {
    const parentModel = this.model[this.model[id].parentId]
    const idIndex = parentModel.children.findIndex(childId => childId === id)
    parentModel.children.splice(idIndex, 1);

    delete this.model[id]
  }

  // 从 offset 找到 text 长度删除，方便后续修改为 op
  removeText(id: string, offset: number, text: string) {
    // 目前就只有一个text
    const tempText = (this.model[id].data[0].text as string)
    const newText = tempText.slice(0, offset) + tempText.slice(offset + text.length);
    this.model[id].data[0].text = newText;
  }
}
