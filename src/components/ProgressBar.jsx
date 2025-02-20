import React from 'react';

/**
 * ProgressBar
 * @param {number} page ページ番号(1~9など)。0なら非表示扱い。
 */
function ProgressBar({ page }) {
  // ページ→ステップのマッピング
  const { mainStep, subStep } = getProgressState(page);
  // mainStep < 0 の場合、プログレスバー非表示(Explanationなど)
  if (mainStep < 0) return null;

  /**
   * 塗りつぶし線の長さ (0〜100%)
   * - mainStep=0(お悩み中) のとき => 0%〜50% を subStep で段階的に
   * - mainStep=1(基本情報中) => 50% + (0%〜50%) * subStep
   * - mainStep=2(完了) => 100%
   */
  let fillPercent = 0;
  if (mainStep === 0) {
    fillPercent = 50 * subStep;       // 0〜50%
  } else if (mainStep === 1) {
    fillPercent = 50 + 50 * subStep;  // 50%〜100%
  } else if (mainStep === 2) {
    fillPercent = 100;
  }

  /**
   * 円（ステップ）が「アクティブ（紫）か否か」を判定する関数
   * index=0 => お悩み, 1 => 基本情報, 2 => 完了
   */
  const isCircleActive = (index) => {
    if (index < mainStep) {
      return true; // 過去にクリアしたステップ
    }
    if (index === mainStep) {
      // subStepが0以上あれば円自体はアクティブ
      return true;
    }
    return false;
  };

  return (
    <div style={styles.container}>
      {/* 背景線(薄いベージュ) */}
      <div style={styles.backgroundLine} />
      {/* 塗りつぶし線(紫) widthを可変にして伸ばす */}
      <div
        style={{
          ...styles.fillLine,
          width: `${fillPercent}%`,
        }}
      />
      {/* 3つの円 */}
      <Circle label="お悩み"   left="0%"   active={isCircleActive(0)} />
      <Circle label="基本情報" left="50%"  active={isCircleActive(1)} />
      <Circle label="完了"     left="100%" active={isCircleActive(2)} />
    </div>
  );
}

/** ページ番号に応じて { mainStep, subStep } を返す関数 */
function getProgressState(page) {
  // 説明ページなどバーを出さない場合
  if (page === 0) {
    return { mainStep: -1, subStep: 0 };
  }

  /*
    例）お悩みステップ (mainStep=0)
      - S1 => subStep=0  (円だけ紫、線0%)
      - Q1 => subStep=0.33
      - Q2 => subStep=0.66
      - Q3 => subStep=1.0 (線100%まで伸びる)
    基本情報ステップ (mainStep=1)
      - S2 => subStep=0
      - Q4 => subStep=0.33
      - Q5 => subStep=0.66
      - Q6 => subStep=1.0
    完了 (mainStep=2)
      - 最終ページ => subStep=0 (右端の円だけ紫)
  */

  switch (page) {
    // お悩み (mainStep=0)
    case 1: return { mainStep: 0, subStep: 0    }; // S1
    case 2: return { mainStep: 0, subStep: 0.33 }; // Q1
    case 3: return { mainStep: 0, subStep: 0.66 }; // Q2
    case 4: return { mainStep: 0, subStep: 1.0  }; // Q3

    // 基本情報 (mainStep=1)
    case 5: return { mainStep: 1, subStep: 0    }; // S2
    case 6: return { mainStep: 1, subStep: 0.33 }; // Q4
    case 7: return { mainStep: 1, subStep: 0.66 }; // Q5
    case 8: return { mainStep: 1, subStep: 1.0  }; // Q6

    // 完了 (mainStep=2)
    case 9: return { mainStep: 2, subStep: 0 };

    default:
      // 想定外は非表示
      return { mainStep: -1, subStep: 0 };
  }
}

/** 円を描画する小コンポーネント */
function Circle({ label, left, active }) {
  return (
    <div style={{ ...styles.circleContainer, left }}>
      <div
        style={{
          ...styles.circleBase,
          backgroundColor: active ? '#5F2D58' : '#D9C7D5',
          border: `2px solid ${active ? '#5F2D58' : '#D9C7D5'}`
        }}
      />
      <div
        style={{
          marginTop: 6,
          color: active ? '#5F2D58' : '#D9C7D5',
          fontSize: '12px',
          textAlign: 'center',
          transform: 'translateX(-50%)',
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default ProgressBar;


/* -- スタイル -- */
const styles = {
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: '450px', // スマホでも崩れないよう、適宜調整
    height: '40px',
    margin: '0 auto',
  },
  // 背景の薄いライン
  backgroundLine: {
    position: 'absolute',
    top: '18px', // 円の中心に合わせる
    left: '0',
    right: '0',
    height: '2px',
    backgroundColor: '#D9C7D5',
    zIndex: 1,
  },
  // 紫の塗り線
  fillLine: {
    position: 'absolute',
    top: '18px',
    left: '0',
    height: '2px',
    backgroundColor: '#5F2D58',
    zIndex: 2,
    width: '0%', // 動的に変更
  },
  // 円の位置を指定
  circleContainer: {
    position: 'absolute',
    bottom: '0px',
    transform: 'translateX(-50%)',
    textAlign: 'center',
  },
  circleBase: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    zIndex: 3,
  },
};
