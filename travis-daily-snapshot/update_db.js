#!/usr/bin/env node

const fs = require('fs')
const process = require('process')
const Hubdb = require('hubdb')

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const TEST_DB ='branch_fail_statistics.json'
const BUILD_FAILED_LIST_DB='build_failed_list.json'

const {translateToKey, translateToNames} = require('./db_keys')

var db = Hubdb({
  token: GITHUB_TOKEN,
  username: 'louiscklaw',
  repo: 'travis-playlist',
  branch: 'db'
  });


function addRecord(content){
  db.get(TEST_DB,(err, current_contents)=>{
    if (err) throw err

    var obj_to_insert = translateToKey(content)
    var updated_content = [...current_contents,obj_to_insert]

    db.update(TEST_DB,updated_content,(err, result, id) => {
      if (err) throw err
      console.log('update done')
    })
  })

}

function updateBuildFaliledList(build_failed_list){
  db.update(BUILD_FAILED_LIST_DB, build_failed_list, (err, result, id)=> {
    if (err) throw err
  })
}

module.exports={
  addRecord,
  updateBuildFaliledList
}