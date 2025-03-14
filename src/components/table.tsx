import styled from "styled-components";
import DataTable, {
  IDataTableProps,
  TableStyles,
} from "react-data-table-component";
import { useEffect, useState } from "react";

const CustomPagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  currentPage,
}) => {
  const totalPages = Math.ceil(rowCount / rowsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1);
    }
  };

  // Logic for displaying three pages dynamically
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = currentPage - 1 > 0 ? currentPage - 1 : 1;

    // If currentPage is too close to the last page, adjust startPage
    if (startPage + 2 > totalPages) {
      startPage = totalPages - 2 > 0 ? totalPages - 2 : 1;
    }

    for (let i = startPage; i < startPage + 3 && i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        padding: "10px",
        margin: "10px",
      }}
    >
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        style={{
          padding: "8px 16px",
          backgroundColor: currentPage === 1 ? "#cccccc" : "#415AA8",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          marginRight: "8px",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        Prev
      </button>

      {/* Dynamically render page numbers */}
      {pageNumbers.map((page) => (
        <span
          key={page}
          onClick={() => onChangePage(page)}
          style={{
            color: currentPage === page ? "#fff" : "#000",
            backgroundColor: currentPage === page ? "#415AA8" : "#EBEDF0",
            padding: "10px",
            borderRadius: "5px",
            height: "40px",
            width: "40px",
            margin: "5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          {page}
        </span>
      ))}

      {/* Show ellipsis if there are more pages after the current three */}
      {totalPages > 3 && currentPage + 1 < totalPages && (
        <span style={{ margin: "0 5px" }}>...</span>
      )}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        style={{
          padding: "8px 16px",
          backgroundColor: currentPage === totalPages ? "#cccccc" : "#415AA8",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          marginLeft: "8px",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        Next
      </button>
    </div>
  );
};

const rowTheme: TableStyles = {
  headRow: {
    style: {
      minHeight: "50px",
      height: "50px",
      backgroundColor: "#fff",
      borderRadius: "5px",
      overflow: "hidden",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#fff",
      color: "#000",
      fontSize: "0.8rem",
      fontWeight: 600,
    },
  },
  rows: {
    style: {
      spacing: "spaced",
      spacingBorderRadius: "0.25rem",
      spacingMargin: "1rem",
      borderBottomColor: "##D1D5D7 !important",
      backgroundColor: "#fff",
      borderRadius: "2px",
      borderTop: "1px solid #D1D5D7",
      borderBottom: "1px solid #D1D5D7",
    },
    highlightOnHoverStyle: {
      backgroundColor: "#f7f7f7",
    },
  },
  cells: {
    style: {
      cellPadding: "48px",
      fontSize: "0.85rem",
      fontWeight: 400,
      height: "63px",
      color: "#636971",
    },
  },
  pagination: {
    style: {
      backgroundColor: "transparent",
      borderTopColor: "#f3f3f3",
    },
  },

  table: {
    style: {
      backgroundColor: "transparent",
      overflowY: "scroll",
    },
  },
  tableWrapper: {
    style: {
      display: "table",
      overflow: "auto",
    },
  },
};

const denseRowTheme: TableStyles = {
  headRow: {
    style: {
      minHeight: "24px",
      height: "32px",
      marginBottom: "0.5rem",
      overflow: "hidden",
    },
  },
  headCells: {
    style: {},
  },
  rows: {
    style: {
      minHeight: "42px",
      height: "42px",
    },
  },
  cells: {
    style: {
      fontSize: "0.85rem",
      fontWeight: 500,
      height: "42px",
      color: "#475467",
    },
  },
  pagination: {
    style: {
      backgroundColor: "transparent",
      borderTopColor: "#f3f3f3",
    },
  },
};

const SampleStyle = styled.div`
  background-color: rgb(248, 247, 252);
  border-radius: 0.25rem;
  padding: 1.5rem 2rem;
`;

// type ITableProps = IDataTableProps<any>;
type ITableProps<T> = Omit<IDataTableProps<T>, 'data'> & {
  paginationMode?: 'client' | 'server' | 'none';
  filters?: any;
  data: T[];
  totalCount?: number;
  loading?: boolean;
  onPageChange?: (page: number, pageSize: number) => void;
};

export default function Table<T>(props: ITableProps<T>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(props.paginationPerPage || 10);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    props.onPageChange?.(newPage, pageSize);
  };

  const handlePerRowsChange = async (newPerPage: number, newPage: number) => {
    setPageSize(newPerPage);
    setPage(newPage);
    props.onPageChange?.(newPage, newPerPage);
  };

  useEffect(() => {
    if (props.paginationMode === 'server') {
      props.onPageChange?.(page, pageSize);
    }
  }, [props.filters]);

  const ExpandableRow = ({ data }: any) => {
    const Component = props.expandableRowsComponent;
    return (
      props.expandableRowsComponent && (
        <SampleStyle>{<Component {...data} />}</SampleStyle>
      )
    );
  };

  const isPaginationEnabled = props.paginationMode !== 'none';

  return (
    <DataTable
      columns={props.columns || []}
      data={props.data}
      customStyles={!props.dense ? rowTheme : denseRowTheme}
      expandableRowsComponent={ExpandableRow as any}
      noHeader
      responsive
      persistTableHead
      highlightOnHover
      pagination={isPaginationEnabled}
      paginationServer={props.paginationMode === 'server'}
      paginationTotalRows={props.totalCount || 0}
      onChangePage={handlePageChange}
      onChangeRowsPerPage={handlePerRowsChange}
      paginationComponent={isPaginationEnabled ? CustomPagination : undefined}
      pointerOnHover={!props.dense}
      striped={props.dense}
      {...props}
      dense={false}
      progressPending={props.progressPending}
      progressComponent={<Loader />}
    />
  );
}

const Loader = () => (
  <div className="flex h-[200px] w-full items-center justify-center">
    <h1>Loading...</h1>
    {/* <img
      src={}
      alt="Loading"
      height={40}
      width={40}
      className="animate-pulse duration-100"
    /> */}
  </div>
);
