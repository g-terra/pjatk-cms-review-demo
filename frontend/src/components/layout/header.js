import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

export default function Header({ content }) {

    const router = useRouter()

    return (
        <React.Fragment>
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
                {content.pages.map((page) => (
                    <Button
                        color="inherit"
                        key={page.title}
                        variant='text'
                        onClick={() => { router.push(page.path) }}>
                        {page.title}
                    </Button>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}

