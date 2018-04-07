import { IFeatureReport } from "../../static-analyser-interface";
import { IParserInfo } from "../common/parser-interface";
import { parserEvent } from "./feature-events";
import { canParse, parse } from "./feature-parser";

export const featureParserInfo: IParserInfo<Partial<IFeatureReport>> = {
    canParse,
    parse,
};

export const featureParserEvent = parserEvent;
