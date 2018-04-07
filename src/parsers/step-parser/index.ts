import { IStep } from "../../static-analyser-interface";
import { IParserInfo } from "../common/parser-interface";
import { parserEvent } from "./step-events";
import { canParse, parse } from "./step-parser";

export const stepParserInfo: IParserInfo<Partial<IStep>> = {
    canParse,
    parse,
};

export const stepParserEvent = parserEvent;
