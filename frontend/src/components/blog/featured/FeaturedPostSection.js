import { Button, Grid } from '@mui/material';
import { Stack } from '@mui/system';
import { useRouter } from 'next/router';
import FeaturedPost from './featured-post';

export default function FeaturedPostSection({ posts, locale }) {


  const router = useRouter()

  return <Stack spacing={2}>
    <Grid container spacing={4}>
      {posts.map((featured, index) => {
        return <FeaturedPost key={index} locale={locale} post={featured}></FeaturedPost>;
      })}
    </Grid>
    <Grid container direction="row" alignItems='center' justifyContent="center">
      <Button variant='outlined' size='large' onClick={()=>router.push('/posts/search')}>More ...</Button>
    </Grid>
  </Stack>;
}
