import { IConfiguration } from "./static-analyser-interface";

export const defaultOptions: IConfiguration = {
    noisyTags: [
        "able",
        "and",
        "async",
        "but",
        "can",
        "cannot",
        "did",
        "given",
        "not",
        "only",
        "the",
        "then",
        "with",
        "when",
        "(t)",
    ],
    punctuations: [".", ":", "!", ",", ";"],
    reportDir: "reports/static-analyser",
    reportHeader: "TestCafe Static Analyser Report",
    reportTempDir: "reports/temp",
    reportTitle: "TestCafe E2E Tests Analysis",
    sourceFiles: "tests/**/*.spec.ts",
    verbose: false,
};
