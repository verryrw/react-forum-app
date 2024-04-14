import LeaderboardItem from "../components/LeaderboardItem";

export default function Leaderboards() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-8">Klasemen Pengguna Aktif</h1>
      <div className="leaderboards-table__header flex justify-between">
        <h2>Pengguna</h2>
        <h2>Skor</h2>
      </div>
      <div className="leaderboards-table__content">
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
      </div>
    </div>
  );
}
