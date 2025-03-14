import styled from "styled-components";
import DataTable, {
  IDataTableProps,
  TableStyles,
} from "react-data-table-component";
import { LuLoader } from "react-icons/lu";

const rowTheme: TableStyles = {
  headRow: {
    style: {
      minHeight: "45px",
      height: "45px",
      backgroundColor: "#f7f7f7",
      borderRadius: "0px",
      border: "1px solid #EDECF2",
      marginBottom: "1px",
      overflow: "hidden",
    },
  },
  headCells: {
    style: {
      borderColor: "transparent",
      backgroundColor: "#ffffff",
      color: "#255c57",
      fontSize: "0.8rem",
      fontWeight: 600,
    },
  },
  rows: {
    style: {
      spacing: "spaced",
      spacingBorderRadius: "0.25rem",
      spacingMargin: "1rem",
      borderBottomColor: "#f3f3f3 !important",
      backgroundColor: "#feffff",
      borderRadius: "5px",
      border: "1px solid #EDECF2",
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
      color: "#475467",
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
      borderRadius: "10px",
      border: "1px solid #EDECF2",
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

type ITableProps = IDataTableProps<any>;

export default function Table(props: Partial<ITableProps>) {
  const ExpandableRow = ({ data }: any) => {
    const Component = props.expandableRowsComponent;
    return (
      props.expandableRowsComponent && (
        <SampleStyle>{<Component {...data} />}</SampleStyle>
      )
    );
  };

  return (
    <DataTable
      columns={props.columns || []}
      data={props.data || []}
      customStyles={!props.dense ? rowTheme : denseRowTheme}
      expandableRowsComponent={ExpandableRow as any}
      noHeader
      responsive
      persistTableHead
      highlightOnHover
      pagination
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
    <LuLoader />
  </div>
);
