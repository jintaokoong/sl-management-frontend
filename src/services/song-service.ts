import network from "@/utils/network";
import ax from "@/configurations/ax";
import { ListingResponse } from "@/types/listing-response";
import { Song } from "@/types/song";
import { ListingOptions } from "@/types/listing-options";
import { flatten, mergeAll } from "ramda";
import { CreateSongRequest } from "@/types/create-song";

const fetchListing = (options: ListingOptions) =>
  network.extract(
    ax.get<ListingResponse<Song>>("songs", {
      params: mergeAll(flatten(network.params(options))),
    })
  );

const createOne = (payload: CreateSongRequest) =>
  network.extract(ax.post<Song>("songs", payload));

const songService = { fetchListing, createOne };

export default songService;
