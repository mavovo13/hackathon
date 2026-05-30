/* 嘘資源管理庁 — データ定数モジュール */

/* 世界嘘残量 年次データ（単位: キロウソ / Kuso） */
const LIE_RESERVE_HISTORY = [
  { year: 1990, amount: 98400 },
  { year: 1992, amount: 97800 },
  { year: 1995, amount: 96200 },
  { year: 1998, amount: 94900 },
  { year: 2000, amount: 93800 },
  { year: 2001, amount: 93100 },
  { year: 2002, amount: 92700 },
  {
    year: 2003,
    amount: 91853,
    events: [
      {
        label: "2003.8.14 14:22\n急落（原因不明）",
        xValue: 2003,
        drop: 847,
        color: "#cc0000"
      }
    ]
  },
  { year: 2004, amount: 91200 },
  { year: 2005, amount: 90600 },
  { year: 2006, amount: 89800 },
  { year: 2007, amount: 89100 },
  {
    year: 2008,
    amount: 87300,
    events: [
      {
        label: "リーマンショック\n関連説明",
        xValue: 2008,
        drop: 1200,
        color: "#996600"
      }
    ]
  },
  { year: 2009, amount: 86400 },
  { year: 2010, amount: 85700 },
  { year: 2011, amount: 84900 },
  { year: 2012, amount: 84100 },
  { year: 2013, amount: 83300 },
  { year: 2014, amount: 82400 },
  { year: 2015, amount: 81200 },
  {
    year: 2016,
    amount: 79800,
    events: [
      {
        label: "米大統領選",
        xValue: 2016,
        drop: 3800,
        color: "#cc0000"
      }
    ]
  },
  {
    year: 2017,
    amount: 78200,
    events: [
      {
        label: "エイプリルフール\n複合消費",
        xValue: 2017,
        drop: 312,
        color: "#666600"
      }
    ]
  },
  { year: 2018, amount: 76100 },
  { year: 2019, amount: 74500 },
  { year: 2020, amount: 71200 },
  { year: 2021, amount: 65800 },
  {
    year: 2022,
    amount: 58900,
    events: [
      {
        label: "AI（LLM）\n大量稼働開始",
        xValue: 2022,
        drop: 7400,
        color: "#990000"
      }
    ]
  },
  { year: 2023, amount: 46300 },
  { year: 2024, amount: 41200 },
  { year: 2025, amount: 29400 },
  { year: 2026, amount: 18700 }
];

/* 嘘大量消費事件 TOP5 */
const LIE_INCIDENTS_TOP5 = [
  {
    rank: 1,
    name: "第二次世界大戦期 枢軸国統合プロパガンダ作戦",
    year: "1939〜1945年",
    consumption: 18420,
    consumptionRate: "全体の18.7%",
    note: "複数国家による組織的嘘の同時大量放出。現在も影響が続く。"
  },
  {
    rank: 2,
    name: "AI大量ハルシネーション事案（進行中）",
    year: "2022年〜",
    consumption: 14300,
    consumptionRate: "全体の14.5%（増加中）",
    note: "LLMによる嘘の機械的・連続的放出。史上初の人工消費源。"
  },
  {
    rank: 3,
    name: "米大統領選関連虚偽情報拡散",
    year: "2016年",
    consumption: 3840,
    consumptionRate: "全体の3.9%",
    note: "SNSを介した伝搬速度が過去最速を記録。"
  },
  {
    rank: 4,
    name: "2003年8月14日 14:22 急落事案",
    year: "2003年",
    consumption: 847,
    consumptionRate: "全体の0.86%",
    note: "原因特定に至らず。調査委員会は平成21年に解散。"
  },
  {
    rank: 5,
    name: "エイプリルフール複合消費（年間定例）",
    year: "毎年4月1日",
    consumption: 312,
    consumptionRate: "全体の0.32%（年間）",
    note: "嘘が文化的に許容される唯一の日。節約の観点から見直しが求められる。"
  }
];

/* 統計パネル定数 */
const CURRENT_AMOUNT   = "18,742 キロウソ";
const CONSUMPTION_RATE = "−31.2%（過去最速）";
const DEPLETION_YEAR   = "西暦 2029 年（推計）";
const MAIN_SOURCE      = "AI ハルシネーション（74.3%）";
