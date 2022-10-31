import { useRouter } from 'next/router'
import Layout from '../../src/components/layout/layout'

const Post = () => {
  const router = useRouter()
  const { pid } = router.query

  return <Layout>
    <p>Post: {pid}</p>
  </Layout>
}

export default Post