```markdown
# Todo-for-coding-interview

このプロジェクトは、ReactフロントエンドとNode.jsバックエンドを使用したTodoアプリケーションです。Dockerを利用してバックエンドを簡単に起動することができます。

---

## プロジェクト概要
- **フロントエンド**: Reactを使用して構築
- **バックエンド**: Node.jsで構築
- **データストレージ**: JSONファイルを使用してタスクを永続化
- **Docker**: バックエンドサーバーをコンテナ化

---

## ディレクトリ構造
```
.
├── todo-backend/      # バックエンド（Node.js）
├── todo-frontend/     # フロントエンド（React）
└── README.md          # この説明書
```

---

## システム要件
以下のツールがインストールされている必要があります：
- **Node.js** (v16以上)
- **npm**
- **Docker**
- **Docker Compose**

---

## サーバーの起動方法

### 1. バックエンドの起動
バックエンドはDockerを使用して起動します。

1. `todo-backend` ディレクトリに移動します：
   ```bash
   cd todo-backend
   ```

2. Dockerイメージをビルドします：
   ```bash
   docker-compose build
   ```

3. Dockerコンテナを起動します：
   ```bash
   docker-compose up
   ```

4. 以下のURLでバックエンドが動作していることを確認します：
   ```
   http://localhost:8080/api/v1/tasks
   ```

5. コンテナを停止する場合は以下を実行します：
   ```bash
   docker-compose down
   ```

---

### 2. フロントエンドの起動
フロントエンドはReactで構築されており、npmを使用して起動します。

1. `todo-frontend` ディレクトリに移動します：
   ```bash
   cd ../todo-frontend
   ```

2. 依存関係をインストールします：
   ```bash
   npm install
   ```

3. アプリを起動します：
   ```bash
   npm start
   ```

4. ブラウザで以下のURLを開きます：
   ```
   http://localhost:3000
   ```

---

## 注意事項
- フロントエンドがバックエンドと通信するには、バックエンドが`http://localhost:8080`で起動している必要があります。
- 必要に応じて`todo-frontend/src/api/tasks.js`でバックエンドのURLを変更できます。

---

## ライセンス
このプロジェクトは自由に使用、改変、再配布できます。
```
