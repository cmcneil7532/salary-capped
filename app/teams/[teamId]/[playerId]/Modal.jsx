"use client";
import React from "react";
import pictures from "../../../../public/pictures";
import { motion } from "framer-motion";
const Modal = ({
  isVisible,
  setShowModal,
  setPlayerSelected,
  playerSelected,
  players,
  playerDetails,
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

  return (
    <div
      className="inset-0 fixed bg-black bg-opacity-25 backdrop-blur-sm justify-center items-center flex flex-col"
      id="modal-container"
      onClick={handleClick}
      animate={{ x: 100 }}
      transition={{ delay: 1 }}
    >
      <button
        onClick={handleClick}
        className="bg-rose-500 w-[600px] max-sm:w-[375px] rounded-md hover:bg-rose-600 mb-2 h-7"
      >
        Close
      </button>

      <motion.div
        className="w-[600px] h-[400px] bg-gradient-to-br from-white to-slate-200 rounded-md p-5 flex flex-row justify-around max-sm:w-[375px] max-sm:h-[425px]
      "
        animate={{ scale: [0, 1] }}
        transition={{ times: [1] }}
      >
        <div className="max-sm:w-1/2 text-sm">
          <img
            className="h-[200px] rounded-md"
            src={playerDetails.image ? playerDetails.image : pictures.stock.src}
            alt={`${playerSelected.name} image`}
          />
          <h1 className="text-lg font-bold">{playerSelected.name}</h1>
          <p className="font-medium">
            Year Salary: {playerSelected.currentSalary}
          </p>
          <p className="font-medium mb-5">
            On Contract: {playerSelected.guranteed}
          </p>
          <div className="flex flex-row text-sm">
            {playerDetails.table?.map((column, idx) => {
              return (
                <div key={idx} className="flex-col mr-2">
                  <p className="font-semibold">{column.colHead}</p>
                  <p>{column.currentYearStat}</p>
                  <p>{column.careerStat}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h1 className="text-base font-semibold border-b-2">
            Similarly Paid Players
          </h1>
          {filteredPlayers.map((player, index) => {
            return (
              <div className="flex flex-col font-medium text-sm" key={index}>
                <p>- {player.name}</p>
                <p className="border-b-2">
                  {player.salary.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
