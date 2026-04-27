export async function fetchPlayerCount(ip: string): Promise<number | null> {
  const response = await fetch(`https://api.mcstatus.io/v2/status/java/${ip}`);
  if (!response.ok) return null;
  const data = await response.json() as { players: { online: number } };
  return data.players.online;
}
