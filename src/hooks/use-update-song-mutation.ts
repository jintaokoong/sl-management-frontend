import songService from "@/services/song-service";
import { useMutation, useQueryClient } from "react-query";

const useUpdateSongMutation = () => {
  const qc = useQueryClient();
  return useMutation(["update-song-mutation"], songService.updateOne, {
    onSuccess: () => {
      return qc.invalidateQueries(["song-listing"]);
    },
  });
};

export default useUpdateSongMutation;
