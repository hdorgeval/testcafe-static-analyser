import { IConfiguration } from "./static-analyser-interface";

export const defaultOptions: IConfiguration = {
    noisyTags: ["given", "when", "then", "but", "only", "not", "can", "cannot", "able", "with", "did"],
    punctuations: [".", ":", "!", ",", ";"],
    reportDir: "reports/static-analyser",
    reportHeader: "TestCafe Static Analyser Report",
    reportTempDir: "reports/temp",
    reportTitle: "TestCafe Starter",
    sourceFiles: "features/**/*.spec.ts",
    verbose: false,
};
