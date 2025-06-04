export type RefreshableProps = {
  refreshKey?: number;
  handleRefresh?: () => void;
  onRowClick?: (id: string) => void;
};
