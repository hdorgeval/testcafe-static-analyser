import { IScenario } from "../../static-analyser-interface";
import { IParserInfo } from "../common/parser-interface";
import { parserEvent } from "./scenario-events";
import { canParse, parse, updateContext } from "./scenario-parser";

export const scenarioParserInfo: IParserInfo<Partial<IScenario>> = {
    canParse,
    parse,
    updateContext,
};

export const scenarioParserEvent = parserEvent;
