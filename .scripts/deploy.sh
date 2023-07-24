set -e

echo "Deployment started!"

#Pull the latest verison
git pull origin master
echo "New changes coppied to server!"

echo "Installing dependencies..."
cd /api
npm install --yes

#Build command
echo "Project Build"
npm run build

echo "Deployment finished"
