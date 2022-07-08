import network from "@/utils/network";
import ax from "@/configurations/ax";
import { ListingResponse } from "@/types/listing-response";
import { Song } from "@/types/song";

const fetchListing = () =>
  network.extract(ax.get<ListingResponse<Song>>("songs"));

const songService = { fetchListing };

export default songService;
