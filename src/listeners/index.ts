import { busEvent } from "../events/exposed-events";
import { IFeatureReport, IScenario } from "../static-analyser-interface";
import { onFoundFixture } from "./fixture-listener";
import { IListenerInfo } from "./listener-interface";
import { onFoundTest } from "./test-listener";

export const listeners: Array<IListenerInfo<Partial<IFeatureReport| IScenario>>> = [
  {event: busEvent.foundFixture, process: onFoundFixture},
  {event: busEvent.foundTest, process: onFoundTest},
];
