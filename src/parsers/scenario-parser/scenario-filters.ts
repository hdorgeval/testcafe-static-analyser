import { IRegexFilters } from "../common/parser-interface";

export const regexFilters: IRegexFilters = {
    accepts:
      [
        /test\((.*),\s/,
        /test.skip\((.*),\s/,
        /test.only\((.*),\s/,
        /.beforeEach\((.*)/,
      ],
    // tslint:disable-next-line:object-literal-sort-keys
    skips:
    [
        /\/\/\stest\((.*),\s/,
        /test.skip\((.*),\s/,
        /\/\/\s.beforeEach\((.*)/,
    ],
    // tslint:disable-next-line:object-literal-sort-keys
    rejects: [

    ],
    keywords: [
        /(test)\((.*),\s/,
        /(test).only\((.*),\s/,
        /(test).skip\((.*),\s/,
        /\.(beforeEach)\((.*)/,
    ],

};
