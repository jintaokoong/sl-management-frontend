export interface ListingResponse<T> {
  data: T[];
  record: number;
  page: number;
  pageSize: number;
}
