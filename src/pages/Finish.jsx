// src/pages/Finish.jsx
import React from 'react';

function Finish({ answers, onFinish, onBack }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>アンケート完了</h2>
      <p>LINE公式アカウントに登録して結果を受け取る</p>
      {/* 回答表示(任意) */}
      <div style={{ margin: '20px 0' }}>
        <p>Q1: {answers.q1}</p>
        <p>Q2: {answers.q2.join(', ')}</p>
        ...
        <p>Q6: {answers.q6}</p>
      </div>

      <button onClick={onFinish}>LINEログインして結果を受け取る</button>
      <button onClick={onBack} style={{ marginLeft: 8 }}>戻る</button>
    </div>
  );
}

export default Finish;
