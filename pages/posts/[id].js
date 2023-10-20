import Layout from '../../components/layout';
import { useEffect, useState } from 'react';
import { getPost } from '../../lib/database/queries/posts';

export default function Post({id, title, date, body}) {

  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Layout>
      <p className={`bg-primary text-3xl rounded-lg p-2 mb-4`}>
      {title}
      </p>
      {isClient ? new Date(date).toLocaleDateString() : null}
      <div dangerouslySetInnerHTML={{__html: body}}></div>
    </Layout>
  );
}

export async function getServerSideProps({params}) {
  const id = params.id
  return {
    props: await getPost(id)
  }
}
