import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import userService from '../../src/services/user.service';
import { alertService } from '../../src/services/alert.service';
import componentLocales from '../../src/components/componentLocales';
import { useSession } from 'next-auth/react';
import { useAppLocaleContext } from '../../src/context/appLocale.context';
import { useRouter } from 'next/router';
import { Link } from '@mui/material';
import Layout from '../../src/components/layout/layout';


export default function SignUp() {

    const session = useSession()
    const context = useAppLocaleContext()
    const router = useRouter()

    const [locale, setLocale] = React.useState({})


    React.useEffect(() => {
        setLocale(context)
    })


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        userService.register({
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
        }).then((res) => {
            if (res.status === 200) {
                alertService.success('Registration successful', { keepAfterRouteChange: true });
                router.push('/user/login');
            } else {
                alertService.error(res.error.message);
            }
        }
        ).catch(e => {
            alertService.error(e);
        });
    };

    return (
        <Layout>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {locale[componentLocales.pages.signUp.title]}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} autoComplete="off">
                        <Grid container spacing={2} marginTop={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="username"
                                    name="username"
                                    type="text"
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />

                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {locale['button.signup']}
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={() => { router.push('/user/login') }} variant="body2">
                                    {locale['label.already_have_account']}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Layout>
    );
}