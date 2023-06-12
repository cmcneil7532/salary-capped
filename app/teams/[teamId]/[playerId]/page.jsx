"use client";
import React, { useState } from "react";
import Modal from "./Modal";

const Player = ({ roster, players }) => {
  const [showModal, setShowModal] = useState(false);
  const [playerSelected, setPlayerSelected] = useState({});
  return (
    <div>
      {roster.map((player) => {
        return (
          <div
            className=" flex justify-evenly bg-gradient-to-tl from-slate-200 to-white hover:-translate-y-1 cursor-pointer"
            key={player.id}
            onClick={() => {
              setShowModal(true);
              setPlayerSelected(player);
            }}
          >
            <h3 className="text-xl w-[20vw]">{player.name}</h3>
            <p className="w-[20vw]">{player.currentSalary}</p>
            <p>
              {player["Next years"] ? player["Next years"] : "Contract End"}
            </p>
            <p>{player.guranteed}</p>
          </div>
        );
      })}
      <Modal
        isVisible={showModal}
        setShowModal={setShowModal}
        setPlayerSelected={setPlayerSelected}
        playerSelected={playerSelected}
        players={players}
      />
    </div>
  );
};

export default Player;
