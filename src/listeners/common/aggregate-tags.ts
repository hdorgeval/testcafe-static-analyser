import { isIn } from "../../parsers/common/tags-from-path";
import { IFeatureReport, ITag } from "../../static-analyser-interface";

export const aggregateTagsInToFeatureTags = (tags: ITag[], feature: IFeatureReport) => {
    if (tags === undefined || feature === undefined) {
      return;
    }
    if (tags.length === 0) {
      return;
    }
    const allFeatureTags =
        feature
          .tags
          .map((tag) => tag.name);

    tags
      .filter((tag) =>  !isIn(tag.name, allFeatureTags))
      .map( (tag) => feature.tags.push(tag));
};
