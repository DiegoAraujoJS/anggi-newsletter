import Layout from '../../components/layout';
import { useEffect, useState } from 'react';
import { getPost } from '../../lib/database/queries/posts';
import PostBody from '../../components/post';

export default function Post({id, title, date, body}) {

  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Layout>
      <PostBody title={title} body={body} date={isClient ? new Date(date).toLocaleDateString() : null}/>
    </Layout>
  );
}

export async function getServerSideProps({params}) {
  const id = params.id
  return {
    props: await getPost(id)
  }
}
