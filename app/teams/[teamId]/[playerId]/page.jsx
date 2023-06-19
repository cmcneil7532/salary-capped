"use client";
import React, { useState } from "react";
import Modal from "./Modal";

const Player = ({ roster, players }) => {
  const [showModal, setShowModal] = useState(false);
  const [playerSelected, setPlayerSelected] = useState({});
  const [playerDetails, setPlayerDetails] = useState({});
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
              // make API call to /api/
              const slug = player.name.replace(" ", "-");
              const res = await fetch(`/api/?player=${slug}`);
              //formatted res in setPlayerDetails
              const statData = await res.json();
              setPlayerDetails(statData);
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
