import { IRegexFilters } from "../common/parser-interface";

export const regexFilters: IRegexFilters = {
    accepts:
      [
        /given\((.*)\)/,
        /when\((.*)\)/,
        /then\((.*)\)/,
        /and\((.*)\)/,
        /but\((.*)\)/,
        /only\((.*)\)/,
        /\/\/\sGiven(.*)/,
        /\/\/\sWhen(.*)/,
        /\/\/\sThen(.*)/,
        /\/\/\sAnd(.*)/,
        /\/\/\sBut(.*)/,
        /\/\/\sOnly(.*)/,
      ],
    // tslint:disable-next-line:object-literal-sort-keys
    skips:
    [
      /\/\/\sgiven\((.*)\)/,
      /\/\/\swhen\((.*)\)/,
      /\/\/\sthen\((.*)\)/,
      /\/\/\sand\((.*)\)/,
      /\/\/\sbut\((.*)\)/,
      /\/\/\sonly\((.*)\)/,
    ],
    // tslint:disable-next-line:object-literal-sort-keys
    rejects: [
        /fixture.only\((.*)\)/,
        /describe.only\((.*)\)/,
        /test.only\((.*)\)/,
    ],
    keywords: [
        /(given|when|then|and|but|only)\((.*)\)/,
        /\/\/\s(Given|When|Then|And|But|Only)(.*)/,
    ],

};
