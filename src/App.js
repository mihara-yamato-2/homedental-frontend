// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

// ページコンポーネント
import Q1 from './pages/Q1';
import Q2 from './pages/Q2';
import Q3 from './pages/Q3';
import Q4 from './pages/Q4';
import Q5 from './pages/Q5';
import Q6 from './pages/Q6';
import Finish from './pages/Finish';
import ProgressBar from './components/ProgressBar';

function App() {
  // ページ管理 (0〜7)
  const [page, setPage] = useState(0);

  // アンケート回答をまとめるstate
  const [answers, setAnswers] = useState({
    q1: '',
    q2: [],
    q3: [],
    q4: '',
    q5: [],
    q6: '',
  });

  // アンケート回答をセットする汎用関数
  const handleSetAnswer = (key, value) => {
    setAnswers(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // ページ進む/戻る
  const goNext = () => setPage(p => p + 1);
  const goBack = () => setPage(p => (p > 0 ? p - 1 : 0));

  // ======================================
  // ここからが「1回ボタン押すだけで送信」するためのポイント
  // ======================================

  // アンケート結果を送信する関数（fetch）を分離
  const sendAnswers = async () => {
    try {
      // 1) プロフィール情報を取得
      const profile = await window.liff.getProfile();
      const userId = profile.userId;
      console.log('LINE userId:', userId);

      // 2) バックエンドへPOST
      const res = await fetch('https://homedental-backend-test.onrender.com/api/save-answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, answers }),
      });

      if (res.ok) {
        alert('回答を送信しました。LINEで結果をご確認ください。');
      } else {
        alert('送信に失敗しました。');
      }
    } catch (err) {
      console.error('送信時エラー:', err);
      alert('送信時にエラーが発生しました: ' + err.message);
    }
  };

  // 「Finishページのボタン」を押したとき
  const handleFinish = async () => {
    try {
      // 1) LIFF初期化
      await window.liff.init({ liffId: '2006939832-bweQAyAR' });

      // 2) ログイン判定
      if (!window.liff.isLoggedIn()) {
        // まだログインしていない → ログイン開始
        // redirectUri: ログイン完了後に戻ってくるURL (クエリに logged_in=true を付けておく)
        const currentUrl = window.location.href;
        const hasParam = currentUrl.includes('logged_in=true');

        if (!hasParam) {
          // logged_in パラメータがついていない場合だけ付与
          // もし同一ページ内でクエリがあるなら ? → & に切り替え
          let separator = '?';
          if (currentUrl.includes('?')) separator = '&';
          const redirectUrl = currentUrl + separator + 'logged_in=true';

          // ログイン
          window.liff.login({ redirectUri: redirectUrl });
        } else {
          // すでに ?logged_in=true があるのにログインされていない => ループを防ぐためアラート
          alert('ログインが完了しませんでした。もう一度お試しください。');
        }
        return; // ここで終了
      }

      // すでにログイン済みの場合 → アンケート送信
      await sendAnswers();

    } catch (err) {
      console.error('handleFinishエラー:', err);
      alert('ログインまたは送信時にエラーが発生しました: ' + err.message);
    }
  };

  // (C) アプリ起動時やリロード時に ?logged_in=true があれば自動で handleFinish() を呼ぶ
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isLoggedInParam = urlParams.get('logged_in');
    if (isLoggedInParam === 'true') {
      // ログイン後のリダイレクトで戻ってきた → ログイン済みのはず
      handleFinish();
    }
  }, []);

  // ======================================
  // ページ表示の切り替え (Q1〜Q6, Finish等)
  // ======================================
  let content;
  switch (page) {
    case 1:
      content = (
        <Q1
          value={answers.q1}
          onChange={val => handleSetAnswer('q1', val)}
          onNext={goNext}
          onBack={goBack}
        />
      );
      break;
    case 2:
      content = (
        <Q2
          value={answers.q2}
          onChange={vals => handleSetAnswer('q2', vals)}
          onNext={goNext}
          onBack={goBack}
        />
      );
      break;
    case 3:
      content = (
        <Q3
          value={answers.q3}
          onChange={vals => handleSetAnswer('q3', vals)}
          onNext={goNext}
          onBack={goBack}
        />
      );
      break;
    case 4:
      content = (
        <Q4
          value={answers.q4}
          onChange={val => handleSetAnswer('q4', val)}
          onNext={goNext}
          onBack={goBack}
        />
      );
      break;
    case 5:
      content = (
        <Q5
          value={answers.q5}
          onChange={vals => handleSetAnswer('q5', vals)}
          onNext={goNext}
          onBack={goBack}
        />
      );
      break;
    case 6:
      content = (
        <Q6
          value={answers.q6}
          onChange={val => handleSetAnswer('q6', val)}
          onNext={goNext}
          onBack={goBack}
        />
      );
      break;
    case 7:
      content = (
        <Finish
          answers={answers}
          onBack={goBack}
          onFinish={handleFinish}
        />
      );
      break;
    default:
      content = (
        <div style={{ padding: 20 }}>
          <h1>Start Page</h1>
          <button onClick={() => setPage(1)}>アンケート開始</button>
        </div>
      );
      break;
  }

  return (
    <div className="app-container">
      {page > 0 && <ProgressBar page={page} />}
      <div className="page-content">
        {content}
      </div>
    </div>
  );
}

export default App;
