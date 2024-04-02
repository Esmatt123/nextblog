import { MongoClient } from "mongodb";

async function handler(req, res){
    if(req.method === 'POST'){
        const {email, name, message} = req.body

        if(!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === ''){
            res.status(422).json({message: 'invalid input.'})
            return;
        }

        const newMessage = {
            email,
            name,
            message
        }

        let client;

        const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.cffbidw.mongodb.net/${process.env.mongodb_collectionName}?retryWrites=true&w=majority&appName=${process.env.mongodb_clusterName}`

        try {
             client = await MongoClient.connect(connectionString)
        } catch (error) {
            res.status(500).json('Could not connect to database')
            return
        }

        
        try {
            const db = client.db()
        const result = await db.collection('messages').insertOne(newMessage)
        newMessage.id = result.insertedId 
        
        res.status(201).json({message: 'Successfully stored message!'})
        } catch (error) {
            client.close()
            res.status(500).json('Could not insert into to database')
            return
        }

       
        client.close()
       

       
    }
}

export default handler;