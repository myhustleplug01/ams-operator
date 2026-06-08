const postgrid =
require('./providers/postgrid')

const click2mail =
require('./providers/click2mail')

const mailform =
require('./providers/mailform')

const lob =
require('./providers/lob')

const postalytics =
require('./providers/postalytics')

const docupost =
require('./providers/docupost')

const mailingonline =
require('./providers/mailingonline')

function getProvider(
providerType
) {

switch (
providerType
) {

case 'postgrid':
  return postgrid

case 'click2mail':
  return click2mail

case 'mailform':
  return mailform

case 'lob':
  return lob

case 'postalytics':
  return postalytics

case 'docupost':
  return docupost

case 'mailingonline':
  return mailingonline

default:
  throw new Error(
    'Unsupported provider'
  )

}

}

module.exports = {

getProvider

}