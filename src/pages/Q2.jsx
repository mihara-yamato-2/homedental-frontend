// src/pages/Q2.jsx
import React, { useState, useEffect } from 'react';

const Q2 = ({ value, onChange, onNext, onBack }) => {
  const items = [
    '機能的にも気になる箇所がある',
    '食事中かみ合わせが不便',
    '発音しにくい',
    '歯ぎしりがある',
    '特にない'
  ];

  // 親からの初期値(配列)をローカルstateで管理
  const [selectedItems, setSelectedItems] = useState(value || []);

  useEffect(() => {
    setSelectedItems(value);
  }, [value]);

  const handleToggle = (item) => {
    let newList;
    if (selectedItems.includes(item)) {
      // すでに選択されていれば解除
      newList = selectedItems.filter((i) => i !== item);
    } else {
      // 選択追加
      newList = [...selectedItems, item];
    }
    setSelectedItems(newList);
    onChange(newList); // 親へ通知
  };

  const handleNext = () => {
    // 複数選択だから「選んでなくてもOK」ならバリデーションなしでも可
    // 必須なら if(selectedItems.length===0) alert('何か選んでください') ...
    onNext();
  };

  return (
    <div style={{ marginTop: 50 }}>
      <h2>Question 2</h2>
      <p>機能面で気になる箇所をすべてお選びください</p>

      <div style={styles.listArea}>
        {items.map((item, idx) => {
          const isSelected = selectedItems.includes(item);
          return (
            <div
              key={idx}
              onClick={() => handleToggle(item)}
              style={{
                ...styles.item,
                border: isSelected ? '2px solid #5F2D58' : '1px solid #ccc',
                backgroundColor: isSelected ? '#F8ECF1' : '#fff',
              }}
            >
              {item}
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

export default Q2;

const styles = {
  listArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginTop: 20,
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
