// src/pages/Q1.jsx
import React, { useState, useEffect } from 'react';

const Q1 = ({ value, onChange, onNext, onBack }) => {
  const issues = [
    '出っ歯(上顎前突)',
    'すきっ歯(空隙歯列)',
    'ガタガタや八重歯(叢生)',
    '前歯が閉じない(開咬)',
    '受け口(反対咬合)',
    '下の歯が見えない(過蓋咬合)',
  ];

  // 初期選択を親から受け取る
  const [selectedIssue, setSelectedIssue] = useState(value || '');

  useEffect(() => {
    // 親の値が変わった場合に同期（必要なら）
    setSelectedIssue(value);
  }, [value]);

  const handleSelect = (issue) => {
    setSelectedIssue(issue);
    onChange(issue); // 親に知らせる
  };

  const handleNext = () => {
    if (!selectedIssue) {
      alert('お悩みを1つ選んでくださいaaaa');
      return;
    }
    onNext();
  };

  return (
    <div style={{ marginTop: 50 }}>
      <h2>Question 1</h2>
      <p>あなたの歯並びにおける<br/>見た目のお悩みを1つお選びください</p>

      <div style={styles.cardGrid}>
        {issues.map((issue, idx) => {
          const isSelected = (issue === selectedIssue);
          return (
            <div
              key={idx}
              onClick={() => handleSelect(issue)}
              style={{
                ...styles.card,
                border: isSelected ? '2px solid #5F2D58' : '1px solid #ccc',
                backgroundColor: isSelected ? '#F8ECF1' : '#fff',
              }}
            >
              {issue}
            </div>
          );
        })}
      </div>

      <div style={styles.navButtons}>
        <button onClick={onBack}>← 戻る</button>
        <button onClick={handleNext}>NEXT</button>
      </div>
    </div>
  );
};

export default Q1;

const styles = {
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    marginTop: 20,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    cursor: 'pointer',
    textAlign: 'center',
  },
  navButtons: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
  },
};
