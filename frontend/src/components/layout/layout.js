import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from './header.js';
import { LayoutContextProvider, useLayoutContext } from '../../context/layout.context.js';
import UserControlBar from './userControlBar.js';
import Footer from './footer.js';
import { Alert } from '../utils/alert.js';


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

    const [header, setHeader] = useState({
        title: "",
        pages: [],
        membershipPages: []
    })

    const [footer, setFooter] = useState({
        pages: [],
        social: []
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


    useEffect(() => {
        if (context?.data?.footer) {
            const data = {
                pages: context.data.footer.pages,
                social: context.data.footer.social,
            }
            setFooter(data)
        }
    }, [context])

    return (
            <Container maxWidth="lg">
                <UserControlBar>
                    <Header content={header} />
                    <Container sx={{
                        minHeight: '60vh',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        {children}
                    </Container>
                    <Footer content={footer} />
                </UserControlBar>
            </Container>
    )
}
