export enum TodoActionKind {
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  CHECK_TODO = 'CHECK_TODO',
}

export interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: number
}

export type Theme = 'dark' | 'light'

export type SortBy = 'time' | 'completed'
