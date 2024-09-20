import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  CustomRoutes,
  Title,
} from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import { ParkingList } from "./ParkingList";
import { Dashboard } from "./Dashboard";
import { ShowList } from "./ShowList";
import { Route } from "react-router-dom";
import ParkingGraph from "./ParkingGraph";
import 'leaflet/dist/leaflet.css';
import { ParkingMap } from "./ParkingMap";

export const App = () => (
  <Admin
    title="Parking Basel"
    disableTelemetry 
    layout={Layout} 
    dataProvider={dataProvider} 
    dashboard={ Dashboard }>
    
    <Resource name="parking" list={ParkingList} show={ShowList} />
    <CustomRoutes>
      <Route path="/graph" element={<ParkingGraph/> } />
      <Route path="/map" element={<ParkingMap />} />
    </CustomRoutes>
  </Admin>
);


// There is a total of 16 different parkhouses

// A single record comes back like this:
// {
//   "title":"Parkhaus Bad. Bahnhof",
//   "published":"2024-09-13T10:19:00+00:00",
//   "free":225,
//   "total":300,
//   "anteil_frei":0.75,
//   "auslastung":0.25,
//   "auslastung_prozent":25,
//   "link":"https://www.parkleitsystem-basel.ch/parkhaus/badbahnhof",
//   "geo_point_2d":{
//   "lon":7.6089067,
//   "lat":47.5651794
//   },
//   "description":"Anzahl freie Parkplätze: 225",
//   "name":"Bad. Bahnhof",
//   "id2":"badbahnhof"
//   },