# 嘘資源管理庁 — Ministry of Lie Resources

ハッカソン用の静的Webアプリ。2003年風政府ポータルサイトとして「嘘の資源枯渇」を訴えるデモサイト。

## 起動方法

```bash
# ローカルサーバー起動（Webカメラ API は localhost または HTTPS が必要）
npm run serve
# または
python3 -m http.server 8000 --directory src
```

ブラウザで以下を開く:

- トップ（スタブ）: http://localhost:8000/
- **嘘判定（Webカメラ）**: http://localhost:8000/detection.html

## 機能3: あなたの嘘判定

`detection.html` で Webカメラを起動し、4秒間の「顔面嘘指数」解析演出の後、ランダムな嘘タイプ診断結果を表示します。

- 実際の顔認識・感情分析は行いません（演出のみ）
- カメラ映像はブラウザ内で完結し、外部送信・保存しません
- カメラ権限拒否時も「強制解析モード」で結果を表示します

## 品質チェック

```bash
npm test
npm run lint
npm run typecheck
```

## プロジェクト構成

```
src/
├── index.html          # ダッシュボード（準備中スタブ）
├── detection.html      # 嘘判定ページ
├── css/style.css       # 共通スタイル
└── js/
    ├── data.js         # 判定パターンデータ
    └── detection.js    # Webカメラ・解析演出
```

詳細は `docs/` 内の設計ドキュメントを参照してください。
