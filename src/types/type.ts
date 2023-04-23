export interface Todo {
  id: number;
  title: string;
  text: string;
  done: boolean;
}

export interface Action <T, P> {
  type: T;
  payload: P;
}