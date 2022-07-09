import CRUDControl from "@/components/molecules/crud-control";
import TableCellLoader from "@/components/molecules/table-cell-loader";
import CreateSongButton from "@/components/organisms/create-song-button";
import Repeat from "@/components/shared/molecules/repeat";
import TableBody from "@/components/shared/molecules/table-body";
import TableHeader from "@/components/shared/molecules/table-header";
import { useSearch } from "@/hooks/use-search";
import useSongListing from "@/hooks/use-song-listing";
import { Song } from "@/types/song";
import {
  Button,
  Group,
  MediaQuery,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { defaultTo } from "ramda";
import { FC, PropsWithChildren, useCallback, useState } from "react";
import { GoSearch } from "react-icons/go";

const defaultEmpty = (value: string) => (value.length === 0 ? "N/A" : value);

const FullWidthMobile: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MediaQuery smallerThan={"xs"} styles={{ width: "100%" }}>
      {children}
    </MediaQuery>
  );
};

interface ControlProps {
  search: {
    value: string;
    onChange: (
      value: string | React.ChangeEvent<any> | null | undefined
    ) => void;
  };
}

const Controls = (props: ControlProps) => {
  return (
    <FullWidthMobile>
      <Group spacing={"xs"}>
        <FullWidthMobile>
          <TextInput
            {...props.search}
            placeholder={"搜尋"}
            icon={<GoSearch />}
          />
        </FullWidthMobile>
        <FullWidthMobile>
          <CreateSongButton />
        </FullWidthMobile>
      </Group>
    </FullWidthMobile>
  );
};

const Songs = () => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const reset = useCallback(() => setPage(1), [setPage]);
  const { input, search } = useSearch(reset);
  const { data, isLoading } = useSongListing({
    pagination: { page, pageSize: pageSize },
    filters: { search },
  });

  return (
    <div>
      <Stack>
        <Group position={"apart"}>
          <Title order={2}>歌單一覽</Title>
          <Controls search={input} />
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
        <Group position={"apart"}>
          <Select
            placeholder={"頁面大小"}
            value={pageSize.toString()}
            sx={{ maxWidth: "175px" }}
            onChange={(s) => {
              if (!s) return;
              setPageSize(parseInt(s));
              setPage(1);
            }}
            data={[1, 5, 10, 15, 20, 50].map((ps) => ({
              value: ps.toString(),
              label: `${ps} 條 / 頁`,
            }))}
          />
          <Pagination
            page={page}
            onChange={setPage}
            total={defaultTo(1, data?.totalPages)}
          />
        </Group>
      </Stack>
    </div>
  );
};

export default Songs;
