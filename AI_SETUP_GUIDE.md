# AI機能（エコ博士）セットアップ手順書

このアプリには Google Gemini API を使った「エコ博士」機能が組み込まれています。
**APIキーをHTMLに直接書くと公開リポジトリで丸見えになり、第三者に悪用されて高額請求される事故** が頻発します。
そのため、Vercel Serverless Function（`/api/gemini.mjs`）が中継役となり、APIキーは **Vercel の環境変数** に保管します。

```
[ブラウザ] → [/api/gemini]（Serverless Function）→ [Google Gemini API]
                       ↑
                 ここで環境変数からAPIキーを使う（外部から見えない）
```

---

## ステップ1：Gemini APIキーを取得

1. https://aistudio.google.com/app/apikey にアクセス
2. Googleアカウントでログイン（Workspaceアカウント可）
3. 「Create API key」をクリック
4. プロジェクトを選ぶか新規作成（既存でOK）
5. 表示されたAPIキー（`AIza...` で始まる文字列）を **コピーして安全な場所に控える**
   - ⚠️ このキーは画面を閉じると再表示されません。必要なら直後に **1Password / KeePass などのパスワード管理ツール** に保存
   - ⚠️ メールやチャットで共有しない、ソースコードに書かない、スクリーンショットを残さない

### 任意：無料枠を超えないよう請求アラートを設定

Google AI Studio の無料枠は寛容ですが、念のため Google Cloud Console の「Billing」→「Budgets & alerts」で、月額3ドルなど低めのアラートを設定しておくと安心です。

---

## ステップ2：Vercel に環境変数を設定

1. https://vercel.com/carlvainshq-1994s-projects/rum-recycle-quiz/settings/environment-variables を開く
2. 「Add New」をクリック
3. 以下を入力
   - **Key**: `GEMINI_API_KEY`
   - **Value**: ステップ1で取得したAPIキー（`AIza...`）
   - **Environment**: `Production` `Preview` `Development` すべてにチェック
4. 「Save」をクリック

---

## ステップ3：コードをGitHubに反映

このプロジェクトのフォルダには既に以下のファイルが揃っています：

- `api/gemini.mjs` ... Serverless Function（新規）
- `index.html` ... `callGemini()` を `/api/gemini` 経由に修正済み

これらを GitHub にアップロードします。

### Webアップロードの場合

1. https://github.com/car-lvains/rum-recycle-quiz/upload/main を開く
2. ローカルの `index.html` をドラッグ&ドロップ（既存ファイルを上書き）
3. **重要**：`api` フォルダは「ファイル名に `api/gemini.mjs` と入力」する形でアップロードする必要があります
   - 「choose your files」をクリックして `api/gemini.mjs` を選択
   - アップロード後、ファイル名欄を `api/gemini.mjs` に書き換える（GitHubはこの記法でフォルダ階層を作れる）
4. コミットメッセージ：`AI機能をServerless Function化`
5. 「Commit changes」

### より簡単な方法：ブラウザの代わりにフォルダごとドラッグ

1. https://github.com/car-lvains/rum-recycle-quiz/upload/main を開く
2. **エクスプローラーで `api` フォルダごと** ドラッグ&ドロップ
3. GitHub が自動的に `api/gemini.mjs` として認識
4. 同時に `index.html` もドラッグ&ドロップ
5. コミット

---

## ステップ4：自動デプロイの確認

1. https://vercel.com/carlvainshq-1994s-projects/rum-recycle-quiz/deployments を開く
2. 最新デプロイの Status が「Ready」になるのを待つ（30秒〜1分）
3. https://rum-recycle-quiz.vercel.app にアクセス
4. ミッション1〜5の「✨ 解説」ボタンや、自由質問機能を試してみる
5. エコ博士が応答すれば成功！

---

## トラブルシューティング

| 症状 | 原因と対処 |
| --- | --- |
| 「通信エラーだよ。」が出る | Vercel環境変数が未設定の可能性。ステップ2を確認 |
| Vercelダッシュボードでビルドエラー | `api/gemini.mjs` が正しい場所にあるか確認 |
| API応答が異常に遅い | Geminiの無料枠レート制限の可能性。少し時間を空ける |
| エラー詳細を見たい | Vercel ダッシュボードの該当デプロイ → 「Functions」タブでログ確認 |

---

## セキュリティのおさらい

✅ **やってよいこと**
- Vercel環境変数にAPIキーを保存する
- Serverless Function 内で環境変数経由で利用する
- リポジトリは Public のままでOK（キーが含まれていないので）

❌ **絶対にやってはいけないこと**
- `index.html` 等のクライアント側コードにAPIキーを書く
- READMEや手順書にAPIキー実物を書く
- Slack / メール / チャットでAPIキーを送る
- スクリーンショットにAPIキーが写った状態で共有する

万が一APIキーが漏れた場合は、即座に https://aistudio.google.com/app/apikey でキーを **削除（Revoke）** し、新しいキーを発行してVercelの環境変数を更新してください。
