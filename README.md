# Claire's List

A 90s loving friend wanted a website where people can easily share their things,
so I thought this would be a wonderful time to experiment with a brutalist
framework.

The page is fairly simple. You create a page, add what you want to it, and
send a copy of the url to friends so they can view and add their own items.

### Prerequisites:

```
 docker
 docker-compose
 npm
 ```

### Installation:

download files
```
git clone https://github.com/wintermutestoothache/claireslist.git
```
navigate to directory, build with docker-compose, and spin up backend
```
cd claireslist
docker-compose -f docker-compose-dev.yml up -d --build
docker-compose -f docker-compose-dev.yml exec backend python manage.py recreate_db
```
navigate to services/client and build react frontend
```
cd services/client
npm install --save
export REACT_APP_BACKEND=http://localhost:5001
```
Spin up the frontend and navigate to http://localhost:3000
```
npm start
```
