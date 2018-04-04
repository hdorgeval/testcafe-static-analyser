import { IFeatureReport, IScenario } from "../static-analyser-interface";
import { fixtureParserInfo } from "./fixture-parser";
import { IParserInfo } from "./parser-interface";
import { testParserInfo } from "./test-parser";

export const parsers: Array<(IParserInfo<Partial<IFeatureReport>> | IParserInfo<Partial<IScenario>>)> = [
  fixtureParserInfo,
  testParserInfo,
];
