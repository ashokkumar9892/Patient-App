import React, { useState, useContext, useEffect } from "react";
import { CoreContext } from "../context/core-context";
// import { DataGrid } from "@material-ui/data-grid";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import Loader from "react-loader-spinner";
import DataGridComponent from "./common/DataGridComponent";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
const Moment = require("moment");


const BloodGlucose = (props) => {
  const coreContext = useContext(CoreContext);

  useEffect(coreContext.checkLocalAuth, []);

  const [patientId, setPatientId] = useState("");
  const [userType, setUserType] = useState("");

  const fetchBloodGlucose = () => {
    // const patientId =  localStorage.getItem("userId");
    let userType = localStorage.getItem("userType");
    let patientId = localStorage.getItem("userId");
    // check page if left side menu.
    if (window.location.href.substring("bloodglucose") > 0) {
    }
    if (window.location.href.indexOf("patient-summary") > 0) {
      patientId = localStorage.getItem("ehrId");
      userType = "patient";
      // clear this otherwise will be problem
      localStorage.removeItem("ehrId");
    }
    setUserType(userType);
    coreContext.fetchBloodGlucose(patientId, userType);
  };

  useEffect(fetchBloodGlucose, [coreContext.bloodglucoseData.length]);

  const columns = [
    {
      field: "UserName",
      headerName: "Patient Name",
      
      type: "string",
      flex:1,
      renderCell: (params) => (
        <div style={{marginLeft:"1em",paddingBottom:"1em"}}>
        <Link to={`/patient-summary/${btoa(params.row.userId)}`}>
          {" "}
          {params.row.UserName}{" "}
        </Link>
        </div>
      ),
    },
    {
      field: "MeasurementDateTime",
      headerName: "Date Recorded",
      editable: false,
      
      flex:1,
      type: "dateTime",

      valueFormatter: (params) => {
        const valueFormatted = Moment(params.value).format(
          "MM-DD-YYYY hh:mm A"
        );
        return `${valueFormatted}`;
      },
    },
    // {
    //   field: "bloodglucosemmol",
    //   headerName: "Blood Glucose (mmol)",
    //   type: "number",
    //   editable: false,
    //   
    // },
    {
      field: "bloodglucosemgdl",
      headerName: "Blood Glucose (mgdl)",
      type: "number",
      editable: false,
      
      flex:1
    },
    {
      field: "meal",
      headerName: "Before/After Meal",
      
      editable: false,
      
      flex:1
    },

    {
      field: "CreatedDate",
      headerName: "Date Received",
      
      editable: false,
      type: "dateTime",
      flex:1,

      valueFormatter: (params) => {
        const valueFormatted = Moment(params.value).format(
          "MM-DD-YYYY hh:mm A"
        );
        return `${valueFormatted}`;
      },
    },
    {
      field: "DeviceId",
      headerName: "Device Id",
      
      flex:1,
      editable: false,
    },
    // {
    //   field: "battery",
    //   headerName: "Battery",
    //   type: "number",
    //   
    //   editable: false,
    // },
    // {
    //   field: "sortDateColumn",
    //   headerName: "Action",
    //   width: 300,

    //   renderCell: (params) => (
    //     <div>
    //       {" "}
    //       <Link to="#" onClick={() => showEditForm(params.row)}>
    //         {" "}
    //         <PencilSquare />
    //       </Link>
    //       <Link to="#" onClick={() => deletePatient(params.row)}>
    //         {" "}
    //         <Trash />
    //       </Link>
    //     </div>
    //   ),
    // },
    
  ];
  const showEditForm = (patient) => {};
  const deletePatient = (patient) => {};

  const patientcolumns = [
    {
      field: "MeasurementDateTime",
      headerName: "Date Recorded",
      editable: false,
      
      flex:1,
      type: "dateTime",

      valueFormatter: (params) => {
        const valueFormatted = Moment(params.value).format(
          "MM-DD-YYYY hh:mm A"
        );
        return `${valueFormatted}`;
      },
    },
    // {
    //   field: 'bloodglucosemmol',
    //   headerName: 'Blood Glucose (mmol)',
    //   type: 'number',
    //   editable: false,
    //   width: 200
    // },
    {
      field: "bloodglucosemgdl",
      headerName: "Blood Glucose (mgdl)",
      type: "number",
      editable: false,
      
      flex:1,
    },
    {
      field: "meal",
      headerName: "Before/After Meal",
      
      editable: false,
      
      flex:1,
    },

    // {
    //   field: 'CreatedDate',
    //   headerName: 'Date Received',
    //   
    //   editable: false,type:'dateTime',

    //   valueFormatter: (params) => {
    //       const valueFormatted = Moment(params.value).format('MM-DD-YYYY hh:mm A')
    //        return `${valueFormatted}`;
    //      },

    // },
    {
      field: "DeviceId",
      headerName: "Device Id",
      
      editable: false,
      flex:1,
    },
    // {
    //   field: 'reading_id',
    //   headerName: 'Reading Id',
    //   type: 'number',
    //   
    //   editable: false,
    // },
    {
      field: "battery",
      headerName: "Battery",
      type: "number",
      
      flex:1,
      editable: false,
    },
    {
      field: "sortDateColumn",
      headerName: "Action",
      flex:1,
    },
  ];

  const renderBloodGlucose = () => {
    if (coreContext.bloodglucoseData.length == 0) {
      return (
        <div
          style={{
            height: 680,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
          }}>
          <Loader type="Circles" color="#00BFFF" height={100} width={100} />
        </div>
      );
    }
    let dgcolumns = columns;
    if (userType === "patient") {
      dgcolumns = patientcolumns;
    }
    if (
      coreContext.bloodglucoseData.length > 0 &&
      coreContext.bloodglucoseData[0].UserName !== undefined
    ) {
      const id=coreContext.patients.map((curr)=>curr.userId)
      const rows=coreContext.bloodglucoseData.filter((curr)=>id.includes(curr.userId))
      console.log(rows,"bith data")
      return (
        // <div style={{ height: 680, width: "100%" }}>
        //   {/* {coreContext.bloodglucoseData} */}
        //   <DataGrid
          
        //     rows={coreContext.bloodglucoseData}
        //     columns={dgcolumns}
        //     pageSize={10}
        //     sortingOrder={["desc", "asc"]}
        //     sortModel={[{ field: "MeasurementDateTime", sort: "desc" }]}
        //   />
        // </div>
        <DataGridComponent rows={rows} columns={dgcolumns} sortModal={[{ field: "MeasurementDateTime", sort: "desc" }]}/>
      );
    } else {
      return (
        <div
          style={{
            height: 60,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
          }}>
          <h1>No data Found</h1>
        </div>
      );
    }
  };

  return (
    <div className="col">
    <div className="page-title-container mb-3">
    <div className="row">
    <div className="col mb-2">
    <h1 className="mb-2 pb-0 display-4" id="title">Blood Glucose Information
    </h1>
    </div>
    </div>
    </div>
    
    <div className="row">
    <div className="col-xl-12">
   
    <div className="card mb-3">	
    
    <div className="card-body">
    <div className="row">
    <div className="col-xl-12">
    <div className="table-responsive-sm mb-0">
      {renderBloodGlucose()}
    
    </div>
      
    
      
    </div>
      
    
    
    
    </div>
    
    </div>
      </div>
    </div>
    </div>
      </div>
  );
};

export { BloodGlucose };
