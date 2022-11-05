import { Button, Grid } from '@mui/material';
import { Stack } from '@mui/system';
import FeaturedPost from './featured-post';

export default function FeaturedPostSection({ posts, locale }) {

  console.log(JSON.stringify(locale));

  return <Stack spacing={2}>
    <Grid container spacing={4}>
      {posts.map((featured, index) => {
        return <FeaturedPost key={index} locale={locale} post={featured}></FeaturedPost>;
      })}
    </Grid>
    <Grid container direction="row" alignItems='center' justifyContent="center">
      <Button variant='outlined' size='large'>More ...</Button>
    </Grid>
  </Stack>;
}
