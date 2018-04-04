export interface IListenerInfo<T> {
  event: string;
  process: (input: T) => void;
}
