import { ISelection, SelectionPoint } from "../hooks/use-selection";

export const isEqualSelection = (s1: ISelection | null, s2: ISelection | null) => {
  return s1?.anchor.blockId === s2?.anchor.blockId 
    && s1?.anchor.offset === s2?.anchor.offset
    && s1?.focus.blockId === s2?.focus.blockId
    && s1?.focus.offset === s2?.focus.offset;
}

export const isCollesped = (s1: SelectionPoint, s2: SelectionPoint) => {
  return s1.blockId === s2.blockId 
  && s1.offset === s2.offset
}