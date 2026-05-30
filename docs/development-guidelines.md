# 開発ガイドライン (Development Guidelines)

> このプロジェクトはハッカソン用の単一デプロイ静的Webアプリです。
> ビルドツール・テストフレームワーク・型チェックは使用しません。
> 実用性よりも「2003年政府サイト」としての完成度とデモ安定性を最優先とします。

---

## コーディング規約

### HTML

- `<!DOCTYPE html>` は HTML 4.01 Transitional または HTML5 どちらでもよい
- 文字コード: `<meta charset="UTF-8">`
- 各ページに `<title>嘘資源管理庁 - [ページ名] | Ministry of Lie Resources</title>` を設定する
- `<link rel="stylesheet" href="css/style.css">` はすべてのページで共通
- インラインスタイル（`style="..."`）は使用しない。すべて `style.css` に記述する
- インラインスクリプト（`<script>` タグ内の処理）は最小限。イベントリスナーは外部JSに記述する

**ページ共通構造テンプレート**:
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>嘘資源管理庁 - ダッシュボード | Ministry of Lie Resources</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div id="wrapper">
    <!-- ヘッダー -->
    <div id="header">...</div>
    <!-- コンテンツ領域 -->
    <div id="content-area">
      <div id="sidebar">...</div>
      <div id="main">
        <!-- ページ固有コンテンツ -->
      </div>
      <div class="clear"></div>
    </div>
    <!-- フッター -->
    <div id="footer">...</div>
  </div>
  <!-- JS は body 末尾に -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <script src="js/data.js"></script>
  <script src="js/dashboard.js"></script>
</body>
</html>
```

---

### CSS

- **float レイアウトのみ使用**。`display: flex` / `display: grid` は使用しない
- `#wrapper { width: 800px; margin: 0 auto; }` を基準とした固定幅レイアウト
- フォント指定は必ず以下を使用する:
  ```css
  font-family: "MS PGothic", "MS Pゴシック", "ＭＳ Ｐゴシック", sans-serif;
  ```
- セレクタは ID（`#id`）とクラス（`.class`）を使用。タグセレクタは基本スタイルのみ
- クラス名は kebab-case: `.lie-chart-container`, `.top5-table`, `.sidebar-nav-item`
- CSS変数（`--custom-property`）は使用しない（時代考証）
- `!important` は使用しない

**カラーパレット（コメントで定義しておく）**:
```css
/* 
  メインカラー:    #003399 (紺)
  セカンダリ:     #336699 (くすんだ青)
  本文テキスト:   #333333
  サイド背景:     #e8eef5
  本文背景:       #ffffff
  警告/マーカー:   #cc0000
  テーブルヘッダ: #ccddee
  テーブル偶数行: #f0f5fa
*/
```

---

### JavaScript

- **Vanilla JS のみ**。React・Vue・jQuery は使用しない
- ES2020+ を使用可（`const`, `let`, アロー関数, テンプレートリテラル, `async/await` 等）
- グローバル変数は最小限。データ定数は `data.js` に集約し `const` で宣言する
- DOM操作は `textContent` を使用し、`innerHTML` でユーザー入力を扱わない（XSS防止）
- イベントリスナーは `addEventListener` を使用（`onclick="..."` 属性は使用しない）

**命名規則**:

| 種別 | 規則 | 例 |
|------|------|-----|
| 定数（データ） | UPPER_SNAKE_CASE | `LIE_RESERVE_HISTORY` |
| 関数 | camelCase、動詞始め | `renderLieChart()`, `startDetection()` |
| DOM変数 | camelCase + 要素種別 | `cameraVideo`, `resultContainer` |
| Boolean変数 | `is`/`has` 始め | `isCameraActive`, `hasResult` |

**data.js の構造**:
```javascript
// すべてのデータ定数をここに集約する
const LIE_RESERVE_HISTORY = [ /* ... */ ];
const LIE_INCIDENTS_TOP5 = [ /* ... */ ];
const LIE_JUDGMENT_PATTERNS = [ /* ... */ ];
```

**関数の長さ**: 1関数50行以内を目安。超える場合は分割を検討する。

---

### コメント規約

