import { NextResponse } from "next/server";
import getPlayerStats from "@/app/api/getPlayerStats";

export async function GET(request) {
  const player = request.url.split("?player=")[1];
  console.log(player);
  const formattedPlayerName = player.replace("-", " ");
  // /api?player=lebron-james
  // get the player param from the URL
  console.log(player);
  const data = await getPlayerStats({ name: formattedPlayerName });
  return NextResponse.json(data);
}