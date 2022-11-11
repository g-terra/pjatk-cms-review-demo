import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { lightBlue, deepPurple } from "@mui/material/colors";
import { Box } from "@mui/system";
import Download from '@mui/icons-material/FileDownload';
import Info from '@mui/icons-material/InfoOutlined';
import Image from "next/image";
import axios from "axios";



const CMS_RESOURCES = process.env.CMS_RESOURCES


export default function File({ file }) {
    return (
        <Grid item>
            <Card sx={{ maxWidth: 345, width: 175 }}>

                <Grid container alignItems={'center'} justifyContent={'center'}>
                    {getFileThumbnail(file)}
                </Grid>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {file.name}
                    </Typography>


                </CardContent>
                <CardActions>
                    <Grid container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center">
                        <Button onClick={() => {
                            download(`${CMS_RESOURCES}${file.url}`, file.actualName)
                        }} size="small">Download</Button>
                        <Tooltip title={file.description}>
                            <IconButton><Info></Info></IconButton>
                        </Tooltip>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
}

function download(path, filename) {
    // download file using axios

    axios.get(path, {
        responseType: 'blob'
    }).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    );


}



function getFileThumbnail(file) {

    const imgUrl = `${CMS_RESOURCES}${file.url}`


    if (file.format.includes('image')) {
        return (
            <Box sx={{ margin: 1.6 }}>
                <Image

                    width={100}
                    height={100}
                    style={{ borderRadius: '50%' }}
                    src={imgUrl}
                    alt={file.name} />
            </Box>

        )
    } else {
        return (<Avatar sx={{ margin: 2, bgcolor: lightBlue[500], width: 100, height: 100 }}>{file?.format ? file.format.split('/').pop() : <Download />}</Avatar>)


    }
}

