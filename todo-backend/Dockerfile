FROM node:16

# 作業ディレクトリを設定
WORKDIR /app

# 必要なファイルをコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# サーバーを起動
CMD ["node", "index.js"]

EXPOSE 8080
