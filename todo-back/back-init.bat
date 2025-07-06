@echo off
start cmd /k "pnpm init && pnpm i -D typescript ts-node nodemon @types/express @types/cors && pnpm i express cors"

mkdir src
mkdir dist
mkdir public

echo {^
  "compilerOptions": {^
    "target": "ES2019",^
    "module": "commonjs",^
    "outDir": "dist",^
    "rootDir": "src",^
    "strict": true,^
    "esModuleInterop": true^
  },^
  "include": ["src"]^
} > tsconfig.json

echo import express from "express"; > src\index.ts
echo import cors from "cors";>> src\index.ts
echo const app = express();>> src\index.ts
echo app.use(cors());>> src\index.ts
echo app.use(express.json());>> src\index.ts
echo app.use(express.static("public"));>> src\index.ts
echo app.listen(3000, () =^> ^{>> src\index.ts
echo.  console.log("http://localhost:3000");>> src\index.ts
echo });>> src\index.ts

echo ^<html^>^<body^>Hello Todo^</body^>^</html^> > public\index.html
code .

echo init completed > README.md
echo express ^+ TS > README.md