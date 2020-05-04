#!/usr/bin/env bash

set -ex

export PATH=/root/.local/bin:$PATH
export LC_ALL=C.UTF-8
export LANG=C.UTF-8

rm -rf /tmp/tmp*
rm -rf /tmp/gh-pages
rm -rf hugo_extended*

cp /host/etc/apt/sources.list.hk /etc/apt/sources.list

# exit 1

apt update
apt install -y git wget sudo
apt install -y python3 python3-pip python3-dev python3-wheel python3-setuptools
python3 -m pip install --user pipenv


TMPDIR=$(mktemp -d)

git clone git@github.com:louiscklaw/travis-playlist.git $TMPDIR

cd $TMPDIR/build-dashboard
  git submodule update --init --recursive themes/minimal
cd -

./scripts/publish.sh

rm -rf $TMPDIR

#done
