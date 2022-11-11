import * as React from 'react';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/lab';
import fileService from '../../services/file.service';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button, Grid } from '@mui/material';
import StyledTreeItem from '../utils/tree-view/treeItem';
import { useAppLocaleContext } from '../../context/appLocale.context';
import componentLocales from '../componentLocales';

export default function Categories({ handleSelectionChanged, path }) {
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const [categories, setCategories] = React.useState({ id: -1, name: '', subs: [], search: (id, parent) => "" })
    const session = useSession()
    const router = useRouter()
    const { locale } = useAppLocaleContext()

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const ids = []

    const handleExpandClick = () => {
        setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? ids : [],
        );
    };


    const handleSelect = (event, nodeIds) => {

        const path = categories.search(nodeIds[0], categories);
        const fixedPath = path.length ? `/${path.join('/')}/` : '/'
        console.log(fixedPath);
        handleSelectionChanged(fixedPath)
        setSelected(nodeIds);
    };



    React.useEffect(() => {
        if (session.status === 'authenticated') {
            fileService.getPaths(router.locale, session.data.jwt).then(
                (res) => {
                    setCategories(res)
                }
            )
        }

    }, [session, router.locale])



    function CategoryItem({ category }) {
        ids.push(`${category.id}`)
        return (
            <StyledTreeItem nodeId={`${category.id}`} labelText={category.name} key={category.id}>
                {
                    category.subs.map(
                        (s) => {
                            return CategoryItem({ category: s })
                        })
                }
            </StyledTreeItem>
        )
    }



    return (
        <Box sx={{ flexGrow: 1, minWidth: 200, overflowY: 'auto' }} >
            <Box sx={{ mb: 1 }}>
                <Button onClick={handleExpandClick}>
                    {expanded.length === 0 ? locale[componentLocales.files.categories.expand] : locale[componentLocales.files.categories.collapse]}
                </Button>
            </Box>
            <TreeView
                aria-label="controlled"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
                multiSelect
            >
                {[categories].map((c, index) => {
                    return <CategoryItem key={index} category={c} />
                })}
            </TreeView>
        </Box >
    );
}


