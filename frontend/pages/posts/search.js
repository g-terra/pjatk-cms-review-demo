import { Grid, Pagination } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import SearchBar from '../../src/components/files/searchBar'
import Layout from '../../src/components/layout/layout'

const Post = () => {

    const [searchPattern, setSearchPattern] = useState('')
    const [pagination, setPagination] = useState({
        "pageSize": 25,
        "pageCount": 1,
        "total": 5
    })
    const [page, setPage] = useState(1)
    const [selectedPath, setSelectedPath] = useState('/')


    const handleSearchChanged = (e) => {
        setSearchPattern(e.target.value)
    }
    const handlePageChange = (event, value) => {
        setPage(value)
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={3} md={3}>
                <SearchBar value={searchPattern} handleChange={handleSearchChanged}></SearchBar>
            </Grid>
            <Grid item sx={3} md={9} >
                <Grid container spacing={2} padding={4} height={'55vh'}>
                </Grid>
                < Grid container alignItems={'right'} justifyContent={"right"} >
                    <Pagination count={pagination.pageCount} page={page} onChange={handlePageChange} />
                </Grid >
            </Grid>
        </Grid>
    )


}

export default Post