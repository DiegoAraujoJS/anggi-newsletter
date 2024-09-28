import Layout from '../../../components/layout';
import Head from 'next/head';
import { getAllSubscriptions } from '../../../lib/database/queries/subscription';

export default function AdminSubscribers({ subscribers }) {
  return (
    <Layout>
      <Head>
        <title>Admin: Email suscriptos</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Emails suscriptos</h1>
      <ul className="list-disc list-inside">
        {subscribers.map((subscriber, index) => (
          <li key={index} className="mb-2">
            {subscriber.email} - Se subscribió el: {subscriber.createdAt}
          </li>
        ))}
      </ul>
    </Layout>
  );
}

function formatDate(date) {
  if (isNaN(date.getTime())) {
    return 'Unknown Date';
  }
  return `${padZero(date.getDate())}/${padZero(date.getMonth() + 1)}/${date.getFullYear()}`;
}

function padZero(num) {
  return num.toString().padStart(2, '0');
}

export async function getServerSideProps(context) {
  const { req } = context;
  const isAdmin = req.cookies.adminPassword === process.env.ADMIN_PASSWORD;

  if (!isAdmin) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const subscribers = await getAllSubscriptions();

  return {
    props: {
      subscribers: subscribers.map((subscriber) => ({
        email: subscriber.email,
        createdAt: formatDate(subscriber._id.getTimestamp()),
      })),
    },
  };
}
