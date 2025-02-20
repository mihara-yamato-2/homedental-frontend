// src/pages/S1.jsx
import React from 'react';

const S1 = ({ onNext, onBack }) => {
  return (
    <div style={styles.questionContainer}>
      <p style={styles.largeText}>
        まずは、<br/>
        あなたの歯並びのお悩みについて<br/>
        教えてください
      </p>
      <div style={styles.navButtons}>
        <button style={styles.buttonBack} onClick={onBack}>
          ←
        </button>
        <button style={styles.buttonNext} onClick={onNext}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default S1;

const styles = {
  questionContainer: {
    marginTop: 50,
  },
  largeText: {
    fontSize: '20px',
    lineHeight: 1.6,
    marginBottom: 20,
  },
  navButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonBack: {
    backgroundColor: '#E0D4DF',
    color: '#333',
    border: 'none',
    borderRadius: '24px',
    padding: '8px 16px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  buttonNext: {
    backgroundColor: '#5F2D58',
    color: '#fff',
    border: 'none',
    borderRadius: '24px',
    padding: '12px 28px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};
