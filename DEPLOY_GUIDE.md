# GitHub + Vercel デプロイ手順書

RUM資源循環クイズを **GitHub にコードを置き、Vercel から自動デプロイする** 構成で公開する手順です。
所要時間：初回 約10〜15分。2回目以降は `git push` するだけで自動更新されます。

---

## 事前準備（初回のみ）

| 必要なもの | 取得先 |
| --- | --- |
| GitHubアカウント | https://github.com/signup |
| Vercelアカウント | https://vercel.com/signup （GitHubアカウントでログイン推奨）|
| Gitコマンド（任意） | https://git-scm.com/downloads <br>※ GitHub Desktop でも可：https://desktop.github.com/ |

---

## ステップ1：GitHub にリポジトリを作成

1. https://github.com/new を開く
2. 以下を入力
   - **Repository name**: `rum-recycle-quiz` （任意の名前でOK）
   - **Description**: `RUM資源循環クイズ - クルマの冒険、終わらない旅`
   - **Public** または **Private** を選択（社内共有のみなら Private 推奨）
   - 「Add a README file」などのチェックは **すべて外す**（既にREADMEがあるため）
3. 「Create repository」をクリック
4. 表示されたページの「…or push an existing repository from the command line」のURLをコピー
   （例：`https://github.com/yourname/rum-recycle-quiz.git`）

---

## ステップ2：ローカルからGitHubにアップロード

### 方法A：コマンドライン（PowerShell / ターミナル）

このフォルダ（`RUM資源循環クイズ`）で以下を実行：

```bash
git init
git add .
git commit -m "Initial commit: RUM資源循環クイズ"
git branch -M main
git remote add origin https://github.com/yourname/rum-recycle-quiz.git
git push -u origin main
```

※ 初回push時にGitHubのユーザー名とPersonal Access Token（パスワードではない）を求められます。
   トークンは https://github.com/settings/tokens で発行できます（`repo` スコープにチェック）。

### 方法B：GitHub Desktop（GUI、初心者向け）

1. GitHub Desktop を起動
2. 「File」→「Add Local Repository」→ `RUM資源循環クイズ` フォルダを選択
3. 「create a repository」のリンクをクリック →「Create repository」
4. 上部メニュー「Publish repository」→ Public/Private を選んで公開

---

## ステップ3：Vercel にインポート

1. https://vercel.com/new を開く（GitHubアカウントでログイン）
2. 「Import Git Repository」セクションで、先ほど作成した `rum-recycle-quiz` を選び **Import** をクリック
   （初回はGitHubとの連携承認画面が出るので Authorize）
3. 設定画面で以下を確認（`vercel.json` を含めているのでほぼ自動）
   - **Framework Preset**: `Other`
   - **Build Command**: 空欄のまま
   - **Output Directory**: 空欄のまま（デフォルト）
   - **Install Command**: 空欄のまま
4. 「Deploy」をクリック
5. 30秒〜1分でデプロイ完了。`https://rum-recycle-quiz.vercel.app` のような URL が発行されます

---

## ステップ4：動作確認

発行されたURLを iPad（横向き）と PC で開いて確認：

- HOME画面の「冒険をスタートする！」ボタンが押せる
- ミッション1のドーナツグラフが表示される
- クイズが回答できる
- 結果画面まで遷移する

---

## ステップ5以降：更新方法

`index.html` を編集したら、フォルダ内で以下を実行するだけで本番URLに反映されます。

```bash
git add .
git commit -m "クイズ内容を更新"
git push
```

GitHub Desktop の場合は「Commit to main」→「Push origin」をクリック。
Vercel が自動的に検知し、1分以内に最新版が公開されます。

---

## トラブルシューティング

| 症状 | 対処 |
| --- | --- |
| `git push` で認証エラー | Personal Access Token を発行して使用（パスワード認証は廃止済み） |
| Vercelで「No Output Directory」エラー | `vercel.json` がコミットされているか確認 |
| 音が鳴らない | iPad/iPhoneは初回タップ後に音が出る仕様。意図通り |
| グラフが表示されない | ネットワーク接続を確認（Tailwind/Chart.jsはCDN読み込み） |

---

## 任意：独自ドメインを設定したくなったら

Vercelプロジェクトの「Settings」→「Domains」で `quiz.rum-alliance.jp` のような独自ドメインを追加できます。
DNSのCNAMEレコードを `cname.vercel-dns.com` に向けるだけで設定完了します。
