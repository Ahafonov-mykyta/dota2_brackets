import { nanoid } from "nanoid";
import minimap from "../../images/minimap.webp";
import "./InteractiveMap.css";

const teams = ["radiant", "dire"];
const buildings = {
  tower: ["ab", "at", "b3", "b2", "b1", "m3", "m2", "m1", "t3", "t2", "t1"],
  barrack: ["br", "bm", "mr", "mm", "tr", "tm"],
  throne: ["throne"],
};
const buildingsKeys = Object.keys(buildings);

function InteractiveMap({ matchData }) {
  const {
    tower_status_radiant,
    barracks_status_radiant,
    tower_status_dire,
    barracks_status_dire,
    radiant_win,
  } = matchData.result;
  const { tower, barrack } = buildings;

  function decimalToBinaryArray(decimalNumber, length) {
    if (decimalNumber === 0) {
      return Array(length).fill(0);
    }
    const binaryArray = [];
    while (decimalNumber > 0) {
      binaryArray.unshift(decimalNumber % 2);
      decimalNumber = Math.floor(decimalNumber / 2);
    }
    while (binaryArray.length < length) {
      binaryArray.unshift(0);
    }
    return binaryArray;
  }

  return (
    <div className="minimap">
      <img className="minimap_img" src={minimap} alt="minimap" />

      {teams.map((team) => {
        return buildingsKeys.map((building) => {
          return buildings[building].map((buildingType, j) => {
            if (building === "throne") {
              const winner = radiant_win ? teams[0] : teams[1];
              return (
                <div
                  className={`${building} ${team} ${
                    team !== winner ? "destroyed" : ""
                  }`}
                  key={nanoid()}></div>
              );
            }
            let coordinates;
            if (building === "tower" && team === "radiant") {
              coordinates = decimalToBinaryArray(
                tower_status_radiant,
                tower.length
              );
            } else if (building === "barrack" && team === "radiant") {
              coordinates = decimalToBinaryArray(
                barracks_status_radiant,
                barrack.length
              );
            } else if (building === "tower" && team === "dire") {
              coordinates = decimalToBinaryArray(
                tower_status_dire,
                tower.length
              );
            } else if (building === "barrack" && team === "dire") {
              coordinates = decimalToBinaryArray(
                barracks_status_dire,
                barrack.length
              );
            }
            return (
              <div
                className={`${building} ${team} ${buildingType} ${
                  coordinates[j] === 0 ? "destroyed" : ""
                }`}
                key={nanoid()}></div>
            );
          });
        });
      })}
    </div>
  );
}

export default InteractiveMap;
