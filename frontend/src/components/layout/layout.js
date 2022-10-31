import { createTheme, CssBaseline, Grid, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import DarkModeSwitch from '../utils/darkModeSwitch.js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Alert } from '../utils/alert.js';
import Header from './header.js';
import { LayoutContextProvider, useLayoutContext } from '../../context/layout.context.js';
import Themes from '../utils/themes.js';
import DarkModeWrapper from './darkModeWrapper.js';
import UserAuth from './userAuth.js';


export default function Layout({ children }) {

    return (
        <LayoutContextProvider>
            <Content>
                {children}
            </Content>
        </LayoutContextProvider>
    );
}

export function Content({ children }) {

    const context = useLayoutContext()
    const router = useRouter()

    const [header, setHeader] = useState({
        title: "",
        pages: [],
        membershipPages: []
    })

    useEffect(() => {
        if (context?.data?.header) {
            const data = {
                title: context.data.header.Title,
                pages: context.data.header.pages,
                membershipPages: context.data.header.membership_pages,
            }
            setHeader(data)
        }
    }, [context])

    return (
        <DarkModeWrapper>
            <Container maxWidth="lg">
                {
                    !router.asPath.includes("/user/") && <UserAuth />
                }
                <Header content={header} />
                <Container sx={{
                    minHeight: '100vh',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    {children}
                </Container>
            </Container>
        </DarkModeWrapper>
    )
}
