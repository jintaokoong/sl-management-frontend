import { useQuery } from "react-query";
import songService from "@/services/song-service";

const useSongListing = () => {
  return useQuery(["song-listing"], songService.fetchListing);
};

export default useSongListing;
