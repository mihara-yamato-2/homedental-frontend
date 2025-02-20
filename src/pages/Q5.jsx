// src/pages/Q5.jsx
import React, { useState, useEffect } from 'react';

const Q5 = ({ value, onChange, onNext, onBack }) => {
  const eventList = [
    '入学',
    '新卒入社・転職',
    '結婚',
    '出産',
    '特になし'
  ];

  const [selected, setSelected] = useState(value || []);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleToggle = (item) => {
    let newList;
    if (selected.includes(item)) {
      newList = selected.filter((i) => i !== item);
    } else {
      newList = [...selected, item];
    }
    setSelected(newList);
    onChange(newList);
  };

  return (
    <div style={{ marginTop: 50 }}>
      <h2>Question 5</h2>
      <p>直近1年以内にあったライフイベントがあれば教えてください</p>

      <div style={styles.list}>
        {eventList.map((ev) => {
          const isSelected = selected.includes(ev);
          return (
            <div
              key={ev}
              onClick={() => handleToggle(ev)}
              style={{
                ...styles.item,
                border: isSelected ? '2px solid #5F2D58' : '1px solid #ccc',
                backgroundColor: isSelected ? '#F8ECF1' : '#fff',
              }}
            >
              {ev}
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

export default Q5;

const styles = {
  list: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  item: {
    padding: 16,
    borderRadius: 8,
    cursor: 'pointer',
  },
  navButtons: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
  },
};
