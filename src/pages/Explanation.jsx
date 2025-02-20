// src/pages/Explanation.jsx
import React from 'react';

const Explanation = ({ onNext }) => {
  return (
    <div style={styles.centeredContainer}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={styles.appTitle}>DPEARL Home Dental</h1>
        <p style={{ margin: '20px 0' }}>
          約3分で完了する質問から、<br/>
          あなた専用のパーソナライズ矯正プランを<br/>
          ご提案します
        </p>
      </div>
      <button style={styles.buttonNext} onClick={onNext}>
        START
      </button>
    </div>
  );
};

export default Explanation;

const styles = {
  centeredContainer: {
    textAlign: 'center',
    marginTop: 80,
  },
  appTitle: {
    fontSize: '24px',
    marginBottom: 10,
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
