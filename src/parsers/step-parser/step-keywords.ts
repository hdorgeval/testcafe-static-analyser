import { IKeywordMapping } from "../common/parser-interface";
import { regexFilters } from "./step-filters";

export const keyword: IKeywordMapping = {
    and: "And",
    but: "But",
    given: "Given",
    only: "Only",
    then: "Then",
    when: "When",
};

export const getKeywordFrom = (line: string): string => {
    const matches = regexFilters
      .keywords
      .filter((r) => r.test(line))
      [0]
      .exec(line);

    const name = matches && matches[1]
              ? matches[1]
              : "";

    return keyword[name];
};
