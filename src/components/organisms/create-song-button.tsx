import { Button } from "@mantine/core";
import { useState } from "react";

const CreateSongButton = () => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Button variant={"light"} onClick={() => setOpened(true)}>
        新增歌曲
      </Button>
    </>
  );
};

export default CreateSongButton;
