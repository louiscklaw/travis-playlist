#!/usr/bin/env python3

import os,sys
from pprint import pprint
from subprocess import check_output
from string import Template
from fabric.api import local, lcd
from string import Template

from multiprocessing import Pool

local('hostname')