import { jsonFrom } from "./fs";
import { customReportFilePath, options } from "./options";
// tslint:disable-next-line:no-var-requires
const report = require("multiple-cucumber-html-reporter");
// tslint:disable-next-line:no-var-requires
const zipFolder = require("zip-folder");

export const generateAndOpenHtmlReport = () => {
    const customData = jsonFrom(customReportFilePath);
    report.generate({
        customData: {
            ...customData,
        },
        customMetadata: true,
        disableLog: true,
        displayDuration: false,
        jsonDir: options.reportDir,
        openReportInBrowser: true,
        reportName: options.reportHeader,
        reportPath: options.reportDir,
    });
};

export const generateAndArchive = () => {
    const customData = jsonFrom(customReportFilePath);
    report.generate({
        customData: {
            ...customData,
        },
        customMetadata: true,
        disableLog: true,
        displayDuration: false,
        jsonDir: options.reportDir,
        openReportInBrowser: false,
        reportName: options.reportHeader,
        reportPath: options.reportDir,
    });

    // tslint:disable:no-console
    zipFolder(options.reportDir, `${options.reportDir}/archive.zip`, (error: any) => {
        if (!!error) {
            console.warn(`> TestCafe Static Analyser: cannot zip folder '${options.reportDir}'`);
        }
    });
};
