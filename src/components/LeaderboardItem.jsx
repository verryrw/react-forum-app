export default function LeaderboardItem() {
  return (
    <div className="flex justify-between mt-4 items-center">
      <div className="flex gap-4 items-center">
        <img
          src="https://ui-avatars.com/api/?name=Dimas Saputra&background=random"
          alt=""
          width="50"
          height="50"
          className="object-cover rounded-full"
        />
        <h2>Dimas Saputra</h2>
      </div>
      <h1>25</h1>
    </div>
  );
}
