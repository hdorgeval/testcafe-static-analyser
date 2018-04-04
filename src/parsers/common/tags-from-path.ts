import { getFilename, getParentDirs } from "../../fs";
import { options } from "../../options";
import { ITag } from "../../static-analyser-interface";

export const tagsFromFilePath = (filePath: string): ITag[] => {
  const dirs = getParentDirs(filePath);
  const tags = dirs
          .slice(1)
          .map( (dir) => ({name: `@${dir}`, line: 0}) );

  const filename = getFilename(filePath);
  // tslint:disable-next-line:no-console
  console.log(`filename: ${filename}`);
  if (filename && filename.length > 0) {
    const words =
    `${filename}`
      .replace(/-/gi, " ")
      .replace(/_/gi, " ")
      .replace(".js", "")
      .replace(".ts", "")
      .replace(".spec", "")
      .split(" ");
    // tslint:disable-next-line:no-console
    console.log(`words: ${words}`);

    words
      .map( (word) => word.trim())
      .filter( (word) => word.length > 2)
      .filter( (word) => !isNoisyTag(word, options.noisyTags ))
      .map( (word) => ({name: `@${word}`, line: 0}))
      .map( (tag) => tags.push(tag));
  }

  return tags;
};

export const tagsFromPhrase = (phrase: string): ITag[] => {
  const tags: ITag[] = [];
  if (phrase === undefined) {
    return tags;
  }
  const words = phrase
    .split(" ")
    .map((word) => word.trim())
    .map( (word) => removePunctuation(word, options.punctuations))
    .filter((word) => word.length > 2)
    .filter((word) => !isNoisyTag(word, options.noisyTags ));
  // tslint:disable-next-line:no-console
  console.log(`tagsFromPhrase words: ${words}`);
  words
    .filter((word) => isUniqueWordIn(word, words))
    .map((word) => ({name: `@${word}`, line: 0}))
    .map( (tag) => tags.push(tag));

  // tslint:disable-next-line:no-console
  console.log(`tagsFromPhrase tags: ${tags}`);
  return tags;
};

export const isUniqueWordIn = (word: string, words: string[]): boolean => {
  if (words && words.length === 0) {
    return true;
  }
  const isUnique = words
    .filter((item) => item.toLocaleLowerCase() === word.toLocaleLowerCase())
    .length === 1;
  // tslint:disable-next-line:no-console
  console.log(`tisUnique: ${isUnique}`);
  return isUnique;
};

export const isNoisyTag = (tag: string, unwantedTags: string[]): boolean => {
  if (unwantedTags && unwantedTags.length === 0) {
    return false;
  }
  const isNoisy = unwantedTags
    .filter((noisyTag) => noisyTag.toLocaleLowerCase() === tag.toLocaleLowerCase() )
    .length > 0;
  return isNoisy;
};

export const removePunctuation = (word: string, knownPunctuations: string[] ): string => {
  if (knownPunctuations && knownPunctuations.length === 0) {
    return word;
  }
  let result = word;
  knownPunctuations
    .map((punctuation) => result = result.replace(new RegExp(`/${punctuation}/gi`), ""));
  return result.trim();
};

export const isIn = (word: string, words: string[]): boolean => {
  if (words === undefined) {
    return false;
  }
  if (words.length === 0) {
    return false;
  }
  const result = words
    .filter((item) => item.toLocaleLowerCase() === word.toLocaleLowerCase())
    .length > 0;
  return result;
};
