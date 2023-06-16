"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import getPlayerStats from "@/app/api/getPlayerStats";

const Player = ({ roster, players }) => {
  const [showModal, setShowModal] = useState(false);
  const [playerSelected, setPlayerSelected] = useState({});
  const [playerDetails, setPlayerDetails] = useState({})

  return (
    <div>
      {roster.map((player, index) => {
        return (
          <div
            className=" flex justify-evenly bg-gradient-to-tl from-slate-200 to-white hover:-translate-y-1 cursor-pointer"
            key={index}
            onClick={async () => {
              setShowModal(true);
              setPlayerSelected(player);
              setPlayerDetails(await getPlayerStats(player));
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
        playerDetails={playerDetails}
      />
    </div>
  );
};

export default Player;
