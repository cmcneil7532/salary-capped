import { NextResponse } from "next/server";
import getPlayerStats from "@/app/api/getPlayerStats";

export async function GET(request) {
  const player = request.url.split("?player=")[1];
  const formattedPlayerName = player.replace("-", " ");
  // /api?player=lebron-james
  // get the player param from the URL
  const data = await getPlayerStats({ name: formattedPlayerName });
  return NextResponse.json(data);
}
