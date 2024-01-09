import { VerifiableCredential, PresentationExchange } from '@web5/credentials'
import { DidKeyMethod, DidDhtMethod, DidIonMethod } from '@web5/dids'
import { Web5 } from '@web5/api'


const { web5, did: userDid } = await Web5.connect('did:ion:EiDiU8lQFW0PhT1batcVJ3Xi1McU7pGxWZELwK7z0qFw2Q:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiWTFuRjNlVjRkX3ZuWlpxaXNJdmlEOG5ZNk5RX1pFTFJORXBkVEROZXBEdyJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiI3cHJuVEJJWVd5X2FuTE9VTVNQMEEzVEhkOFhPeU9iVXNybHptazRRemFrIiwieSI6IkxrRHJKZGNFVU9EY3ZuN3R2dzJZQmh0ZGpPcW1STDREdkdnVUZXUUF1RVEifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMiIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNCJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlDT1hCWlNxWlVEeXBrUDBHd2I4T1JTN3dCWnVnTko1UDN4WUxDMGtyU1RrZyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQlhVaDFaajBBMWNld2M0Qjl2cDFjM1E0eTdiYkw0Nmh1QXZnQ1FCTDAtZ3ciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUJtMzNDUDMyamROYmtXQVI3VkRpcDdOYUhVSnVoc19Xd0dfZzdoc3ZGbjVnIn19')
console.log(web5)

process.exit()

const employerDid = await DidIonMethod.create()
console.log(employerDid)