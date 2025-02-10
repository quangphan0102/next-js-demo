import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://realwuangphan0102:CswSEXe3e1qMIqS3@cluster0.0yfp5.mongodb.net/meetup?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();

    const meetupCollection = db.collection("meetup");

    const result = await meetupCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}
