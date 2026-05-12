## Setup The Project 
1. mkdir generate-keypair
2. cd generate-keypair
3. npm init -y
4. npm install @solana/web3.js @solana-developers/helpers dotenv
5. npm install -D typescript ts-node @types/node
6. npm audit fix --force
7. npx tsc --init
```bash
// Then replace the tsconfig.json with:
"
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}
"
```

