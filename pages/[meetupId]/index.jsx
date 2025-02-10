//our-website.com/[meetupId]
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";

export default function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://realwuangphan0102:CswSEXe3e1qMIqS3@cluster0.0yfp5.mongodb.net/meetup?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetup");

  const meetups = await meetupCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://realwuangphan0102:CswSEXe3e1qMIqS3@cluster0.0yfp5.mongodb.net/meetup?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetup");

  const selectedMeetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}
