import useAddSongMutation from "@/hooks/use-add-song-mutation";
import { SongFormValues } from "@/validations/song-schema";
import { Button, Modal } from "@mantine/core";
import { AxiosError } from "axios";
import { path } from "ramda";
import { useCallback, useState } from "react";
import SongForm from "./song-form";

const initialValues: SongFormValues = {
  name: "",
  artist: "",
  genres: [],
};

const CreateSongButton = () => {
  const [opened, setOpened] = useState(false);
  const { mutate, isLoading } = useAddSongMutation();
  const [error, setError] = useState("");
  const onSubmit = useCallback(
    (value: SongFormValues) => {
      mutate(value, {
        onSuccess: () => {
          setOpened(false);
        },
        onError: (error) => {
          if (
            error &&
            error instanceof AxiosError &&
            path(["response", "data", "message"], error)
          ) {
            setError(error.response?.data.message);
          } else {
            setError("伺服器要求出現了錯誤");
          }
        },
      });
    },
    [mutate, setOpened, setError]
  );
  return (
    <>
      <Button variant={"light"} onClick={() => setOpened(true)}>
        新增歌曲
      </Button>
      <Modal
        title={"新增歌曲"}
        size={"lg"}
        opened={opened}
        onClose={() => {
          setOpened(false);
          setError("");
        }}
      >
        <SongForm
          isMutating={isLoading}
          networkError={error}
          initialValues={initialValues}
          onSubmit={onSubmit}
        />
      </Modal>
    </>
  );
};

export default CreateSongButton;
