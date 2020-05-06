#!/usr/bin/env bash

set -ex


rm -rf /tmp/louiscklaw/ubuntu_install_batch

cd /tmp

  git clone --depth=50 --branch=test/init-travis-build-merger  https://github.com/louiscklaw/ubuntu_install_batch.git louiscklaw/ubuntu_install_batch

  cd louiscklaw/ubuntu_install_batch

    git submodule update --init --recursive

  cd ../..

cd /home/logic/_workspace/travis-playlist

rm -rf /tmp/louiscklaw/ubuntu_install_batch
