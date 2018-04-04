import { eventBus } from "./events/event-bus";
import { getFilesFromGlob, readAllLines, writeJsonFileSync } from "./fs";
import { generateAndOpenHtmlReport } from "./html-generator";
import { listeners } from "./listeners";
import { customReportFilePath, finalReportFilePath, options } from "./options";
import { parsers } from "./parsers";
import { features } from "./shared-data";
import { ICustomReportData } from "./static-analyser-interface";

const featureFiles = getFilesFromGlob(options.sourceFiles);

if (featureFiles && featureFiles.length === 0) {
  // tslint:disable-next-line:no-console
  console.warn(`TestCafe Static Analyser: no file found in '${options.sourceFiles}'`);
  // tslint:disable-next-line:no-console
  console.warn(`Check the 'sourceFiles' section in the 'testcafe-static-analyser.json' file`);
  process.exit(1);
}

listeners
  .map((listener) => {
    eventBus
      .register(listener.process)
      .forEvent(listener.event);
  });

const parseLineInFile = (line: string, path: string, index: number) => {
  parsers
    .filter((p) => p.canParse(line))
    .map((p) => p.parse(line, path, index))
    .map(((eventInfo) => eventBus.send(eventInfo.event, eventInfo.eventArgs)));
};

featureFiles
  .forEach( (file: string) => {
    readAllLines(file)
      .map((line, index) => parseLineInFile(line, file, index));
  });

features
  .map((f) => f.metadata.push({name: "Scenarios", value: `${f.elements.length}`}));

features
  .map((f) => {
    const skippedScenarios = f
            .elements
            .filter((scenario) => scenario.status === "skipped")
            .length;
    f.metadata.push({name: "Skipped Scenarios", value: `${skippedScenarios}`});
  });

writeJsonFileSync(features, finalReportFilePath);

const customReportData: ICustomReportData = {
  data: [
    {label: "Generation Date", value: new Date().toISOString(), name: ""},
  ],
  title: options.reportTitle,
};
writeJsonFileSync(customReportData, customReportFilePath );
generateAndOpenHtmlReport();
