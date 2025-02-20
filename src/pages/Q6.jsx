// src/pages/Q6.jsx
import React, { useState, useEffect } from 'react';

const Q6 = ({ value, onChange, onNext, onBack }) => {
  const [selectedJob, setSelectedJob] = useState(value || '');
  const jobs = [
    '栄養士',
    '看護師',
    '歯科衛生士',
    '歯科技工士',
    '該当なし'
  ];

  useEffect(() => {
    setSelectedJob(value);
  }, [value]);

  const handleSelect = (job) => {
    setSelectedJob(job);
    onChange(job);
  };

  const handleNext = () => {
    if (!selectedJob) {
      alert('ご職業を1つ選んでください（なければ「該当なし」を選択）');
      return;
    }
    onNext();
  };

  return (
    <div style={{ marginTop: 50 }}>
      <h2>Question 6</h2>
      <p>あなたのご職業について当てはまるものをお選びください</p>

      <div style={styles.cardGrid}>
        {jobs.map((job, idx) => {
          const isSelected = job === selectedJob;
          return (
            <div
              key={idx}
              onClick={() => handleSelect(job)}
              style={{
                ...styles.card,
                border: isSelected ? '2px solid #5F2D58' : '1px solid #ccc',
                backgroundColor: isSelected ? '#F8ECF1' : '#fff',
              }}
            >
              {job}
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

export default Q6;

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
