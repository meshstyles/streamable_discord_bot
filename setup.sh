echo "experimental setup script for a debian based linux distro"
sudo apt install nodejs
npm install
cp botconfig_sample.json botconfig.json
echo replace the token and run $ node index