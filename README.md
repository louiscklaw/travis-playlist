# travis tryout playlist

### build status
[![Build Status](https://travis-ci.com/louiscklaw/travis-playlist.svg?branch=develop)](https://travis-ci.com/louiscklaw/travis-playlist)

### travis build address
https://travis-ci.org/louiscklaw/travis-playlist

### if you want to run travis build locally
```
instance: travis-job-cb15e1b9-976a-4c9d-8f4e-c4f1a52da40a travis-ci-sardonyx-xenial-1553530528-f909ac5

travis-ci-sardonyx-xenial-1553530528-f909ac5

BUILDID="build-$RANDOM"
INSTANCE="travisci/ci-garnet:packer-1512502276-986baf0"

docker run --name $BUILDID -dit $INSTANCE /sbin/init
docker exec -it $BUILDID bash -l

# Now you are now inside your Travis environment. Run su - travis to begin.


```