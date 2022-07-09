import useUpdateSongMutation from "@/hooks/use-update-song-mutation";
import { Song } from "@/types/song";
import { UpdateSongRequest } from "@/types/update-song";
import { Modal, ModalProps } from "@mantine/core";
import { AxiosError } from "axios";
import { path, pick } from "ramda";
import { useCallback, useState } from "react";
import SongForm from "./song-form";

interface Props extends Pick<ModalProps, "opened" | "onClose"> {
  song: Song | undefined;
}

type FormValue = Omit<UpdateSongRequest, "id">;

const initialValues: FormValue = {
  artist: "",
  genres: [],
  name: "",
};

const UpdateSongModal = (p: Props) => {
  const { mutate, isLoading } = useUpdateSongMutation();
  const [error, setError] = useState<string>("");
  const onSubmit = useCallback(
    (values: FormValue) => {
      if (p.song?._id === undefined)
        return console.error("abnormal state. abort.");
      mutate(
        { ...values, id: p.song._id },
        {
          onSuccess: () => p.onClose(),
          onError: (error) => {
            if (
              error &&
              error instanceof AxiosError &&
              path(["response", "data", "message"], error)
            ) {
              setError(error.response?.data.message);
            } else {
              setError("伺服器要求發生了錯誤");
            }
          },
        }
      );
    },
    [p.song, setError, p.onClose]
  );

  return (
    <Modal
      title={"編輯歌曲"}
      opened={p.opened}
      onClose={() => {
        p.onClose();
        setError("");
      }}
    >
      <SongForm
        isMutating={isLoading}
        networkError={error}
        initialValues={
          p.song ? pick(["name", "artist", "genres"], p.song) : initialValues
        }
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

export default UpdateSongModal;
