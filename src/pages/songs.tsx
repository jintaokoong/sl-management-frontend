import useSongListing from "@/hooks/use-song-listing";

const Songs = () => {
  const { data } = useSongListing();
  return <div>Songs</div>;
};

export default Songs;
