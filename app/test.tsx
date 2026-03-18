"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Match = {
  id?: string;
  player1: string;
  player2: string;
  score: string;
  created_at?: string;
};

export default function TestPage() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [score, setScore] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);

  async function saveMatch() {
    if (!player1 || !player2 || !score) return;

    const { data, error } = await supabase
      .from("matches")
      .insert([{ player1, player2, score }]);

    if (error) {
      console.error("保存失敗", error);
      alert("保存失敗！コンソールを確認");
    } else {
      alert("保存成功！");
      fetchMatches();
      setPlayer1("");
      setPlayer2("");
      setScore("");
    }
  }

  async function fetchMatches() {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setMatches(data);
    }
  }

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>テスト保存フォーム</h1>
      <input placeholder="Player 1" value={player1} onChange={e => setPlayer1(e.target.value)} />
      <input placeholder="Player 2" value={player2} onChange={e => setPlayer2(e.target.value)} />
      <input placeholder="Score" value={score} onChange={e => setScore(e.target.value)} />
      <button onClick={saveMatch}>保存</button>

      <h2>対戦履歴</h2>
      <ul>
        {matches.map(m => (
          <li key={m.id}>{m.player1} vs {m.player2} → {m.score}</li>
        ))}
      </ul>
    </div>
  );
}