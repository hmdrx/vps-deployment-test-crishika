set -e

echo "Deployment started!"

#Pull the latest verison
git pull origin master
echo "New changes coppied to server!"

echo "Installing dependencies..."
cd /api
npm install --yes

echo "Deployment finished"