- **なぜそうするか** をコメントする（何をするかはコードを見ればわかる）
- セクション区切りコメントで可読性を上げる:
  ```javascript
  // === グラフ描画 ===
  function renderLieChart() { ... }

  // === イベントマーカー ===
  function addEventMarkers(chart) { ... }
  ```
- でたらめデータには「演出用」の注釈を入れる:
  ```javascript
  // 演出用ハードコードデータ（実際の統計ではありません）
  const LIE_RESERVE_HISTORY = [ ... ];
  ```

---

## 開発環境セットアップ

### 必要なツール

| ツール | バージョン | 用途 |
|--------|-----------|------|
| Chrome / Edge | 最新版 | デモ実行（Webカメラ対応のため） |
| VS Code（任意） | 最新版 | コード編集 |
| Python（任意） | 3.x | ローカルHTTPサーバー起動 |

### セットアップ手順

```bash
# 1. リポジトリのクローン（またはファイルを展開）
git clone <repo-url>
cd hackathon

# 2. ローカルサーバーで起動（Webカメラ API は https または localhost が必要）
python -m http.server 8000 --directory src
# または
npx serve src

# 3. ブラウザで開く
# http://localhost:8000
```

**ファイルを直接ブラウザで開く場合**（`file://`）: Webカメラ API が動作しない場合があるため、HTTPサーバー経由を推奨する。

---

## Git 運用ルール

ハッカソン期間中はシンプルな運用とする。

### ブランチ戦略

```
main  ← 常にデモ可能な状態を維持
  └─ feature/[機能名]  ← 開発中の機能
```

- `main` には動作確認済みのコードのみをマージする
- 破壊的変更をする場合は必ず `feature/` ブランチを切る

### コミットメッセージ

```
<type>: <内容>
```

**Type**:
- `feat`: 機能追加（例: `feat: 嘘残量グラフを実装`）
- `fix`: バグ修正（例: `fix: Webカメラ権限拒否時のエラー処理`）
- `style`: スタイル調整（例: `style: ヘッダーの紺色を正確な色コードに修正`）
- `data`: データ更新（例: `data: 嘘判定パターンを8種類に拡充`）
- `docs`: ドキュメント（例: `docs: READMEにセットアップ手順を追加`）

---

## デモ品質チェックリスト

### 機能確認（実装後に必ずブラウザで確認）

- [ ] Chrome 最新版でダッシュボードが表示される（文字化けなし）
- [ ] 嘘残量グラフが正しく描画される（折れ線、右肩下がり）
- [ ] グラフ上のイベントマーカーが表示される
- [ ] 「2003年8月14日 14:22 急落（原因不明）」が目立つ位置に表示される
- [ ] TOP5テーブルが表示される（5行すべて）
- [ ] 嘘判定ページでWebカメラが起動する
- [ ] 「解析中...」演出が3〜5秒表示される
- [ ] 結果が表示される（毎回異なること）
- [ ] 「再解析」ボタンで別の結果が表示される
- [ ] 節約のすすめページが表示される
- [ ] 左ナビの「法令・通知」等のダミーリンクが飛ばない
- [ ] フッターに「Copyright © 平成19年」「IE6推奨」「最終更新：平成31年4月」が表示される

### 見た目の確認

- [ ] フォントが MS Pゴシック（またはそれに近い等幅っぽいフォント）で表示される
- [ ] 配色が紺・灰・くすんだ青（モダンなカラーになっていない）
- [ ] 800px固定幅で表示が崩れていない
- [ ] プロジェクターを想定した 1024×768 相当の表示で文字が読める

### プレゼン本番前確認

- [ ] スライドなしでサイト単体でデモできる
- [ ] Webカメラが接続されているPCで動作確認済み
- [ ] インターネット接続なしでも動作する（Chart.js をローカルコピー済み、または接続確認済み）
- [ ] 「種明かし」のセリフを覚えている：「一点だけ申し上げます。これは嘘です。しかし——まったく同じことが、電力の世界で起きています。」

---

## セキュリティ注意事項

- Webカメラ映像は外部送信しない。`getUserMedia()` で取得したストリームは `<video>` 要素への表示のみに使用する
- `innerHTML` にユーザー入力を入れない。テキスト挿入は `textContent` を使用する
- 本番公開する場合は HTTPS 環境で運用する（Webカメラ API の要件）
