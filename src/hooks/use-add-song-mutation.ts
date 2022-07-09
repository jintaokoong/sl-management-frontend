import songService from "@/services/song-service";
import { useMutation, useQueryClient } from "react-query";

const useAddSongMutation = () => {
  const qc = useQueryClient();
  return useMutation(["add-song-mutation"], songService.createOne, {
    onSuccess: () => {
      return qc.invalidateQueries(["song-listing"]);
    },
  });
};

export default useAddSongMutation;
