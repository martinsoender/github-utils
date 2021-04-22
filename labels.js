/**
 * Creates the default set of labels for a new repository
 * Usage:
 * 1. Acquire a valid access token:
 * 1.1. Open in browser: https://github.com/login/oauth/authorize?client_id=<app-client-id>
 *      &scope=repo&state=<random-string>&redirect_uri=http://localhost/callback
 * 1.2. Copy code from callback URL: http://localhost/callback&code=<code>
 * 1.3. Retrieve access token: curl -X POST https://github.com/login/oauth/access_token?client_id=<app-client-id>
 *      &client_secret=<app-client-secret>&redirect_uri=http://localhost/callback
 *      &code=<code>&state=<same-random-string>
 * 1.4. Copy access token from response: access_token=<access-token>%20token_type=bearer
 * 2. Run: TOKEN=<access-token> ORG=blazarcapital REPO=<repository> node labels.js
 *
 * https://github.com/organizations/<organisation_name/settings/applications/937507 (app-client-id/secret)
 * https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps
 */
const request = require('request-promise-native')

const ENV = {...process.env}
const ORG = ENV.ORG
const REPO = ENV.REPO
const TOKEN = ENV.TOKEN

const COLORS = {
  red: 'F09296',
  blue: '7FA3F5',
  brown: 'E3CAB2',
  olive: 'C4D9DB',
  green: 'A8DBA8',
  yellow: 'FCF0B8',
  purple: 'CAA4F5',
  gray: 'E8E8E8'
}

const LABELS = [
  // Kind
  {
    name: 'Kind: Epic',
    color: COLORS.purple
  },
  {
    name: 'Kind: Bug :bug:',
    color: COLORS.red
  },
  {
    name: 'Kind: Change Request',
    color: COLORS.blue
  },
  {
    name: 'Kind: Enhancement',
    color: COLORS.blue
  },
  {
    name: 'Kind: Feature Request',
    color: COLORS.blue
  },
  // Priority
  {
    name: 'Priority: Fast Track :zap:',
    color: COLORS.brown
  },
  {
    name: 'Priority: High :rotating_light:',
    color: COLORS.red
  },
  {
    name: 'Priority: Low',
    color: COLORS.brown
  },
  {
    name: 'Priority: Normal',
    color: COLORS.brown
  },
  // Size
  {
    name: 'Size: Extra Large',
    color: COLORS.red
  },
  {
    name: 'Size: Large',
    color: COLORS.olive
  },
  {
    name: 'Size: Medium',
    color: COLORS.olive
  },
  {
    name: 'Size: Small',
    color: COLORS.olive
  },
  // Stage
  {
    name: 'Stage: Marked for Deletion',
    color: COLORS.gray
  },
  {
    name: 'Stage: Needs Investigation',
    color: COLORS.yellow
  },
  {
    name: 'Stage: Needs More Information',
    color: COLORS.yellow
  },
  {
    name: 'Stage: Ready for Development',
    color: COLORS.green
  },
  {
    name: 'Stage: Ready for Review',
    color: COLORS.gray
  }
]

async function createLabels() {
  let requests = []

  LABELS.forEach(label => {
    requests.push(
      request(`https://api.github.com/repos/${ ORG }/${ REPO }/labels`, {
        method: 'POST',
        headers: {
          'accept': 'application/vnd.github.symmetra-preview+json',
          'authorization': 'Bearer ' + TOKEN,
          'user-agent': 'Labels'
        },
        body: JSON.stringify(label)
      })
    )
  })

  Promise.all(requests).then(result => {
    console.log(result)
  }).catch(error => {
    console.error(error)
  })
}

createLabels()
