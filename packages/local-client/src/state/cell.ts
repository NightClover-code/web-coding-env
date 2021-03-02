//cell interface
export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}
//cell types
export type CellTypes = 'code' | 'text';
