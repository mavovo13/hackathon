# リポジトリ構造定義書 (Repository Structure Document)

## プロジェクト構造

```
hackathon/
├── src/                        # フロントエンドソースコード
│   ├── index.html              # ダッシュボード（メイン）
│   ├── detection.html          # 嘘判定ページ
│   ├── savings.html            # 嘘節約のすすめページ
│   ├── css/
│   │   └── style.css           # 全ページ共通スタイル（政府系テーマ）
│   ├── js/
│   │   ├── data.js             # 嘘データ定数（グラフ・TOP5・判定パターン）
│   │   ├── dashboard.js        # ダッシュボード用グラフ描画ロジック
│   │   └── detection.js        # Webカメラ・嘘判定演出ロジック
│   └── images/
│       └── agency-logo.png     # 嘘資源管理庁 庁章（ロゴ）
├── docs/                       # プロジェクトドキュメント（永続）
│   ├── ideas/
│   │   └── initial-idea.md     # 初期アイデアメモ
│   ├── product-requirements.md
│   ├── functional-design.md
│   ├── architecture.md
│   ├── repository-structure.md （本ドキュメント）
│   ├── development-guidelines.md
│   └── glossary.md
├── .steering/                  # 作業単位のステアリングドキュメント
│   └── [YYYYMMDD]-[タイトル]/
│       ├── requirements.md
│       ├── design.md
│       └── tasklist.md
├── .claude/                    # Claude Code設定
│   └── skills/
├── CLAUDE.md                   # プロジェクトメモリ
└── .gitignore
```

---

## ディレクトリ詳細

### src/ (ソースコードディレクトリ)

#### src/*.html (HTMLページ)

**役割**: 各ページのHTMLマークアップ。共通ヘッダー・フッター・左ナビゲーションを各ファイルに直接記述する（インクルード機構なし）。

**配置ファイル**:
- `index.html`: ダッシュボードページ（嘘残量グラフ + TOP5テーブル）
- `detection.html`: 嘘判定ページ（Webカメラ演出）
- `savings.html`: 嘘節約のすすめページ（啓発コンテンツ）

**命名規則**:
- kebab-case、英語小文字
- ページの役割が明確にわかる名前

---

#### src/css/ (スタイルシート)

**役割**: 全ページ共通の政府系ポータルテーマスタイルを1ファイルに集約する

**配置ファイル**:
- `style.css`: 全スタイル（レイアウト・タイポグラフィ・カラー・テーブル・グラフ）

**命名規則**:
- セレクタは ID / クラスを使用
- クラス名は kebab-case（例: `.lie-chart-container`, `#sidebar-nav`）

**例**:
```
src/css/
└── style.css       # 唯一のスタイルファイル（分割しない）
```

---

#### src/js/ (JavaScriptモジュール)

**役割**: ページの振る舞いとデータ定義

**配置ファイル**:

| ファイル | 役割 |
|---------|------|
| `data.js` | 嘘残量履歴・TOP5事件・判定パターンのデータ定数 |
| `dashboard.js` | Chart.js を使った嘘残量グラフ描画・イベントマーカー |
| `detection.js` | Webカメラ起動・「解析中」演出・ランダム結果表示 |

**依存関係**:
- `dashboard.js` → `data.js`（定数参照）
- `detection.js` → `data.js`（判定パターン参照）
- `dashboard.js` → Chart.js CDN（外部）

**命名規則**:
- camelCase で定数・関数を命名
- 定数は UPPER_SNAKE_CASE（例: `LIE_RESERVE_HISTORY`, `LIE_JUDGMENT_PATTERNS`）

---

#### src/images/ (画像ファイル)

**役割**: 庁章ロゴ等の静的画像

**配置ファイル**:
- `agency-logo.png`: 嘘資源管理庁の庁章（SVGまたはPNG）

**命名規則**:
- kebab-case、用途が明確な名前

---

### docs/ (ドキュメントディレクトリ)

**配置ドキュメント**:

| ファイル | 内容 |
|---------|------|
| `ideas/initial-idea.md` | 初期ブレスト・アイデアメモ（変更しない） |
| `product-requirements.md` | プロダクト要求定義書 |
| `functional-design.md` | 機能設計書 |
| `architecture.md` | 技術仕様書 |
| `repository-structure.md` | 本ドキュメント |
| `development-guidelines.md` | 開発ガイドライン |
| `glossary.md` | 用語集 |

---

### .steering/ (ステアリングドキュメント)

**役割**: 特定の開発作業における「今回何をするか」を定義する一時的なドキュメント群

**構造**:
```
.steering/
└── 20260530-initial-implementation/
    ├── requirements.md    # 初回実装の要求内容
    ├── design.md          # 実装設計
    └── tasklist.md        # タスクリスト
```

---

## ファイル配置規則

### ソースファイル

| ファイル種別 | 配置先 | 命名規則 | 例 |
|------------|--------|---------|-----|
| HTMLページ | `src/` | kebab-case.html | `detection.html` |
| CSSスタイル | `src/css/` | kebab-case.css | `style.css` |
| JSロジック | `src/js/` | camelCase.js | `dashboard.js` |
| JSデータ定数 | `src/js/` | camelCase.js | `data.js` |
| 画像 | `src/images/` | kebab-case.{png,svg} | `agency-logo.png` |

### HTMLファイル内のリソース参照

```html
<!-- CSSは head 内に配置 -->
<link rel="stylesheet" href="css/style.css">

<!-- 外部CDN（Chart.js）はbody末尾 -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

<!-- 独自JSはCDNの後、body末尾 -->
<script src="js/data.js"></script>
<script src="js/dashboard.js"></script>
```

---

## 命名規則

### ディレクトリ名
- `src/`, `css/`, `js/`, `images/` — 複数形、英語小文字

### HTMLファイル
- kebab-case: `index.html`, `detection.html`, `savings.html`

### CSSクラス・ID
- クラス: kebab-case `.lie-chart-wrapper`, `.top5-table`, `.detection-result`
- ID: kebab-case `#sidebar-nav`, `#main-content`, `#camera-view`

### JavaScript
- 定数: UPPER_SNAKE_CASE — `LIE_RESERVE_HISTORY`, `LIE_JUDGMENT_PATTERNS`
- 関数: camelCase — `renderLieChart()`, `startDetection()`, `showResult()`
- DOM変数: camelCase + 要素種別サフィックス — `cameraVideo`, `resultContainer`

---

## 依存関係のルール

```
index.html
    → css/style.css
    → js/data.js
    → js/dashboard.js
    → CDN: chart.js

detection.html
    → css/style.css
    → js/data.js
    → js/detection.js

savings.html
    → css/style.css
    （JS不要）
```

**禁止される依存**:
- `dashboard.js` → `detection.js`（相互依存禁止）
- `detection.js` → `dashboard.js`（同上）
- HTMLページ間のJS共有グローバル変数（`data.js` の定数経由のみ許可）

---

## 除外設定（.gitignore）

```gitignore
# OS
.DS_Store
Thumbs.db

# エディタ
.vscode/
*.swp

# ログ
*.log

# 本番ビルド（ビルドステップがある場合のみ）
dist/
```

**含めるもの**: `src/`, `docs/`, `.steering/`, `CLAUDE.md`, `.gitignore`  
**含めないもの**: OS 生成ファイル、エディタ設定（個人依存）
