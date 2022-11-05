import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getCsrfToken, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { alertService } from '../../src/services/alert.service';
import Layout from '../../src/components/layout/layout';
import componentLocales from '../../src/components/componentLocales';
import { useAppLocaleContext } from '../../src/context/appLocale.context';

export default function SignIn({ csrfToken }) {

    const session = useSession();
    const router = useRouter();

    if (session?.status === 'authenticated') {
        router.push('/')
    }

    const [locale, setLocale] = React.useState({})

    const context = useAppLocaleContext()

    React.useEffect(() => {
        setLocale(context.locale)
    })


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        await signIn('credentials', {
            redirect: false,
            email: data.get('email'),
            password: data.get('password'),
            csrfToken: data.get('csrfToken'),
            callbackUrl: `${window.location.origin}`,
        }).then(({ ok }) => {
            if (ok) {
                router.push("/")
            } else {
                alertService.error(`Credentials do not match!`);
            }
        }).catch(e => {
            alertService.error(e);
        });

    };

    return (
        <Layout>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {locale[componentLocales.pages.signIn.title]}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username / Email"
                            name="email"
                            autoFocus
                            InputLabelProps={{ shrink: true }}

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            InputLabelProps={{ shrink: true }}

                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {locale[componentLocales.button.signIn]}
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link onClick={() => { router.push(`/user/register`) }} variant="body2">
                                    {locale[componentLocales.label.dont_have_account]}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Layout>

    );
}



// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}

