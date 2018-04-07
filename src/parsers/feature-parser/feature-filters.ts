import { IRegexFilters } from "../common/parser-interface";

export const regexFilters: IRegexFilters = {
    accepts:
      [
        /fixture\((.*)\)/,
        /fixture.skip\((.*)\)/,
        /fixture.only\((.*)\)/,
      ],
    // tslint:disable-next-line:object-literal-sort-keys
    skips:
    [
        /\/\/\sfixture\((.*)\)/,
        /fixture.skip\((.*)\)/,
    ],
    // tslint:disable-next-line:object-literal-sort-keys
    rejects: [

    ],
    keywords: [
        /(fixture)\((.*)\)/,
        /(fixture).skip\((.*)\)/,
        /(fixture).only\((.*)\)/,
    ],

};
