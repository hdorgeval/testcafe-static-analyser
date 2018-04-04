import { IFeatureReport, IScenario } from "./static-analyser-interface";

export const features: IFeatureReport[] = [];
let currentFeature: IFeatureReport | undefined;
let currentScenario: IScenario | undefined;
export const setCurrentFeature = (input: IFeatureReport) => currentFeature = input;
export const getCurrentFeature = () => currentFeature;
export const setCurrentScenario = (input: IScenario) => currentScenario = input;
