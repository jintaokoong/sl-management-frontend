import network from "@/utils/network";
import ax from "@/configurations/ax";
import { ListingResponse } from "@/types/listing-response";
import { Song } from "@/types/song";
import { ListingOptions } from "@/types/listing-options";
import { flatten, keys, mergeAll } from "ramda";

const extractProps = (
  value: Record<string, unknown> | unknown,
  key?: string
): object[] => {
  // end case: if value is of primitive and key is defined, then return
  if (typeof value !== "object" && key) return [{ [key]: value }];
  // start case: if key is not provided, expand the object
  if (typeof value === "object")
    return Object.entries(value!).map(([key, value]) =>
      extractProps(value, key)
    );
  // intermediate case: recursively call function
  return extractProps(value, key);
};

const fetchListing = (options: ListingOptions) =>
  network.extract(
    ax.get<ListingResponse<Song>>("songs", {
      params: mergeAll(flatten(extractProps(options))),
    })
  );

const songService = { fetchListing };

export default songService;
