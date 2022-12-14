import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { makeStyles } from "@material-ui/styles";
import DummyImg from "../assets/images/dummy.svg"

const columns: GridColDef[] = [
    { field: 'patientid', headerName: 'patientid', width: 90 },
    {
      field: 'PatientName',
      headerName: 'Patient Name',
      width: 150,
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      editable: true,
    },
    {
      field: 'DOB',
      headerName: 'DOB',
      width: 150,
      editable: true,
    },
    // {
    //   field: 'Chart',
    //   headerName: 'Chart#',
    //   width: 110,
    //   editable: true,
    // },
    {
      field: 'Provider',
      headerName: 'Provider',
      editable: true,
  
    },
    {
      field: 'date',
      headerName: 'Appointment Date',
      width: 110,
      editable: true,
    },
    {
      field: 'StartTime',
      headerName: 'Start Time',
      width: 110,
      editable: true,
    },

    {
      field: 'ApptType',
      headerName: 'Appt. Type',
      width: 110,
      editable: true,
    },
    {
      field: 'lastmodified',
      headerName: 'Booked Date',
      width: 110,
      editable: true,
    },
    // {
    //   field: 'Appt.',
    //   headerName: 'Appt',
    //   width: 110,
    //   editable: true,
    // },
    // {
    //   field: 'Pre',
    //   headerName: 'Pre',
    //   width: 110,
    //   editable: true,
    // },
    // {
    //   field: 'Insurance',
    //   headerName: 'Insurance',
    //   width: 110,
    //   editable: true,
    // },
    // {
    //   field: 'EB',
    //   headerName: 'E&B',
    //   width: 110,
    //   editable: true,
    // },
    // {
    //   field: 'D',
    //   headerName: 'D',
    //   width: 110,
    //   editable: true,
    // },
    {
      field: 'Copay',
      headerName: 'Copay',
      width: 110,
      editable: true,
    },
    {
      field: 'Paid',
      headerName: 'Paid',
      width: 110,
      editable: true,
    },
    // {
    //   field: 'Balance',
    //   headerName: 'Balance',
    //   width: 110,
    //   editable: true,
    // },
  
  ];
  function CustomNoRowsOverlay() {
    return (
      <div style={{ display: "flex", alignItems: "center", height: "100%", width: "50%", paddingLeft: "10px", flexDirection: "row" }}>
        <img height={200} width={200} src={DummyImg} />
        <p style={{ fontWeight: "bold", fontStyle: "italic" }}> There are currently no checked-in patients for todays. </p>
      </div>
    );
  }  

 export default function Processed(props) {
    const useStyles = makeStyles((theme) => ({
      root: {
        "& .MuiDataGrid-columnHeaderCheckbox": {
          display: "block",
          pointerEvents: "none",
          disabled: "disabled",
          alignItems: "center",
          justifyContent: "center"
        },
        "& .MuiDataGrid-columnHeaderWrapper": {
          backgroundColor: "#0c71c3",
          color: "white",
          lineHeight: "unset !important",
          maxHeight: "none !important",
          whiteSpace: "normal",
          minWidth: "normal",
          textAlign: "center",
          justifyContent: "center"
        },
        "& .MuiDataGrid-cell": {
          border: "1px solid #dfdddd",
          lineHeight: "unset !important",
          maxHeight: "none !important",
          whiteSpace: "normal",
          textAlign: "center",
          paddingTop: "1em",
          paddingBottom: "1em",
          justifyContent: "center"
        },
        "& .MuiDataGrid-row.Mui-odd": {
          backgroundColor: "#e9e9e9",
          justifyContent: "center"
        },
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: "#0c71c3",
          color: "#fafafa",
          justifyContent: "center"
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          overflow: "visible",
          lineHeight: "1.43rem",
          whiteSpace: "normal",
          textAlign: "center",
          justifyContent: "center"
        },
  
        "& .MuiDataGrid-root": {
          overflow: "visible",
          lineHeight: "1.43rem",
          whiteSpace: "normal",
          textAlign: "center",
          justifyContent: "center"
  
        },
  
        "& .MuiDataGrid-columnHeaderTitleContainer": {
          justifyContent: "center"
        }
  
      },
    }));
  
    const classes = useStyles();
    let row = props?.data
    return (
      <>
        <Box className={classes.root} sx={{ height: 400, width: '100%' }}>
          <DataGrid
            className={useStyles().root}
            rows={row}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.patientid}
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
  
          />
        </Box>
      </>);
  }