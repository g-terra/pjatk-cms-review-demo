import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import userService from '../../services/user.service';

export default function Header({ content }) {

    const router = useRouter()
    const session = useSession()
    const [role, setRole] = useState({})

    useEffect(() => {
        
        if (session.status === 'authenticated') {
            userService.info({ token: session.data.jwt })
                .then(res => {
                    setRole(res.value.role.type)
                })
        }
    }, [session.status])


    return (
        <>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    {content.title}
                </Typography>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'center', overflowX: 'auto' }}
            >
                {getHeaderButtons(content.pages, router)}
                {role === 'membership' && getHeaderButtons(content.membershipPages, router)}
            </Toolbar>
        </>
    );
}

function getHeaderButtons(pages, router) {

    return pages?.sort((a, b) => a.precedence_order > b.precedence_order ? 1 : -1).map((page) => (
        <Button
            color="inherit"
            key={page.title}
            variant='text'
            onClick={() => { router.push(page.path); }}>
            {page.title}
        </Button>
    ));
}

