//our-domain.com/
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Meetups Page</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

//Server-side handle the props
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// Will dectect by Next and pre-render the props and then the UI
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://realwuangphan0102:CswSEXe3e1qMIqS3@cluster0.0yfp5.mongodb.net/meetup?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetup");

  const meetups = await meetupCollection.find().toArray();

  client.close();

  console.log("Fetching data from MonogoDB");

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, //revalidating page every 10 seconds,
  };
}
