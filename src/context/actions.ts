import { Action } from "../types/type";

export type TodoAction =
  | Action<"ADD", { title: string; text: string }>
  | Action<"COMPLETED", { id: number }>
  | Action<"EDIT", { id: any; title: string; text: string }>
  | Action<"UPDATED", { id: any }>
  | Action<"DELETE", { id: number }>