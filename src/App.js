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

  // アンケート回答
  const [answers, setAnswers] = useState({
    q1: '',
    q2: [],
    q3: [],
    q4: '',
    q5: [],
    q6: '',
  });

  // ------------------------------
  // (A) アプリ起動時: ローカルストレージに「answers」があれば復元
  // ＋ ログイン済みなら自動的に送信
  // ------------------------------
  useEffect(() => {
    // 1) ストレージから読み込み
    const saved = localStorage.getItem('savedAnswers');
    if (saved) {
      const parsed = JSON.parse(saved);
      setAnswers(parsed); // Stateに復元
    }

    // 2) liff.init → もしすでにログイン済みなら自動送信
    (async () => {
      await window.liff.init({ liffId: '2006939832-bweQAyAR' });
      if (window.liff.isLoggedIn()) {
        // ローカルストレージに回答があればすぐ送信
        if (saved) {
          await sendAnswers(JSON.parse(saved));
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ページ遷移
  const goNext = () => setPage(p => p + 1);
  const goBack = () => setPage(p => (p > 0 ? p - 1 : 0));

  // Q1〜Q6の回答を更新
  const handleSetAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  // ------------------------------
  // (B) 実際にサーバーへ送信する関数 (answersObjを引数に)
  // ------------------------------
  const sendAnswers = async (answersObj) => {
    try {
      const profile = await window.liff.getProfile();
      const userId = profile.userId;
      console.log('LINE userId:', userId);

      const res = await fetch('https://homedental-backend-test.onrender.com/api/save-answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, answers: answersObj }),
      });

      if (res.ok) {
        alert('回答を送信しました。LINEで結果をご確認ください。');
        // 送信成功したらストレージをクリア
        localStorage.removeItem('savedAnswers');
      } else {
        alert('送信に失敗しました。');
      }
    } catch (err) {
      console.error(err);
      alert('送信でエラー発生:' + err.message);
    }
  };

  // ------------------------------
  // (C) Finishページ: ボタンを押すと "answers" を保存 → ログイン → 戻ってきたら自動送信
  // ------------------------------
  const handleFinish = async () => {
    try {
      // ログイン前に回答をローカルストレージへ保存
      localStorage.setItem('savedAnswers', JSON.stringify(answers));

      // liff.init
      await window.liff.init({ liffId: '2006939832-bweQAyAR' });
      if (!window.liff.isLoggedIn()) {
        // ログイン開始
        window.liff.login({});
        return;
      }

      // ログイン済みなら すぐ送信
      await sendAnswers(answers);
    } catch (err) {
      console.error(err);
      alert('エラーが発生:' + err.message);
    }
  };

  // ページ切り替え
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
  }

  return (
    <div className="app-container">
      {page > 0 && <ProgressBar page={page} />}
      <div className="page-content">{content}</div>
    </div>
  );
}

export default App;
