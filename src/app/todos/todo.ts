export interface Todo {
  id?: number;
  title: string;
  completed: boolean;
  createdAt: number;
  lastUpdate?: number;
}
