import React, { useContext, useEffect, useState } from "react";
import ReactMapGl, { NavigationControl, Marker } from "react-map-gl";
import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

import PinIcon from "./PinIcon";
import Context from "../context";

const INITIAL_VIEWPORT = {
  latitude: 35.7577,
  longtitude: -122.4637,
  zoom: 13,
};
const Map = ({ classes }) => {
  const {state, dispatch} = useContext(Context);
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    getUserPosition();
  }, []);

  const getUserPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longtitude } = position.coords;
        setViewport({ ...viewport, latitude, longtitude });
        setUserPosition({ latitudem, longtitude });
      });
    }
  };
  const handleMapClick = ({lngLat, leftButton}) =>{
    if(!leftButton) return;
    if(!state.draft){
      dispatch({type: "CREATE_DRAFT"});
    }
    const [longitutde, latitude] = lngLat;
    dispatch({type: "UPDATE_DRAFT_LOCATION", payload: {longitutde, latitude})
  }
  return (
    <div className={classes.root}>
      <ReactMapGl
        width="100vw"
        height="calc(100vh - 64px)"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1IjoieXVhbnN1bmV3cyIsImEiOiJja2xhN3J
        pODMwZXF4Mm90a3lwY21iczdjIn0.ZgU2R8NLCTwt8LcOdROfsA"
        onViewportChange={(newViewport) => setViewport(newViewport)}
        {...viewport}
        onClick={}
      >
        <div className="classes.navigationControl">
          <NavigationControl
            onViewportChange={(newViewport) => setViewport(newViewport)}
          />
        </div>
        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longtitude={userPosition.longtitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="red" />
          </Marker>
        )}

        {state.draft && <Marker
            latitude={state.draft.latitude}
            longtitude={state.draft.longtitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="blue" />
          </Marker>}
      </ReactMapGl>
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse",
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em",
  },
  deleteIcon: {
    color: "red",
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover",
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
};

export default withStyles(styles)(Map);
