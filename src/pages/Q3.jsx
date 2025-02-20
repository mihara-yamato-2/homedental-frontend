// src/pages/Q3.jsx
import React, { useState, useEffect } from 'react';

const Q3 = ({ value, onChange, onNext, onBack }) => {
  const [selectedParts, setSelectedParts] = useState(value || []);

  const partList = [
    '上の前歯',
    '上の奥歯',
    '下の前歯',
    '下の奥歯',
  ];

  useEffect(() => {
    setSelectedParts(value);
  }, [value]);

  const handleToggle = (part) => {
    let newList = [];
    if (selectedParts.includes(part)) {
      newList = selectedParts.filter((p) => p !== part);
    } else {
      newList = [...selectedParts, part];
    }
    setSelectedParts(newList);
    onChange(newList);
  };

  return (
    <div style={{ marginTop: 50 }}>
      <h2>Question 3</h2>
      <p>特に気になっている箇所をすべてお選びください</p>
      <div style={styles.grid}>
        {partList.map((part) => {
          const isSelected = selectedParts.includes(part);
          return (
            <div
              key={part}
              onClick={() => handleToggle(part)}
              style={{
                ...styles.card,
                border: isSelected ? '2px solid #5F2D58' : '1px solid #ccc',
                backgroundColor: isSelected ? '#F8ECF1' : '#fff',
              }}
            >
              {part}
            </div>
          );
        })}
      </div>

      <div style={styles.navButtons}>
        <button onClick={onBack}>← 戻る</button>
        <button onClick={onNext}>NEXT</button>
      </div>
    </div>
  );
};

export default Q3;

const styles = {
  grid: {
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
