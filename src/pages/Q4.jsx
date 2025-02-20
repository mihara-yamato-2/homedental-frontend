// src/pages/Q4.jsx
import React, { useState, useEffect } from 'react';

const Q4 = ({ value, onChange, onNext, onBack }) => {
  const [birthday, setBirthday] = useState(value || '');

  useEffect(() => {
    setBirthday(value);
  }, [value]);

  const handleNext = () => {
    if (!birthday) {
      alert('生年月日を入力してください');
      return;
    }
    onNext();
  };

  return (
    <div style={{ marginTop: 50 }}>
      <h2>Question 4</h2>
      <p>あなたの生年月日を教えてください</p>
      <input
        type="text"
        placeholder="YYYY/MM/DD"
        style={{ width: '80%', padding: 8 }}
        value={birthday}
        onChange={(e) => {
          setBirthday(e.target.value);
          onChange(e.target.value);
        }}
      />

      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onBack}>← 戻る</button>
        <button onClick={handleNext}>NEXT</button>
      </div>
    </div>
  );
};

export default Q4;
