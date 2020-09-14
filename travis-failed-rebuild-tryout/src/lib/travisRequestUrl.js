const travisRequestUrl = ( repo_slug ) => `http://api.travis-ci.com/repo/${repo_slug}/requests`


module.exports = {
  travisRequestUrl
}