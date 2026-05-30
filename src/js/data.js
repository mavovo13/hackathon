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
        label: "【4位】2003.8.14 14:22\n急落事案（847 Kuso）",
        xValue: 2003,
        drop: 847,
        color: "#666699",
        labelPosition: 0.05,
        xAdjust: 0
      }
    ]
  },
  { year: 2004, amount: 91200 },
  { year: 2005, amount: 90600 },
  { year: 2006, amount: 89800 },
  { year: 2007, amount: 89100 },
  { year: 2008, amount: 87300 },
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
        label: "【1位】米大統領選\n虚偽情報拡散（18,420 Kuso）",
        xValue: 2016,
        drop: 18420,
        color: "#cc0000",
        labelPosition: 0.05,
        xAdjust: 0
      }
    ]
  },
  { year: 2017, amount: 78200 },
  { year: 2018, amount: 76100 },
  { year: 2019, amount: 74500 },
  { year: 2020, amount: 71200 },
  { year: 2021, amount: 65800 },
  { year: 2022, amount: 58900 },
  { year: 2023, amount: 46300 },
  { year: 2024, amount: 41200 },
  { year: 2025, amount: 29400 },
  { year: 2026, amount: 18700 }
];

/* 嘘大量消費事件 TOP5 */
const LIE_INCIDENTS_TOP5 = [
  {
    rank: 1,
    name: "米大統領選関連虚偽情報拡散",
    year: "2016年",
    consumption: 18420,
    consumptionRate: "全体の18.7%",
    note: "SNSを介した伝搬速度が過去最速を記録。複数国家による組織的嘘の同時大量放出。現在も影響が続く。"
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
    name: "STAP細胞「あります」単独宣言事案",
    year: "2014年1月28日",
    consumption: 3120,
    consumptionRate: "全体の3.2%",
    note: "存在しないものへの「あります」宣言は、嘘資源の消費量を測定できないという新課題を突きつけた。哲学的観点から現在も研究が続いている。"
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
    name: "「記憶にございません」国会答弁累計消費事案（通年）",
    year: "通年（計測継続中）",
    consumption: "― (測定不能)",
    consumptionRate: "測定不能",
    note: "調査委員会が計測を試みたが疲弊により断念。「覚えていない」という嘘は証明が最も困難な類型として学術的に注目されている。"
  }
];

/* 統計パネル定数 */
const CURRENT_AMOUNT   = "18,742 キロウソ(Kuso)";
const CONSUMPTION_RATE = "−31.2%（過去最速）";
const DEPLETION_YEAR   = "西暦 2029 年（推計）";
const MAIN_SOURCE      = "AI ハルシネーション（74.3%）";

/* 演出用ハードコードデータ（実際の統計・判定ではありません） */
const LIE_JUDGMENT_PATTERNS = [
  {
    lieType: "「一回家に取りに帰ります」系",
    percentage: 73.2,
    riskLevel: "高",
    riskLabel: "高（警戒レベル3）",
    advice: "公共交通機関の乗り換えで特に発症しやすい傾向にあります。"
  },
  {
    lieType: "「もうすぐ着きます」系（家を出ていない）",
    percentage: 81.4,
    riskLevel: "極めて高",
    riskLabel: "極めて高（警戒レベル4）",
    advice: "スマートフォンのGPS機能の普及により消費リスクが高まっています。"
  },
  {
    lieType: "「5分で終わります」系",
    percentage: 68.9,
    riskLevel: "高",
    riskLabel: "高（警戒レベル3）",
    advice: "会議室での発症例が最多です。推定所要時間に1.8を乗じることを推奨します。"
  },
  {
    lieType: "「前から知っていました」系",
    percentage: 44.7,
    riskLevel: "中",
    riskLabel: "中（警戒レベル2）",
    advice: "知的虚栄心に起因する類型です。今後の普及が懸念されます。"
  },
  {
    lieType: "「全然食べてないんですよ」系（食べている）",
    percentage: 62.3,
    riskLevel: "高",
    riskLabel: "高（警戒レベル3）",
    advice: "食事制限関連嘘の中では最も消費量が多い亜種です。"
  },
  {
    lieType: "「気にしてないです」系（気にしている）",
    percentage: 88.1,
    riskLevel: "極めて高",
    riskLabel: "極めて高（警戒レベル4）",
    advice: "帰宅後3〜4時間にわたって反芻する傾向が観測されています。"
  },
  {
    lieType: "「大丈夫です」系（大丈夫ではない）",
    percentage: 91.7,
    riskLevel: "極めて高",
    riskLabel: "極めて高（警戒レベル4）",
    advice: "最も汎用性の高い嘘類型です。年間消費量の試算が困難なほど多用されています。"
  },
  {
    lieType: "「また今度行きましょう」系（行く気がない）",
    percentage: 57.3,
    riskLevel: "中",
    riskLabel: "中（警戒レベル2）",
    advice: "社交辞令との境界が曖昧なグレーゾーン類型。資源の観点からは消費に分類されます。"
  },
  {
    lieType: "「読んでません」系（既読）",
    percentage: 76.5,
    riskLevel: "高",
    riskLabel: "高（警戒レベル3）",
    advice: "SNS・メッセージアプリの普及により急増中。既読通知機能が発症率を押し上げています。"
  },
  {
    lieType: "「今日は早く帰ります」系（残業確定）",
    percentage: 84.2,
    riskLevel: "極めて高",
    riskLabel: "極めて高（警戒レベル4）",
    advice: "金曜日の発症率が平日平均の2.3倍。上司の視線との相関が統計的に有意です。"
  },
  {
    lieType: "「運動してます」系（階段昇降のみ）",
    percentage: 39.8,
    riskLevel: "低",
    riskLabel: "低（警戒レベル1）",
    advice: "健康関連嘘の中では比較的消費量が少ない類型。ただし累積効果には注意が必要です。"
  }
];
