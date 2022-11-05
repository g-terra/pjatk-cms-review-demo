import { useTheme } from "@emotion/react";
import { Link } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";

export default function IconLink({ iconDark, iconLight, alt, link }) {

    const theme = useTheme()

    const imgPath = theme.palette.mode === 'light' ? iconDark : iconLight;

    const imgUrl = `${process.env.CMS_RESOURCES}${imgPath}`;

    return (
        <Box component="span" >
            <Link  href={link}>
                <Image src={imgUrl} width={30} height={30} alt={alt}></Image>
            </Link>
        </Box>
    );

}