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

export default function Page() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [score, setScore] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);

  // 保存関数
  async function saveMatch() {
    if (!player1 || !player2 || !score) {
      alert("プレイヤー名とスコアは必須です");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("matches")
        .insert([{ player1, player2, score, created_at: new Date().toISOString() }]);

      if (error) {
        // エラー内容を必ず表示
        alert("保存失敗: " + error.message);
        console.error(error);
      } else {
        alert("保存成功！");
        fetchMatches(); // 保存後に最新データ取得
        setPlayer1("");
        setPlayer2("");
        setScore("");
      }
    } catch (err) {
      alert("予期せぬエラー: " + err);
      console.error(err);
    }
  }

  // 対戦履歴取得
  async function fetchMatches() {
    try {
      const { data, error } = await supabase
        .from("matches")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        alert("履歴取得失敗: " + error.message);
        console.error(error);
      } else if (data) {
        setMatches(data);
      }
    } catch (err) {
      alert("予期せぬエラー: " + err);
      console.error(err);
    }
  }

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>対戦結果入力</h1>

      <input
        placeholder="プレイヤー1"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
        style={{ marginRight: 5 }}
      />
      <input
        placeholder="プレイヤー2"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
        style={{ marginRight: 5 }}
      />
      <input
        placeholder="スコア（例：11-8）"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        style={{ marginRight: 5 }}
      />

      <button onClick={saveMatch}>保存</button>

      <h2>対戦履歴</h2>
      <ul>
        {matches.map((m) => (
          <li key={m.id}>
            {m.player1} vs {m.player2} → {m.score}
          </li>
        ))}
      </ul>
    </div>
  );
}