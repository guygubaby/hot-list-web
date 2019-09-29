imageName=guygubaby/hotlist-web:latest

# yarn
# yarn build
docker build -t $imageName .
docker push
echo "ok :)"