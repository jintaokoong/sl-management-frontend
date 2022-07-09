import { z } from "zod";

export const songSchema = z.object({
  name: z.string().min(1),
  artist: z.string().min(1),
  genres: z.array(z.string()),
});

export type SongFormValues = z.infer<typeof songSchema>;
