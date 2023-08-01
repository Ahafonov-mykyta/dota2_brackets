import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tournament from "./components/Tournament/Tournament";
import baliMajor from "./baliMajor.json";
import berlinMajor from "./berlinMajor.json";
import eplSeason10 from "./eplSeason10.json";
import Menu from "./components/Menu/Menu";
import { nanoid } from "nanoid";
import FindMatch from "./components/FindMatch/FindMatch";

const AppRoutes = [
  {
    title: "Bali Major",
    bracket: baliMajor,
    path: "/",
  },
  { title: "Berlin Major", bracket: berlinMajor, path: "/berlin_major" },
  { title: "Epl Season10", bracket: eplSeason10, path: "/epl_season10" },
];

function App() {
  return (
    <Router>
      <Menu links={AppRoutes} />
      <Routes>
        {AppRoutes.map((route) => {
          return (
            <Route
              key={nanoid()}
              path={route.path}
              element={<Tournament brackets={route.bracket} />}
            />
          );
        })}
        <Route path="/find_match" element={<FindMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
