// src/pages/Finish.jsx
import React from 'react';

function Finish({ answers, onBack, onFinish }) {

  // ボタン押したときに、いったんanswersをlocalStorageに保存してから onFinish を呼ぶ
  const handleFinishButton = () => {
    localStorage.setItem('savedAnswers', JSON.stringify(answers));
    onFinish();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>アンケート完了</h2>
      {/* ここに回答一覧表示 */}
      <button onClick={handleFinishButton}>
        LINEログインして結果を送信
      </button>
      <button onClick={onBack} style={{ marginLeft: 8 }}>戻る</button>
    </div>
  );
}

export default Finish;
