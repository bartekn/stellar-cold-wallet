rm -r dist
mkdir -p dist/stellar-cold-wallet-linux-arm/lib
mkdir cache

if ! [ -f ./cache/electron-v0.35.4-linux-arm.zip ]; then
  curl -L -o ./cache/electron-v0.35.4-linux-arm.zip "https://github.com/atom/electron/releases/download/v0.35.4/electron-v0.35.4-linux-arm.zip"
fi

unzip ./cache/electron-v0.35.4-linux-arm.zip -d dist/stellar-cold-wallet-linux-arm/lib

rm -r dist/stellar-cold-wallet-linux-arm/lib/resources/default_app
mkdir dist/stellar-cold-wallet-linux-arm/lib/resources/app
cp -r index.js package.json app node_modules dist/stellar-cold-wallet-linux-arm/lib/resources/app

cd dist
echo "./lib/electron" > stellar-cold-wallet-linux-arm/stellar-cold-wallet
chmod +x stellar-cold-wallet-linux-arm/stellar-cold-wallet

zip -r -X stellar-cold-wallet-linux-arm.zip stellar-cold-wallet-linux-arm/
rm -r stellar-cold-wallet-linux-arm
