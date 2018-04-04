import { jsonFrom } from "./fs";
import { customReportFilePath, options } from "./options";
// tslint:disable-next-line:no-var-requires
const report = require("multiple-cucumber-html-reporter");

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
