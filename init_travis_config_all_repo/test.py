#!/usr/bin/env bash


import os,sys
from fabric.api import local, lcd, run, settings
from pprint import pprint

f_repo_list = open('/home/logic/_workspace/travis-playlist/init_travis_config_all_repo/repo_list.txt','r')
repo_list= list(map(lambda x: x.strip(), f_repo_list.readlines()))

def add_travis_config(current_repo):
  # /tmp
  # ➜ cd /tmp/tmp.Jc11xHOkNN
  TMP_DIR = local('mktemp -d', capture=True)

  with lcd(TMP_DIR):
    print("processing {}".format(current_repo))
    # /tmp/tmp.Jc11xHOkNN
    # ➜ git clone git@github.com:louiscklaw/12V_power_supply_tryout.git
    # Cloning into '12V_power_supply_tryout'...
    # remote: Enumerating objects: 17, done.
    # remote: Total 17 (delta 0), reused 0 (delta 0), pack-reused 17
    # Receiving objects: 100% (17/17), 75.80 KiB | 319.00 KiB/s, done.
    # Resolving deltas: 100% (4/4), done.
    local('git clone git@github.com:louiscklaw/{}.git'.format(current_repo))

    # /tmp/tmp.Jc11xHOkNN took 4s
    # ➜ ls -la
    # total 120
    # drwx------    3 logic logic   4096 May  5 12:54 .
    # drwxrwxrwt 1034 root  root  110592 May  5 12:54 ..
    # drwxr-xr-x    3 logic logic   4096 May  5 12:54 12V_power_supply_tryout

    # /tmp/tmp.Jc11xHOkNN
    # ➜ cd 12V_power_supply_tryout
    with lcd('{}/{}'.format(TMP_DIR, current_repo)):
      if not os.path.exists('{}/{}/.travis.yml'.format(TMP_DIR, current_repo)):
        local('git flow init -d -f')
        local('git checkout develop')
        local('git push --set-upstream origin develop')


        # 12V_power_supply_tryout on  master
        # ➜ cp /home/logic/_workspace/travis-playlist/init_travis_config_all_repo/.travis.yml.default .travis.yml
        local('cp /home/logic/_workspace/travis-playlist/init_travis_config_all_repo/.travis.yml.default .travis.yml')

        # 12V_power_supply_tryout on  master [?]
        # ➜ gst
        # On branch master
        # Your branch is up to date with 'origin/master'.

        # Untracked files:
        #   (use "git add <file>..." to include in what will be committed)
        # 	.travis.yml
        # nothing added to commit but untracked files present (use "git add" to track)
        local('git status')

        # 12V_power_supply_tryout on  master [?]
        # ➜ gco -b test/init-travis-build-merger
        # Switched to a new branch 'test/init-travis-build-merger'
        local('git checkout -b test/init-travis-build-merger')

        local('python3 /home/logic/_workspace/.gen_travis_token.py')
        local('git add credentials.yml')
        local('git commit credentials.yml -m"ci: init travis token,"')

        # 12V_power_supply_tryout on  test/init-travis-build-merger [?]
        # ➜ ga .travis.yml
        local('git add .travis.yml')
        local('git commit .travis.yml -m"ci: init travis build config,"')

        # 12V_power_supply_tryout on  test/init-travis-build-merger [+]
        # ➜ git push --set-upstream origin test/init-travis-build-merger
        # Total 0 (delta 0), reused 0 (delta 0)
        # remote:
        # remote: Create a pull request for 'test/init-travis-build-merger' on GitHub by visiting:
        # remote:      https://github.com/louiscklaw/12V_power_supply_tryout/pull/new/test/init-travis-build-merger
        # remote:
        # To github.com:louiscklaw/12V_power_supply_tryout.git
        #  * [new branch]      test/init-travis-build-merger -> test/init-travis-build-merger
        # Branch 'test/init-travis-build-merger' set up to track remote branch 'test/init-travis-build-merger' from 'origin'.
        local('git push -f --set-upstream origin test/init-travis-build-merger')

      else:
        print('travis file found, skipping')

  # git@github.com:louiscklaw/12V_power_supply_tryout.git
  local('rm -rf {}'.format(TMP_DIR))

if __name__=="__main__":
  for repo_name in repo_list:
    add_travis_config(repo_name)
