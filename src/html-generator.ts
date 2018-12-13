import { jsonFrom } from "./fs";
import { customReportFilePath, options } from "./options";
// tslint:disable-next-line:no-var-requires
const report = require("multiple-cucumber-html-reporter");
// tslint:disable-next-line:no-var-requires
const archiver = require("archiver");
// tslint:disable-next-line:no-var-requires
const fs = require("fs");

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
        reportArchiveDir: options.reportArchiveDir,
        reportName: options.reportHeader,
        reportPath: options.reportDir,
    });

    const archive = archiver("zip");
    const output = fs.createWriteStream(`${options.reportArchiveDir}/archive.zip`);

    // tslint:disable:no-console
    archive.on("error", () => console.warn(`> TestCafe Static Analyser: cannot zip folder '${options.reportDir}'`));
    archive.pipe(output);
    archive.glob(`${options.reportDir}/**/*.**`);
    archive.finalize();
};
