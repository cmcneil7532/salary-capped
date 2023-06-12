"use client";
import React from "react";

const Modal = ({
  isVisible,
  setShowModal,
  setPlayerSelected,
  playerSelected,
  players,
}) => {
  if (!isVisible) return null;
  const playerSelectedContract = +playerSelected.currentSalary
    .replaceAll(",", "")
    .substring(1);
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
  let top5 = [];
  for (let i = 0; i < allContracts.length; i++) {
    if (
      allContracts[i].salary < playerSelected - 2000000 &&
      allContracts[i].salary > playerSelected + 2000000
    ) {
      top5.push(allContracts[i]);
    }
  }
  console.log(top5); //Grant

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
        <h1>{playerSelected.name}</h1>
        <p>{playerSelected.currentSalary}</p>
      </div>
    </div>
  );
};

export default Modal;
