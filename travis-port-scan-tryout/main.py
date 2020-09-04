
import pyfiglet
import os, sys

import subprocess
import shlex

HOME_IP=os.environ['HOME_IP']
HOME_SSH_PORT=os.environ['HOME_SSH_PORT']

print(subprocess.check_output(shlex.split('nmap -sC {} -p {}'.format(HOME_IP, HOME_SSH_PORT))).decode('utf-8'))
