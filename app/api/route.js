import { NextResponse } from "next/server";
import getPlayerStats from "@/app/api/getPlayerStats";

export async function GET(request) {
  const player = request.url.split("?player=")[1];
  let formattedPlayerName = ''
  if(player === 'Karl-Anthony-Towns') {
    formattedPlayerName = 'Karl-Anthony Towns';
  }
  else {
    formattedPlayerName = player.replace("-", " ");
  // api?player=lebron-james
  // get the player param from the URL
  }
  const data = await getPlayerStats({ name: formattedPlayerName });
  return NextResponse.json(data);
}
