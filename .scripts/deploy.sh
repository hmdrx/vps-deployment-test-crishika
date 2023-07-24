set -e

echo "Deployment started!"

#Pull the latest verison
sudo git pull origin master
echo "New changes coppied to server!"

echo "Installing dependencies..."
cd /api
sudo npm install --yes

#Build command
echo "Project Build"
sudo npm run build

echo "Deployment finished"
