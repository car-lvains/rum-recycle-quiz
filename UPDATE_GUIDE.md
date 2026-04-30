# 更新（バージョンアップ）手順書

RUM資源循環クイズの本番URL `https://rum-recycle-quiz.vercel.app` を更新する手順をまとめます。

GitHub にコミットされた瞬間に Vercel が自動でビルド・デプロイするため、**GitHubに新しいファイルを入れる作業さえできれば更新完了**です。所要時間は反映まで約1分。

---

## 方法1：GitHub Web UI で直接編集（小さな修正向け・最もカンタン）

クイズの文言・問題・選択肢を少し直したい、READMEを更新したい、といった軽微な修正に最適。ローカルファイルを触る必要なし。

1. https://github.com/car-lvains/rum-recycle-quiz を開く
2. ファイル一覧から編集したいファイル（例：`index.html`）をクリック
3. 右上の鉛筆アイコン（**Edit this file**）をクリック
4. ブラウザ上のエディタで該当箇所を直接編集
5. ページ下部の「Commit changes…」をクリック
6. コミットメッセージを入力（例：`クイズ2の選択肢を修正`）
7. 「Commit changes」をクリック
8. 自動でVercelがビルド開始 → 約1分後に `rum-recycle-quiz.vercel.app` に反映

---

## 方法2：ローカルで編集 → Webアップロードで差し替え（中規模の修正向け）

レイアウトを大きく変える、新しいミッションを追加する、グラフのデータを差し替える、など手元で動作確認しながら直したいときの方法。

1. OneDrive のフォルダ `RUM資源循環クイズ\` 内の `index.html` をエディタで編集
2. ダブルクリックでブラウザで開いて動作確認
3. https://github.com/car-lvains/rum-recycle-quiz/upload/main を開く
4. 編集後の `index.html` をドラッグ&ドロップ（同名ファイルは自動で上書きされます）
5. コミットメッセージを入力
6. 「Commit changes」をクリック
7. 自動デプロイ → 約1分後に反映

---

## 方法3：Git コマンド or GitHub Desktop（本格運用向け）

将来的にチームで運用する、複数ファイルをまとめて変更する、変更履歴をしっかり管理したい、といった段階になったら Git を使うのが王道。

詳細コマンドは `DEPLOY_GUIDE.md` のステップ5を参照。一度ローカルにクローンすれば、以後は以下の3コマンドで更新できる。

```bash
git add .
git commit -m "更新内容のメモ"
git push
```

GitHub Desktop の場合は「Commit to main」→「Push origin」をクリックするだけ。

---

## ロールバック（前のバージョンに戻す）

万が一おかしなバージョンを公開してしまったら、Vercelダッシュボードから即時ロールバック可能。

1. https://vercel.com/carlvainshq-1994s-projects/rum-recycle-quiz を開く
2. 左メニュー「**Deployments**」をクリック
3. 戻したい過去のデプロイ（◯◯時間前のもの）の右にある「⋯」→「**Promote to Production**」をクリック
4. 数秒で本番URLが旧版に戻る

GitHub側の履歴は残ったまま、Vercel側だけ過去版を本番に戻せるので安全。

---

## プレビューデプロイで安全に確認する（任意・上級者向け）

`main` ブランチに直接コミットせず、別ブランチで作業すると、Vercelが**本番URLとは別のプレビューURL**を自動発行する。
本番に影響を出さずに関係者にレビューしてもらえる。

### 手順（GitHub Web UI）

1. ファイル編集画面で通常通り内容を変更
2. コミット時に「**Create a new branch for this commit and start a pull request**」を選択
3. ブランチ名を入力（例：`update-quiz-2`）して「Propose changes」
4. プルリクエスト作成画面に進む
5. 数十秒後、Vercelボットが PR にコメントで **プレビューURL** を貼ってくれる
6. プレビューURLで動作確認 → 問題なければ「Merge pull request」をクリック
7. main にマージされた瞬間、本番URLにも反映

---

## バージョンの目印を残したい場合（任意）

意味のあるアップデート単位（例：v1.1 で問題追加、v2.0 でデザイン刷新）に
**Git tag** を打っておくと後から振り返りやすい。

GitHub Web UI なら：
1. リポジトリページ右側の「Releases」→「Create a new release」
2. 「Choose a tag」で `v1.1` のような名前を新規作成
3. リリースノートに変更内容を記述して「Publish release」

これで「いつ・何を変えたか」が残り、Vercelダッシュボードでも該当デプロイを特定しやすくなる。

---

## トラブル時のチェックリスト

| 症状 | 確認ポイント |
| --- | --- |
| コミットしたのに本番に反映されない | Vercelダッシュボードの「Deployments」で最新ビルドのステータスを確認（Failed なら Build Logs を見る） |
| 表示が崩れた | ブラウザのキャッシュをクリア（Ctrl+Shift+R で強制リロード） |
| 音が出ない | iPad/iPhoneは初回タップ後に音が出る仕様。意図通り |
| 過去版に戻したい | 上記「ロールバック」を参照 |

---

## まとめ

- 軽い修正は **方法1（GitHub Web編集）** が最速
- 動作確認しながら直したいときは **方法2（ローカル編集→アップロード）**
- いざとなれば Vercel の **Promote to Production** で旧版に即復帰可能

公開URL：https://rum-recycle-quiz.vercel.app
GitHub：https://github.com/car-lvains/rum-recycle-quiz
Vercel：https://vercel.com/carlvainshq-1994s-projects/rum-recycle-quiz
