import { join } from "path";
import { defaultOptions } from "./default-options";
import { fileExists, jsonFrom, writeJsonFileSync } from "./fs";
import { IConfiguration } from "./static-analyser-interface";

export const defaultConfigurationFilePath = "testcafe-static-analyser.json";
const ensureConfigFileExists = (filepath: string) => {
    if (fileExists(filepath)) {
        return;
    }
    writeJsonFileSync(defaultOptions, defaultConfigurationFilePath);
};

ensureConfigFileExists(defaultConfigurationFilePath);
const defaultConfig = jsonFrom(defaultConfigurationFilePath) as IConfiguration;

export const options = defaultConfig;

export const customReportFilePath = join(options.reportTempDir, "static-analyser-custom-data.json");
export const finalReportFilePath = join(options.reportDir, "static-analyser-report.json");
