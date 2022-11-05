import { Grid, Pagination, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import fileService from "../../services/file.service";
import Categories from "./categories";
import File from "./file";
import SearchBar from "./searchBar";

export default function FileRepository() {

    const session = useSession()
    const router = useRouter()

    const [files, setFiles] = useState([])
    const [pagination, setPagination] = useState({
        "pageSize": 25,
        "pageCount": 1,
        "total": 5
    })
    const [page, setPage] = useState(1)
    const [selectedPath, setSelectedPath] = useState('/')
    const [searchPattern, setSearchPattern] = useState('')

    const handleSearchChanged = (e) => {
        setSearchPattern(e.target.value)
    }

    const handlePageChange = (event, value) => {
        setPage(value)
    };

    useEffect(() => {
        if (session.status === 'authenticated') {
            fileService.getFiles({ path: selectedPath, locale: router.locale, searchPattern: searchPattern }, page, session.data.jwt).then((f) => {
                setFiles(f.files)
                setPagination(f.pagination)
            })
        }
    }, [selectedPath, router, page , searchPattern])



    return (
        <Grid container spacing={2}>
            <Grid item xs={3} md={3}>
                <SearchBar value={searchPattern} handleChange={handleSearchChanged}></SearchBar>
                <Categories path={selectedPath} handleSelectionChanged={setSelectedPath} > </Categories>
            </Grid>
            <Grid item sx={3} md={9} >
                <Grid container spacing={2} padding={4}>
                    {files.map((value, index) => (
                        <File key={index} file={value}></File>
                    ))}
                </Grid>
                < Grid container alignItems={'right'} justifyContent={"right"} >
                    <Pagination count={pagination.pageCount} page={page} onChange={handlePageChange} />
                </Grid >
            </Grid>
        </Grid>
    )


}