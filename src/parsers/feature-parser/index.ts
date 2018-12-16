import { IFeatureReport } from "../../static-analyser-interface";
import { IParserInfo } from "../common/parser-interface";
import { parserEvent } from "./feature-events";
import { canParse, parse, updateContext } from "./feature-parser";

export const featureParserInfo: IParserInfo<Partial<IFeatureReport>> = {
    canParse,
    parse,
    updateContext,
};

export const featureParserEvent = parserEvent;
