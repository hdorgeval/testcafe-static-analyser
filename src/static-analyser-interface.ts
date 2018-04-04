export interface IFeatureReport {
  description: string;
  keyword: Keyword;
  name: string;
  line: number;
  id: string;
  tags: ITag[];
  uri: string;
  elements: IScenario[];
  metadata: IMetadata[];
}

export interface IMetadata {
  label?: string;
  name: string;
  value: string;
}

export interface IScenario {
  id: string;
  keyword: Keyword;
  line: number;
  name: string;
  tags: ITag[];
  type: string;
  steps: IStep[];
  status: StepStatus;
  sourceLine: string;
  uri: string;

}

export interface IStep {
  keyword: Keyword;
  name: string;
  result: IStepResult;
  hidden: boolean;
  match: IMatch;
  text: string;
}
export interface IMatch {
  location: string;
}
export interface IStepResult {
  status: StepStatus;
  duration: number;
}

export type StepStatus =
| "passed"
| "failed"
| "skipped"
| "undefined";
export interface ITag {
  name: string;
  line: number;
}
export type Keyword =
| "Feature"
| "Scenario"
| "Given"
| "Before"
| "When"
| "Then"
| "But"
| "Undefined"
| "test"
| ">"
;

export const testcafeDefaultStep: IStep = {
  hidden: false,
  keyword: ">",
  match: {
    location: "",
  },
  name: "_",
  result: {
    duration: 0,
    status: "passed",
  },
  text: "text",
};

export interface ICustomReportData {
  title: string;
  data: IMetadata[];
}

export interface IConfiguration {
  sourceFiles: string;
  reportHeader: string;
  reportTitle: string;
  reportDir: string;
  reportTempDir: string;
  noisyTags: string[];
  punctuations: string[];
  verbose: boolean;
}
