export interface IParserInfo<T> {
  canParse: (line: string) => boolean;
  parse: (line: string, path: string, index: number) => IEventInfo<T>;
}

export interface IEventInfo<T> {
  event: string;
  eventArgs: T;
}
