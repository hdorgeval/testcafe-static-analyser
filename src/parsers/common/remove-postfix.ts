export const removePostfix = (postfixes: string[]) => {
  return {
    from: (line: string): string => {
      let result = line
                ? line.trim()
                : "";
      if (postfixes === undefined) {
        return line;
      }
      if (postfixes.length === 0) {
        return line;
      }
      postfixes
        .map( (postfix) => {
          if (result.endsWith(postfix)) {
            result = result
                      .substring(0, result.length - postfix.length)
                      .trim();
          }
        });

      return result;
    },
  };
};
