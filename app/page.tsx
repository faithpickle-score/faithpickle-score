"use client";
import { useState } from "react";

type Match = {
  player1: string;
  player2: string;
  score: string;
  date: string;
};

export default function Home() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [score, setScore] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);

  const addMatch = () => {
    if (!player1 || !player2 || !score) return;

    const newMatch: Match = {
      player1,
      player2,
      score,
      date: new Date().toLocaleDateString(),
    };

    setMatches([newMatch, ...matches]);
    setPlayer1("");
    setPlayer2("");
    setScore("");
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm">

        <h1 className="text-2xl font-bold text-center mb-6">
          ピックルボール対戦履歴
        </h1>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="プレイヤー1"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="プレイヤー2"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="スコア 例:11-8"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />

        <button
          className="w-full bg-pink-500 text-white p-2 rounded mb-6"
          onClick={addMatch}
        >
          試合を保存
        </button>

        <h2 className="font-bold mb-2">試合履歴</h2>

        {matches.map((m, i) => (
          <div key={i} className="border-b py-2">
            {m.date} {m.player1} vs {m.player2} {m.score}
          </div>
        ))}

      </div>
    </main>
  );
}