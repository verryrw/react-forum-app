import { useState } from "react";
import LeaderboardItem from "../components/LeaderboardItem";
import { useEffect } from "react";
import { getLeaderboards } from "../utils/network-api";

export default function Leaderboards() {
  const [leaderboards, setLeaderboards] = useState([]);

  useEffect(() => {
    async function fetchLeaderboards() {
      const response = await getLeaderboards();
      if (response.error) {
        alert(response.message);
      } else {
        setLeaderboards(response.data.leaderboards);
      }
    }

    fetchLeaderboards();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-8">Klasemen Pengguna Aktif</h1>
      <div className="leaderboards-table__header flex justify-between">
        <h2>Pengguna</h2>
        <h2>Skor</h2>
      </div>
      <div className="leaderboards-table__content">
        {leaderboards.map((leaderboard) => (
          <LeaderboardItem
            key={leaderboard.user.id}
            leaderboard={leaderboard}
          />
        ))}
      </div>
    </div>
  );
}
