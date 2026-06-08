const axios =
require('axios')

async function
validateAccount(
provider
) {

return true

}

async function
sendLetter(
provider,
payload
) {

return {

success: true,

provider:
'postalytics',

payload

}

}

async function
getStatus(
provider,
letterId
) {

return {

status:
'pending'

}

}

module.exports = {

validateAccount,

sendLetter,

getStatus

}