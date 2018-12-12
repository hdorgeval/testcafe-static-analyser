export interface IFeatureReport {
  description: string;
  keyword: string;
  name: string;
  line: number;
  id: string;
  tags: ITag[];
  uri: string;
  elements: IScenario[];
  metadata: IMetadata[];
  skipped: boolean;
}

export interface IMetadata {
  label?: string;
  name: string;
  value: string;
}

export interface IScenario {
  id: string;
  keyword: string;
  line: number;
  name: string;
  tags: ITag[];
  type: string;
  steps: IStep[];
  status: StepStatus;
  sourceLine: string;
  uri: string;
  skipped: boolean;

}

export interface IStep {
  keyword: string;
  name: string;
  result: IStepResult;
  hidden: boolean;
  match: IMatch;
  text: string;
  tags: ITag[];
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
  tags: [],
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
  reportArchiveDir?: string;
  reportDir: string;
  reportTempDir: string;
  noisyTags: string[];
  punctuations: string[];
  verbose: boolean;
  outputAsArchive?: boolean;
}
