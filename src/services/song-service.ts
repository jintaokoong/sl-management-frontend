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
  if (typeof value !== "object" && key) return [{ [key]: value }];
  if (typeof value === "object")
    return Object.entries(value!).map(([key, value]) =>
      extractProps(value, key)
    );
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
