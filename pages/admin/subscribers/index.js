import Layout from '../../../components/layout';
import Head from 'next/head';
import { getAllSubscriptions } from '../../../lib/database/queries/subscription';
import { useRouter } from 'next/router';
import {useState} from "react"

export default function AdminSubscribers({ subscribers }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(null);

  const toggleBan = async (email) => {
    try {
      if (isUpdating) {
        return;
      }
      setIsUpdating(email);
      const response = await fetch('/api/ban', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to update subscriber status');
      }

      // Reload the page to fetch fresh data
      router.reload();
    } catch (error) {
      console.error('Error updating subscriber status:', error);
      alert('Failed to update subscriber status');
    }
  };

  return (
    <Layout>
      <Head>
        <title>Admin: Email suscriptos</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Emails suscriptos</h1>
      <span>Tocar en <b>Deshabilitar</b> va a excluir a esa persona del newsletter.</span>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-1/4">Nombre</th>
              <th className="w-1/4">Email</th>
              <th className="w-1/4">Fecha de suscripción</th>
              <th className="w-1/4">Acción</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber, index) => (
              <tr key={index} className={`${!subscriber.enabled ? 'bg-error bg-opacity-50' : 'hover'}`}>
                <td>{subscriber.name}</td>
                <td>
                  <div className="tooltip" data-tip={subscriber.email}>
                    {subscriber.email.length > 24
                      ? subscriber.email.slice(0, 24) + '..'
                      : subscriber.email}
                  </div>
                </td>
                <td>{subscriber.createdAt}</td>
                <td>
                  {isUpdating === subscriber.email ? 
                    <span className="loading loading-spinner loading-xs"></span> :
                    <button
                      className={`btn btn-sm ${subscriber.enabled ? 'btn-error' : 'btn-primary'}`}
                      onClick={() => toggleBan(subscriber.email)}
                    >
                      {subscriber.enabled ? 'Deshabilitar' : 'Habilitar'}
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
        enabled: subscriber.enabled === undefined ? true : subscriber.enabled,
        name: subscriber.name,
      })),
    },
  };
}
