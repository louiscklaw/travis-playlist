#!/bin/bash

BASE_DIR=${PWD}
CACHE_DIR=${PWD}/travis_cache

######################################################################
# Travis CI helpers
######################################################################

start_test()
{
    echo "travis_fold:start:$1"
    echo "=============== $2"
    set -x
}

finish_test()
{
    set +x
    echo "=============== Finished $2"
    echo "travis_fold:end:$1"
}

######################################################################
# Markdown Validation
######################################################################

start_test validate_markdown "Validate Markdown"

cd ${BASE_DIR}

# Validate all markdown files (eg, README.md).
remark -u validate-links --no-stdout --frail .

finish_test validate_markdown "Validate Markdown"
