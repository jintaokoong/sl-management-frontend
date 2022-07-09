import { SharedFormProps } from "@/types/shared-form-props";
import { SongFormValues, songSchema } from "@/validations/song-schema";
import { Text, Button, MultiSelect, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";

export type Props = SharedFormProps<SongFormValues>;

const SongForm = (p: Props) => {
  const { getInputProps, onSubmit } = useForm<SongFormValues>({
    initialValues: p.initialValues,
    schema: zodResolver(songSchema),
  });
  const [items, setItems] = useState<string[]>([]);
  return (
    <form onSubmit={onSubmit(p.onSubmit)}>
      <Stack>
        <TextInput label={"歌名"} {...getInputProps("name")} />
        <TextInput label={"歌手"} {...getInputProps("artist")} />
        <MultiSelect
          label={"類型"}
          data={items}
          creatable
          searchable
          getCreateLabel={(query) => `+ 追加 ${query}`}
          onCreate={(query) => setItems((i) => [...i, query])}
          {...getInputProps("genres")}
        />
        {p.networkError && <Text color={"red"}>{p.networkError}</Text>}
        <Button type={"submit"} loading={p.isMutating}>
          上傳
        </Button>
      </Stack>
    </form>
  );
};

export default SongForm;
