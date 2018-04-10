import { IRegexFilters } from "../common/parser-interface";

export const regexFilters: IRegexFilters = {
    accepts:
      [
        /fixture\((.*)\).page/,
        /fixture\((.*)\)/,
        /fixture.skip\((.*)\)/,
        /fixture.only\((.*)\)/,
        /fixture[\s]*`(.*)`/,
        /fixture.skip[\s]*`(.*)`/,
        /fixture.only[\s]*`(.*)`/,
      ],
    // tslint:disable-next-line:object-literal-sort-keys
    skips:
    [
        /\/\/\sfixture\((.*)\)/,
        /fixture.skip\((.*)\)/,
        /fixture.skip[\s]*`(.*)`/,
        /\/\/\sfixture[\s]*`(.*)`/,
    ],
    // tslint:disable-next-line:object-literal-sort-keys
    rejects: [

    ],
    keywords: [
        /(fixture)\((.*)\)/,
        /(fixture).skip\((.*)\)/,
        /(fixture).only\((.*)\)/,
        /(fixture)[\s]*`(.*)`/,
        /(fixture).only[\s]*`(.*)`/,
        /(fixture).skip[\s]*`(.*)`/,
    ],

};
