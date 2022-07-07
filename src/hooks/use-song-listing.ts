import { useQuery } from "react-query";
import songService from "@/services/song-service";
import ax from "@/configurations/ax";

const useSongListing = () => {
  return useQuery(["song-listing"], () => ax.get("songs"));
};

export default useSongListing;
