version=${1:-latest}

docker build -t asi/showroom .
docker tag asi/showroom docker-repository.asi-rennes.fr:8083/asi/showroom:$version
docker push docker-repository.asi-rennes.fr:8083/asi/showroom:$version
