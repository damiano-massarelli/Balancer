echo -e "1. Build executables\n"
./build.sh

echo -e "2. Build & push images\n"
docker-compose build

echo -e "3. Push images\n"
docker-compose push