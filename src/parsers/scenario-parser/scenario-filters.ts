import { IRegexFilters } from "../common/parser-interface";

export const regexFilters: IRegexFilters = {
    accepts:
    [
        /test$/,
        /test.skip$/,
        /test.only$/,
        /test\(`([^`]*)/,
        /test\((.*),\s/,
        /test.skip\((.*),\s/,
        /test.only\((.*),\s/,
        /test.requestHooks\([^'`"]*\)\((.*),\s/,
        /test.skip.requestHooks\([^'`"]*\)\((.*),\s/,
        /test.only.requestHooks\([^'`"]*\)\((.*),\s/,
        /.beforeEach\((.*)/,
        /^[\s]*\((.*),\s/,
        /.meta\((.*)\)/,
      ],
    // tslint:disable-next-line:object-literal-sort-keys
    skips:
    [
        /test.skip$/,
        /\/\/\stest\(`(.*)/,
        /\/\/\stest\((.*),\s/,
        /test.skip\(`(.*)/,
        /test.skip\((.*),\s/,
        /test.skip.requestHooks\([^'`"]*\)\((.*),\s/,
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
        /(test).skip\([^'`"]*\)\((.*),\s/,
        /(test).requestHooks\([^'`"]*\)\((.*),\s/,
        /(test).skip.requestHooks\([^'`"]*\)\((.*),\s/,
        /(test).only.requestHooks\([^'`"]*\)\((.*),\s/,
        /\.(beforeEach)\((.*)/,
        /.(meta)\((.*)\)/,
    ],

};
