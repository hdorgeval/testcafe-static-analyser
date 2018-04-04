# TestCafe Static Analyser

## A tool to make a static analysis of your TestCafe tests and to generate a nice and searchable html report from it.

## After cloning the repo

* run the command `npm install`.

## To use as a local npm module

* run the commands: 
```javascript
npm run build
npm link
```

## To install this in your TestCafe project

* go to the root directory of your TestCafe project
* run the command `npm link testcafe-static-analyser`
* insert the following script in the `package.json` file:
```javascript
"testcafe-static-analyser": "testcafe-static-analyser"
```
* do a first run with the command `npm run testcafe-static-analyser`
    * this will create the `testcafe-static-analyser.json` file
    * in this file modify the `sourceFiles` section
    * re-run again the command `npm run testcafe-static-analyser`

