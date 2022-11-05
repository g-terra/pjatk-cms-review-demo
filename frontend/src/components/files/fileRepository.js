import { Grid, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import fileService from "../../services/file.service";
import Categories from "./categories";

export default function FileRepository() {

    const session = useSession()
    const router = useRouter()

    const [files, setFiles] = useState([])
    const [selectedPath, setSelectedPath] = useState('/')
    const [searchPattern, setSearchPattern] = useState('')

    useEffect(() => {
        if (session.status === 'authenticated') {
            fileService.getFiles({ path: selectedPath, locale: router.locale , searchPattern: searchPattern}, session.data.jwt).then(
                (res) => {
                    setFiles(res.data)
                }
            )
        }
    }, [selectedPath , router])

    return (
        <Grid container direction={'row '}>
            <Grid item>
                <Categories path={selectedPath} handleSelectionChanged={setSelectedPath} > </Categories>
            </Grid>
            <Grid item xs padding={3}>
                {files.map((f) => <Typography>{JSON.stringify(f)}</Typography>)}
            </Grid>
        </Grid>
    )
}