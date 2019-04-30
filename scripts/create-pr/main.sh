#! /bin/bash

#  Copyright © 2019 CDAP
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.

# https://stackoverflow.com/questions/34405047/how-do-you-merge-into-another-branch-using-travis-with-git-commands

FILE_TO_CHECK=${FILE_TO_CHECK:-$TRAVIS_BUILD_DIR/data/en/plugins_list.json}
PULL_REQUEST_NAME=${PULL_REQUEST_NAME:-"Add new plugins"}
COMMIT_MSG=${COMMIT_MSG:-"Update plugins list"}
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

build_head=""

setup_git_branches() {
    # Keep track of where Travis put us.
    # We are on a detached head, and we need to be able to go back to it.
    build_head=$(git rev-parse HEAD)

    # Fetch all the remote branches. Travis clones with `--depth`, which
    # implies `--single-branch`, so we need to overwrite remote.origin.fetch to
    # do that.
    git config --replace-all remote.origin.fetch +refs/heads/*:refs/remotes/origin/*
    git fetch

    # create the tacking branches
    for branch in $(git branch -r|grep -v HEAD) ; do
        git checkout -qf ${branch#origin/}
    done
}

make_pr() {
    echo "check if current build is a pull request build"
    if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
        echo "this build is already a pull request one"
        exit 0
    fi

    echo "check if current branch is master"
    if [ "$TRAVIS_BRANCH" == "$MASTER_BRANCH" ]; then
        echo "skipping pull request from master to master"
        exit 0
    fi


    echo "stash changes"
    git stash

    echo "checkout master branch"
    git checkout -qf $MASTER_BRANCH

    echo "unstash changes"
    git stash pop

    echo "create new branch"
    git checkout -b plugins-pr-$TRAVIS_BUILD_NUMBER

    echo "commit new changes"
    git commit -am "$COMMIT_MSG"

    echo "open pull request"
    hub pull-request -m "$PULL_REQUEST_NAME" --base=$MASTER_BRANCH
}

checkout_build() {
    echo "checking out build head"
    git checkout -qf ${build_head}
}

diff=$(git diff HEAD~1 -- "$FILE_TO_CHECK")
if [ -z "$diff" ]; then
    echo "$FILE_TO_CHECK file was not changed"
else
    echo "$FILE_TO_CHECK file was updated, making pull request"
    setup_git_branches
    make_pr
    checkout_build
fi
