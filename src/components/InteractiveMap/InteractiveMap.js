import { nanoid } from "nanoid";
import minimap from "../../images/minimap.webp";
import "./InteractiveMap.css";

const towers = [
  "ab",
  "at",
  "b3",
  "b2",
  "b1",
  "m3",
  "m2",
  "m1",
  "t3",
  "t2",
  "t1",
];

const barracks = ["br", "bm", "mr", "mm", "tr", "tm"];

function InteractiveMap({ matchData }) {
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

  const {
    tower_status_radiant,
    barracks_status_radiant,
    tower_status_dire,
    barracks_status_dire,
    radiant_win,
  } = matchData.result;

  const towersRadiant = decimalToBinaryArray(
    tower_status_radiant,
    towers.length
  );

  const barracksRadiant = decimalToBinaryArray(
    barracks_status_radiant,
    barracks.length
  );

  const towersDire = decimalToBinaryArray(tower_status_dire, towers.length);

  const barracksDire = decimalToBinaryArray(
    barracks_status_dire,
    barracks.length
  );

  return (
    <div className="minimap">
      <img className="minimap_img" src={minimap} alt="minimap" />

      {towers.map((tower, index) => {
        return (
          <div
            className={`tower radiant ${tower} ${
              towersRadiant[index] === 0 ? "destroyed" : ""
            }`}
            key={nanoid()}></div>
        );
      })}

      {barracks.map((barrack, index) => {
        return (
          <div
            className={`barrack radiant ${barrack} ${
              barracksRadiant[index] === 0 ? "destroyed" : ""
            }`}
            key={nanoid()}></div>
        );
      })}

      {towers.map((tower, index) => {
        return (
          <div
            className={`tower dire ${tower} ${
              towersDire[index] === 0 ? "destroyed" : ""
            }`}
            key={nanoid()}></div>
        );
      })}

      {barracks.map((barrack, index) => {
        return (
          <div
            className={`barrack dire ${barrack} ${
              barracksDire[index] === 0 ? "destroyed" : ""
            }`}
            key={nanoid()}></div>
        );
      })}
      <div className={`thron radiant ${!radiant_win ? "destroyed" : ""}`}></div>
      <div className={`thron dire ${radiant_win ? "destroyed" : ""}`}></div>
    </div>
  );
}

export default InteractiveMap;
