import network from "@/utils/network";
import ax from "@/configurations/ax";
import { ListingResponse } from "@/types/listing-response";
import { Song } from "@/types/song";
import { ListingOptions } from "@/types/listing-options";
import { flatten, mergeAll } from "ramda";
import { CreateSongRequest } from "@/types/create-song";
import { UpdateSongRequest } from "@/types/update-song";

const fetchListing = (options: ListingOptions) =>
  network.extract(
    ax.get<ListingResponse<Song>>("songs", {
      params: mergeAll(flatten(network.params(options))),
    })
  );

const createOne = (payload: CreateSongRequest) =>
  network.extract(ax.post<Song>("songs", payload));

const updateOne = (payload: UpdateSongRequest) =>
  network.extract(ax.put<Song>(`songs/${payload.id}`, payload));

const songService = { fetchListing, createOne, updateOne };

export default songService;
