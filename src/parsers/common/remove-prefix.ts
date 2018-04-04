export const removePrefix = (prefixes: string[]) => {
  return {
    from: (line: string): string => {
      let result = line
                ? line.trim()
                : "";
      if (prefixes === undefined) {
        return line;
      }
      if (prefixes.length === 0) {
        return line;
      }
      prefixes
        .map( (prefix) => {
          if (result.startsWith(prefix)) {
            result = result
                      .substring(prefix.length)
                      .trim();
          }
        });

      return result;
    },
  };
};
