export interface IParserInfo<T> {
  canParse: (line: string, context: IParserContextInfo) => boolean;
  parse: (line: string, path: string, index: number) => IEventInfo<T>;
  updateContext: (line: string, context: IParserContextInfo) => void;
}

export interface IEventInfo<T> {
  event: string;
  eventArgs: T;
}

export type ParserContext =
| "fixture"
| "test";

export interface IParserContextInfo {
  currentContext: ParserContext;
}

export interface IRegexFilters {
  accepts: RegExp[];
  skips: RegExp[];
  rejects: RegExp[];
  keywords: RegExp[];
}

export interface IKeywordMapping {
  [index: string]: string;
}
