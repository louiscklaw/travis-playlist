let production = process.env.NODE_ENV == 'production'

let MAX_GITHUB_PAGE_TO_FETCH=production ? 6 : 0

export  {
  MAX_GITHUB_PAGE_TO_FETCH
}