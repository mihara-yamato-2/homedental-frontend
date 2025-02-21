// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Q1 from './pages/Q1';
import Q2 from './pages/Q2';
import Q3 from './pages/Q3';
import Q4 from './pages/Q4';
import Q5 from './pages/Q5';
import Q6 from './pages/Q6';
import Finish from './pages/Finish';
import ProgressBar from './components/ProgressBar';

function App() {
  // ページ管理
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

  // (1) マウント時に URLパラメータ "page" を読んで、setPage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    if (pageParam) {
      const pageNum = parseInt(pageParam, 10);
      setPage(pageNum);
    }
  }, []);

  const goNext = () => setPage((p) => p + 1);
  const goBack = () => setPage((p) => (p > 0 ? p - 1 : 0));

  // 質問ページごとの回答をセット
  const handleSetAnswer = (key, value) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // LINE連携 + 回答送信処理
  const handleFinish = async () => {
    try {
      // 1) LIFF初期化
      await window.liff.init({ liffId: '2006939832-bweQAyAR' });

      // 2) ログイン判定
      if (!window.liff.isLoggedIn()) {
        // まだログインしていない → ログイン開始
        // (2-A) redirectUriに "?page=7" を付けておく
        const currentUrl = window.location.href;
        if (!currentUrl.includes('page=7')) {
          const sep = currentUrl.includes('?') ? '&' : '?';
          const redirectUrl = currentUrl + sep + 'page=7';
          // ログインにリダイレクト
          window.liff.login({ redirectUri: redirectUrl });
        } else {
          // 既に ?page=7 だがログインされてない → ループ防止
          alert('ログインが完了しませんでした。もう一度お試しください。');
        }
        return;
      }

      // 3) ログイン済みなら プロフィール取得
      const profile = await window.liff.getProfile();
      const userId = profile.userId;
      console.log('LINE userId:', userId);

      // 4) 回答をバックエンドへ送信
      const res = await fetch('https://homedental-backend-test.onrender.com/api/save-answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          answers,
        }),
      });

      if (res.ok) {
        alert('回答を送信しました。LINEで結果をご確認ください。');
      } else {
        alert('送信に失敗しました。');
      }
    } catch (err) {
      console.error(err);
      alert('エラーが発生しました: ' + err.message);
    }
  };

  // ページ切り替え
  let content;
  switch (page) {
    case 1:
      content = (
        <Q1
          value={answers.q1}
          onChange={(val) => handleSetAnswer('q1', val)}
          onNext={goNext}
          onBack={goBack}
        />
      );
      break;
    case 2:
      content = (
        <Q2
          value={answers.q2}
          onChange={(vals) => handleSetAnswer('q2', vals)}
          onNext={goNext}
          onBack={goBack}
        />
      );
      break;
    case 3:
      content = (
        <Q3
          value={answers.q3}
          onChange={(vals) => handleSetAnswer('q3', vals)}
          onNext={goNext}
          onBack={goBack}
        />
      );
      break;
    case 4:
      content = (
        <Q4
          value={answers.q4}
          onChange={(val) => handleSetAnswer('q4', val)}
          onNext={goNext}
          onBack={goBack}
        />
      );
      break;
    case 5:
      content = (
        <Q5
          value={answers.q5}
          onChange={(vals) => handleSetAnswer('q5', vals)}
          onNext={goNext}
          onBack={goBack}
        />
      );
      break;
    case 6:
      content = (
        <Q6
          value={answers.q6}
          onChange={(val) => handleSetAnswer('q6', val)}
          onNext={goNext}
          onBack={goBack}
        />
      );
      break;
    // 7ページ目をFinishページに
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
      {/* ページ>0ならプログレスバー表示 */}
      {page > 0 && <ProgressBar page={page} />}
      <div className="page-content">
        {content}
      </div>
    </div>
  );
}

export default App;
