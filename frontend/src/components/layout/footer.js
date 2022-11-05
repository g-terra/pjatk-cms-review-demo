import styled from "@emotion/styled";
import { Box, Button, Container, Divider, Grid, Icon, IconButton, Paper, Toolbar, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppLocaleContext } from "../../context/appLocale.context";
import componentLocales from "../componentLocales";
import IconLink from "../utils/iconLink";

export default function Footer({ content }) {

    const router = useRouter()

    const [locale, setLocale] = useState({})

    const context = useAppLocaleContext()

    useEffect(() => {
        setLocale(context.locale)
    })

    return (

        <Grid marginBottom={3}>
            <Grid container sx={{
                borderTop: 1,
                borderColor: 'divider',
                width: '100',
                paddingTop: '1em',
                marginTop: '1em',
                marginBottom: '1em',
                height: 100,
                justifyContent: 'center'

            }}
            >
                <Grid paddingRight={3} >
                    {content.pages.map((page, index) => {
                        return (
                            <Grid key={index} container alignItems='center' justifyContent='center' paddingTop={1}>
                                <Link href={page.path}>
                                    <Typography variant="body2">
                                        {page.title}
                                    </Typography>
                                </Link>
                            </Grid>
                        )
                    })}
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid paddingLeft={3} >
                    <Typography variant="body2" textAlign='center'>{locale[componentLocales.footer.label.follow_us]}</Typography>
                    <Grid container direction="row" justifyContent='center' alignItems='center'>
                        {content.social.map((icon, index) => {
                            return (
                                <Grid key={index} item padding={1}>
                                    <IconLink
                                        iconDark={icon.icon_light.formats.thumbnail.url}
                                        iconLight={icon.icon_dark.formats.thumbnail.url}
                                        alt={icon.name}
                                        link={icon.link}

                                    />
                                </Grid>
                            )
                        })}
                    </Grid>

                </Grid>
            </Grid>
            <Copyright></Copyright>
        </Grid>

    )











    function Copyright() {
        return (
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="/">
                    Guilherme Terra
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

}






