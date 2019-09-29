imageName=guygubaby/hotlist-web:latest

docker build -t $imageName .
docker push
echo "ok :)"