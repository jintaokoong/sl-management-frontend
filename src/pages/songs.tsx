import TableBody from "@/components/shared/molecules/table-body";
import TableHeader from "@/components/shared/molecules/table-header";
import useSongListing from "@/hooks/use-song-listing";
import { Song } from "@/types/song";
import { Pagination, Paper, Stack, Table, Title } from "@mantine/core";
import { defaultTo } from "ramda";

const defaultEmpty = (value: string) => (value.length === 0 ? "N/A" : value);

const Songs = () => {
  const { data } = useSongListing();
  return (
    <div>
      <Stack>
        <Title order={2}>歌單一覽</Title>
        <Paper withBorder p={"sm"}>
          <Table verticalSpacing={"sm"}>
            <TableHeader headers={["歌名", "歌手", "類型"]} />
            <TableBody data={defaultTo<Song[], Song[]>([], data?.data)}>
              {(song) => (
                <tr key={song._id}>
                  <td>{song.name}</td>
                  <td>{song.artist}</td>
                  <td>{defaultEmpty(song.genres.join(", "))}</td>
                </tr>
              )}
            </TableBody>
          </Table>
        </Paper>
        <Pagination position={"right"} total={1} />
      </Stack>
    </div>
  );
};

export default Songs;
