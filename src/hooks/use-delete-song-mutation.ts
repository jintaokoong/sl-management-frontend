import songService from "@/services/song-service";
import { useMutation, useQueryClient } from "react-query";

const useDeleteSongMutation = () => {
  const qc = useQueryClient();
  return useMutation(["delete-song-mutation"], songService.deleteOne, {
    onSuccess: () => {
      return qc.invalidateQueries(["song-listing"]);
    },
  });
};

export default useDeleteSongMutation;
