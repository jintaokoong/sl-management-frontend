import CRUDControl from "@/components/molecules/crud-control";
import TableCellLoader from "@/components/molecules/table-cell-loader";
import Repeat from "@/components/shared/molecules/repeat";
import TableBody from "@/components/shared/molecules/table-body";
import TableHeader from "@/components/shared/molecules/table-header";
import { useSearch } from "@/hooks/use-search";
import useSongListing from "@/hooks/use-song-listing";
import { Song } from "@/types/song";
import {
  Button,
  Group,
  Pagination,
  Paper,
  Stack,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { defaultTo } from "ramda";
import { useState } from "react";
import { GoSearch } from "react-icons/go";

const defaultEmpty = (value: string) => (value.length === 0 ? "N/A" : value);

const Songs = () => {
  const { input, search } = useSearch();
  const [pageSize] = useState(10);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useSongListing({
    pagination: { page, pageSize },
    filters: { search },
  });

  return (
    <div>
      <Stack>
        <Group position={"apart"}>
          <Title order={2}>歌單一覽</Title>
          <Group spacing={"xs"}>
            <TextInput
              value={input.value}
              onChange={input.onChange}
              placeholder={"搜尋"}
              icon={<GoSearch />}
            />
            <Button variant={"light"}>新增歌曲</Button>
          </Group>
        </Group>
        <Paper withBorder p={"sm"}>
          <Table verticalSpacing={"sm"}>
            <TableHeader headers={["歌名", "歌手", "類型", "操控"]} />
            <TableBody
              loading={isLoading}
              data={defaultTo<Song[], Song[]>([], data?.data)}
              fallback={
                <tr>
                  <Repeat occurence={4}>
                    <TableCellLoader />
                  </Repeat>
                </tr>
              }
            >
              {(song) => (
                <tr key={song._id}>
                  <td>{song.name}</td>
                  <td>{song.artist}</td>
                  <td>{defaultEmpty(song.genres.join(", "))}</td>
                  <td>
                    <CRUDControl
                      onEdit={() => console.log("edit", song._id)}
                      onDelete={() => console.log("delete", song._id)}
                    />
                  </td>
                </tr>
              )}
            </TableBody>
          </Table>
        </Paper>
        <Pagination
          position={"right"}
          page={page}
          onChange={setPage}
          total={defaultTo(1, data?.totalPages)}
        />
      </Stack>
    </div>
  );
};

export default Songs;
