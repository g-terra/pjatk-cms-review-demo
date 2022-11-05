import { Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Layout from '../../src/components/layout/layout'
import postService from '../../src/services/post.services'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'

const CMS_RESOURCES = process.env.CMS_RESOURCES


const Post = ({ pid, post }) => {
  const router = useRouter()

  const imgUrl = `${CMS_RESOURCES}${post.image.formats.large.url}`

  return (
    <Layout>
      <Typography variant='h4'>{post.title}</Typography>
      <Paper
        sx={{
          marginTop:3,
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${imgUrl})`,
          height: 300
        }}
      >
        {<img style={{ display: 'none' }} src={imgUrl} alt={post.slug} />}
      </Paper>
      <ReactMarkdown children={post.content}></ReactMarkdown>
    </Layout>
  )
}

export default Post

export async function getServerSideProps(context) {

  const { pid } = context.query;

  console.log(pid);

  const { data } = await postService.getBySlug(pid,context.locale)

  const post = data[0]

  return {
    props: { pid, post },
  };
}