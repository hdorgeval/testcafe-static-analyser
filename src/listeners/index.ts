import { featureParserEvent } from "../parsers/feature-parser";
import { scenarioParserEvent } from "../parsers/scenario-parser";
import { stepParserEvent } from "../parsers/step-parser";
import { IFeatureReport, IScenario, IStep } from "../static-analyser-interface";
import { onFoundFeature, onStartFeature, onTagFeature } from "./feature-listener";
import { IListenerInfo } from "./listener-interface";
import { onFoundScenario, onStartScenario, onTagScenario } from "./scenario-listener";
import { onFoundStep } from "./step-listener";

export const listeners: Array<IListenerInfo<Partial<IFeatureReport| IScenario | IStep>>> = [
  {event: featureParserEvent.startFeature, process: onStartFeature},
  {event: featureParserEvent.tagFeature, process: onTagFeature},
  {event: featureParserEvent.foundFeature, process: onFoundFeature},
  {event: scenarioParserEvent.foundScenario, process: onFoundScenario},
  {event: scenarioParserEvent.startScenario, process: onStartScenario},
  {event: scenarioParserEvent.tagScenario, process: onTagScenario},
  {event: stepParserEvent.foundStep, process: onFoundStep},
];
