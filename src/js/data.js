// 演出用ハードコードデータ（実際の統計・判定ではありません）
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
