#!/usr/bin/env python3

import os,sys
from pprint import pprint

import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

import time
from page_objects import PageObject, PageElement

class ExamplePO(PageObject):
  uri = 'https://www.example.com'

class ExampleTest(unittest.TestCase):

  def setUp(self):
    # for dev I'll use only visible browser instead of no-gui one.
    # but for production, it will use the no-gui one.
    # self.driver = webdriver.Firefox()
    self.driver = webdriver.Remote(
        command_executor='http://127.0.0.1:4444/wd/hub',
        desired_capabilities={'browserName': 'firefox', 'javascriptEnabled': True}
    )

  def test_visit(self):
    example_com_root = ExamplePO(self.driver)
    self.driver.get(example_com_root.uri)

    assert "Example Domain" in self.driver.title


if __name__ == "__main__":
    unittest.main()