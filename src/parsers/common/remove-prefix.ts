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
          // tslint:disable-next-line:no-console
          console.log(`prefix: ${prefix} - result=${result}`);
          if (result.startsWith(prefix)) {
            result = result
                      .substring(prefix.length)
                      .trim();
            // tslint:disable-next-line:no-console
          }
        });

      return result;
    },
  };
};
