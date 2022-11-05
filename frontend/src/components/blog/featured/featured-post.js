import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import componentLocales from '../../componentLocales';
import { useRouter } from 'next/router';
import { height } from '@mui/system';
import { useAppLocaleContext } from '../../../context/appLocale.context';

const CMS_RESOURCES = process.env.CMS_RESOURCES



function FeaturedPost(props) {
    const { post } = props;

    const context = useAppLocaleContext()

    const router = useRouter()

    const date = new Date(post.content.createdAt).toLocaleString(router.locale, { year: "numeric", month: "short", day: "numeric" })

    const imgUrl = `${CMS_RESOURCES}${post.content.image?.formats?.small.url}`

    return (
        <Grid item xs={12} md={6} >
            <CardActionArea component="a" href="#">
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 ,width: '70%' }}>
                        <Typography component="h2" variant="h5">
                            {post.content.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {date}
                        </Typography>
                        <Typography variant="subtitle1" sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                        }} paragraph>
                            {post.content.description}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                            {context.locale[componentLocales.post.featured.label.more]}
                        </Typography>
                    </CardContent>
                    {<CardMedia
                        component="img"
                        sx={{  width:'30%' , height: 200, display: { xs: 'none', sm: 'block' } }}
                        image={imgUrl}
                        alt={post.imageLabel}
                    />}
                </Card>
            </CardActionArea>
        </Grid>
    );
}



export default FeaturedPost;