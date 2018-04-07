import { IFeatureReport, IScenario, IStep } from "../static-analyser-interface";
import { IParserInfo } from "./common/parser-interface";
import { featureParserInfo } from "./feature-parser";
import { scenarioParserInfo } from "./scenario-parser";
import { stepParserInfo } from "./step-parser";

export const parsers: Array<(
          IParserInfo<Partial<IFeatureReport>>
        | IParserInfo<Partial<IScenario>>
        | IParserInfo<Partial<IStep>>)>
  = [
      featureParserInfo,
      scenarioParserInfo,
      stepParserInfo,
];
