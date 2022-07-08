import { useQuery } from "react-query";
import songService from "@/services/song-service";
import { ListingOptions } from "@/types/listing-options";
import { flatten, map, values } from "ramda";

const nestedValues = (
  option: Record<string, unknown> | unknown[]
): unknown[] => {
  // if first level is of array, try expand each element recursively
  if (Array.isArray(option)) return map(nestedValues, option as any);
  // if first level is an object, try unfold object then recursively call
  if (!Array.isArray(option) && typeof option === "object")
    return nestedValues(values(option));
  // if first level is primitive, just return
  return option;
};
const extractValues = (options: ListingOptions) =>
  flatten(nestedValues(options as Record<string, unknown>));

const useSongListing = (options: ListingOptions) => {
  return useQuery(
    ["song-listing", ...extractValues(options)],
    () => songService.fetchListing(options),
    {
      keepPreviousData: true,
    }
  );
};

export default useSongListing;
