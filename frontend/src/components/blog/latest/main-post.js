import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import componentLocales from '../../componentLocales';
import { useAppLocaleContext } from '../../../context/appLocale.context';

const CMS_RESOURCES = process.env.CMS_RESOURCES

function MainFeaturedPost(props) {

    const { post } = props;

    const router = useRouter()

    const context = useAppLocaleContext()


    const imgUrl = `${CMS_RESOURCES}${post.content.image.formats.large.url}`

    return (
        <Paper
            sx={{
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
            {<img style={{ display: 'none' }} src={imgUrl} alt={post.content.image_text} />}

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            <Grid container>
                <Grid item md={6}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: { xs: 3, md: 6 },
                            pr: { md: 0 },
                        }}
                    >
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {post.content.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '3',
                            WebkitBoxOrient: 'vertical',
                        }} paragraph>
                            {post.content.description}
                        </Typography>
                        <Button variant='outlined' onClick={() => { router.push(`/posts/${post.content.slug}`) }}>
                            {context.locale[componentLocales.post.main.label.more]}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}



export default MainFeaturedPost;