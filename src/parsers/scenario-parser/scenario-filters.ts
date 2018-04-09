import { IRegexFilters } from "../common/parser-interface";

export const regexFilters: IRegexFilters = {
    accepts:
      [
        /test\(`([^`]*)/,
        /test\((.*),\s/,
        /test.skip\((.*),\s/,
        /test.only\((.*),\s/,
        /.beforeEach\((.*)/,
      ],
    // tslint:disable-next-line:object-literal-sort-keys
    skips:
    [
        /\/\/\stest\(`(.*)/,
        /\/\/\stest\((.*),\s/,
        /test.skip\(`(.*)/,
        /test.skip\((.*),\s/,
        /\/\/\s.beforeEach\((.*)/,
    ],
    // tslint:disable-next-line:object-literal-sort-keys
    rejects: [

    ],
    keywords: [
        /(test)\(`([^`]*)/,
        /(test)\((.*),\s/,
        /(test).only\((.*),\s/,
        /(test).skip\((.*),\s/,
        /\.(beforeEach)\((.*)/,
    ],

};
