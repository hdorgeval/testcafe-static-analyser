import { IKeywordMapping } from "./parser-interface";
// tslint:disable:no-console
export const extractTextFrom = (line: string) => {
    return {
        withFilters: (filters: RegExp[]) => {
            return {
                withMapping: (mapping: IKeywordMapping) => {
                    const foundFilter =
                            filters
                                .filter( (r) => r.test(line))
                                [0];
                    if (foundFilter === undefined) {
                        return undefined;
                    }
                    const matches = foundFilter.exec(line);
                    const text = matches && matches[1]
                                ? matches[1]
                                : undefined;
                    if (mapping && text && mapping[text]) {
                        return mapping[text];
                    }
                    return text;
                },
            };
        },
    };
};
