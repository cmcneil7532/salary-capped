"use client";
import React from "react";
import * as nba from "nba-api-client";
import { stock } from "../../../../public/pictures";
const Modal = ({
  isVisible,
  setShowModal,
  setPlayerSelected,
  playerSelected,
  players,
}) => {
  if (!isVisible) return null;
  const findRelatedContracts = () => {
    const relatedContracts = players.map((player) => {
      return {
        name: player.name,
        salary: +player.currentSalary.replaceAll(",", "").substring(1),
      };
    });
    return relatedContracts;
  };
  const allContracts = findRelatedContracts();

  function compare(a, b) {
    let playerA = a.salary;
    let playerB = b.salary;
    let comparison = 0;

    if (playerA > playerB) {
      comparison = -1;
    } else if (playerA < playerB) {
      comparison = 1;
    }
    return comparison;
  }
  allContracts.sort(compare);

  const index = allContracts.findIndex(
    (player) => player.name === playerSelected.name
  );

  const getRelatedContracts =
    index === 0
      ? allContracts.slice(0, 4)
      : allContracts.slice(index - 2, index + 3);

  const filteredPlayers = getRelatedContracts.filter(
    (player) => player.name !== playerSelected.name
  );
  const handleClick = (e) => {
    if (e.target.id === "modal-container" || e.target.textContent === "Close") {
      setShowModal(false);
      setPlayerSelected({});
    }
  };
  const player = nba.getPlayerID(`${playerSelected.name}`);
  const headshot =
    player &&
    nba.getPlayerHeadshotURL({
      PlayerID: player.PlayerID,
      TeamID: player.TeamID,
    });
  console.log(headshot);

  return (
    <div
      className="inset-0 fixed bg-black bg-opacity-25 backdrop-blur-sm justify-center items-center flex flex-col"
      id="modal-container"
      onClick={handleClick}
    >
      <button
        onClick={handleClick}
        className="bg-rose-500 w-[600px] rounded-md hover:bg-rose-600 mb-2 h-7"
      >
        Close
      </button>
      <div className="w-[600px] h-[400px] bg-white rounded-md p-5 flex flex-row justify-around">
        <div>
          <img src={headshot} className="h-[100px]" />
          <h1>{playerSelected.name}</h1>
          <p>{playerSelected.currentSalary}</p>
        </div>
        <div>
          <h1>Related Player Contracts</h1>
          {filteredPlayers.map((player, index) => {
            return (
              <div key={index}>
                <p>{player.name}</p>
                <p>
                  {player.salary.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Modal;
