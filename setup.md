npm init -y
npm install express

typescript:
npm install typescript @types/node @types/express --save-dev
npx tsc --init


"scripts": {
    "build": "tsc",
    "devStart": "tsc && node dist/index.js"
}