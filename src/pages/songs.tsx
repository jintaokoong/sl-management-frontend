import TableCellLoader from "@/components/molecules/table-cell-loader";
import Repeat from "@/components/shared/molecules/repeat";
import TableBody from "@/components/shared/molecules/table-body";
import TableHeader from "@/components/shared/molecules/table-header";
import useSongListing from "@/hooks/use-song-listing";
import { Song } from "@/types/song";
import { GoTrashcan, GoPencil } from "react-icons/go";
import { Menu, Pagination, Paper, Stack, Table, Title } from "@mantine/core";
import { defaultTo } from "ramda";
import CRUDControl from "@/components/molecules/crud-control";
import { useBooleanToggle } from "@mantine/hooks";

const defaultEmpty = (value: string) => (value.length === 0 ? "N/A" : value);

const Songs = () => {
  const { data, isLoading } = useSongListing();
  return (
    <div>
      <Stack>
        <Title order={2}>歌單一覽</Title>
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
        <Pagination position={"right"} total={defaultTo(1, data?.totalPages)} />
      </Stack>
    </div>
  );
};

export default Songs;
