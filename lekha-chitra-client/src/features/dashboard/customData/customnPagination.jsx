import { Box, Pagination } from "@mui/material";
import {
  useGridApiContext,
  useGridSelector,
  gridPageCountSelector,
  gridPaginationModelSelector,
} from "@mui/x-data-grid";

function CustomPagination() {
  const apiRef = useGridApiContext();

  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const paginationModel = useGridSelector(
    apiRef,
    gridPaginationModelSelector
  );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        py: 1,
      }}
    >
      <Pagination
        count={pageCount}
        page={paginationModel.page + 1}
        onChange={(_, value) => apiRef.current.setPage(value - 1)}
        shape="rounded"
        size="small"
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: "8px",
            fontWeight: 600,
          },
          "& .Mui-selected": {
            backgroundColor: "#032A5C !important",
            color: "#fff",
          },
        }}
      />
    </Box>
  );
}

export default CustomPagination;