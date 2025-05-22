const {MongoClient} = require('mongodb')

const URL = 'mongodb+srv://glnitingautam:IcJjtxUM9eo5QuNP@cluster0.bktzyor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const client = new MongoClient(URL)

const dbName = 'testUser'
const collectionName = 'UserCollection'

async function main() {
    await client.connect()
    console.log('connection sucessfull');
    const db = client.db(dbName)
    const collection = db.collection(collectionName)
    return 'done'
}

main().then(console.log).catch(console.error).finally(()=>client.close())