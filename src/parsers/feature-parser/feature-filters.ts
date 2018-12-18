import { IRegexFilters } from "../common/parser-interface";

export const regexFilters: IRegexFilters = {
    accepts:
      [
        /fixture$/,
        /fixture.skip$/,
        /fixture.only$/,
        /fixture\((.*)\).page/,
        /fixture\((.*)\)/,
        /fixture.skip\((.*)\)/,
        /fixture.only\((.*)\)/,
        /fixture[\s]*`(.*)`/,
        /fixture.skip[\s]*`(.*)`/,
        /fixture.only[\s]*`(.*)`/,
        /^[\s]*\((.*),\s/,
        /.meta\((.*)\)/,
      ],
    // tslint:disable-next-line:object-literal-sort-keys
    skips:
    [
        /fixture.skip$/,
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
        /.(meta)\((.*)\)/,
    ],

};
