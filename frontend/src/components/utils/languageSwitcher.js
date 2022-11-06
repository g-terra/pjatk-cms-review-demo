import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAppLocaleContext } from '../../context/appLocale.context';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
    const router = useRouter()

    const available = ['en', 'pt-BR']

    const [language, setLanguage] = useState('en');


    const handleChange = (event) => {
        setLanguage(event.target.value);
    };

    useEffect(() => {
        router.push(router.asPath, router.asPath, { locale: language })
    }, [language])

    useEffect(() => {
        setLanguage(router.locale)
    }, [router.locale])


    return (
        <Box >
             <FormControl variant="standard" sx={{ m: 1, minWidth: 70 }}>
                <Select
                    id="lang"
                    value={language}
                    onChange={handleChange}
                    defaultValue = "en"
                >

                    {
                        available.map((a, i) => <MenuItem key={a} value={a}>{a}</MenuItem>)
                    }

                </Select>
            </FormControl>
        </Box>
    );
}
