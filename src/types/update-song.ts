import { CreateSongRequest } from "./create-song";

export interface UpdateSongRequest extends CreateSongRequest {
  id: string;
}
