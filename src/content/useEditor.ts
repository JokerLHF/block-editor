// import { inject, provide } from "vue";
import { Editor, IModel } from "../core";
import { useSelection } from "../core/hooks/use-selection";

export const useEditor = (initialModel: IModel, editorContainer: HTMLElement) => {
  const editor = new Editor(initialModel, editorContainer);
  useSelection(editor);
  // provide('editor', editor);
  // 测试
  (window as any).editor = editor;
  return editor;
}

export const getEditor = () => {
  // return inject('editor') as Editor
  const res = (window as any).editor as Editor
  console.log('editor', res);
  
  return res;
}