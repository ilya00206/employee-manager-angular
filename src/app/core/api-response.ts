export interface ApiResponse<T> {
  readonly data: T[];
  readonly total: number;
  readonly hasMore: boolean;
}
