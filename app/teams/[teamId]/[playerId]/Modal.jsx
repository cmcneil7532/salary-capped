"use client";
import React from "react";

const Modal = ({
  isVisible,
  setShowModal,
  setPlayerSelected,
  playerSelected,
  players,
  playerDetails,
}) => {
  if (!isVisible) return null;
  console.log(playerDetails);
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
  
  const getRelatedContracts = index === 0 ? allContracts.slice(0, 4) : allContracts.slice(index - 2, index + 3);

  const filteredPlayers = getRelatedContracts.filter(
    (player) => player.name !== playerSelected.name
  );
  
  return (
    <div className="inset-0 fixed bg-black bg-opacity-25 backdrop-blur-sm justify-center items-center flex flex-col">
      <button
        onClick={() => {
          setShowModal(false);
          setPlayerSelected({});
        }}
      >
        X
      </button>
      <div className="w-[600px] h-[400px] bg-white">
        <div>
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
