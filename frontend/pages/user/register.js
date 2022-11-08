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
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useTheme } from '@emotion/react';



export default function SignUp({ sitekey }) {

    const session = useSession()
    const context = useAppLocaleContext()
    const router = useRouter()

    const [locale, setLocale] = React.useState({})
    const [token, setToken] = React.useState(null)
    const theme = useTheme()
    const captchaRef = React.useRef(null);




    React.useEffect(() => {
        setLocale(context.locale)
    })


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);


        if (!token) {
            alertService.error('Captcha token required')
            return
        }

        userService.register({
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
            token: token
        }).then((res) => {
            if (res.status === 200) {
                alertService.success('Registration successful', { keepAfterRouteChange: true });
                router.push('/user/login');
            } else {
                resetCaptcha(setToken, captchaRef);
                alertService.error(res.error.message);
            }
        }
        ).catch(e => {
            resetCaptcha(setToken, captchaRef);
            alertService.error(e);
        });
    };

    return (
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
                        <Grid container alignItems={'center'} justifyContent={'center'} xs={12}>
                            <Grid item marginTop={3}>
                                <HCaptcha
                                    sitekey={sitekey}
                                    onVerify={setToken}
                                    onError={() => setToken(null)}
                                    onExpire={() => setToken(null)}
                                    theme={theme.palette.mode === 'dark' ? 'dark' : 'light'}
                                    ref={captchaRef}
                                />
                            </Grid>
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
    );
}



function resetCaptcha(setToken, captchaRef) {
    setToken(null);
    captchaRef.current.resetCaptcha();
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    return {
        props: {
            sitekey: process.env.HCAPTCH_SIDEKEY,
        },
    };
}
