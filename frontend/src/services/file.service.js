import cms from "./cms.service"


const getPaths = async (locale, token) => {

    const search = {
        locale: locale,
        fields: ['path']
    }

    const authHeader = {
        headers: {
            Authorization:
                `Bearer ${token}`,
        },
    }

    const response = await cms.provider.get(cms.endpoints.filePaths, search, authHeader)



    const paths = response.value.data.map((data) => {

        let value = data.path

        if (value.startsWith('/')) {
            value = value.substring(1);
        }

        if (value.endsWith('/')) {
            value = value.slice(0, -1);

        }

        return value

    })



    return constructTree(paths)

}

function constructTree(paths) {
    let result = [];
    let level = { result };
    let id = 0

    paths.forEach((path, i) => {
        path.split('/').reduce((r, name, j, a) => {
            if (!r[name]) {
                r[name] = { result: [] };
                id++
                r.result.push({ id, name, subs: r[name].result })
            }

            return r[name];
        }, level)
    })
    return { id: 0, name: 'Home', subs: result, search: _searchTree }
}


function _searchTree(nodeId, parent) {
    const stack = [[parent, []]];

    while (stack.length) {
        const [node, path] = stack.pop();

        if (node.id == nodeId) {
            return path;
        }
        if (node.subs) {
            stack.push(...node.subs.map((node, i) => [node, [...path, node.name]]));
        }
    }
}


const getFiles = async (filters, page, token) => {

    const search = {
        locale: filters.locale,
        pagination: {
            page: page,
            pageSize:12,
        },
        populate: '*',
        filters: {
            $or: [
                {
                    file_paths: {
                        path: {
                            $startsWith: filters.path
                        }
                    },
                    $or: [
                        {
                            name: {
                                $contains: filters.searchPattern
                            }
                        },
                        {
                            description: {
                                $contains: filters.searchPattern
                            }
                        }
                    ]
                }
            ]

        }
    }

    const authHeader = {
        headers: {
            Authorization:
                `Bearer ${token}`,
        },
    }

    const response = await cms.provider.get(cms.endpoints.userAvailableFiles, search, authHeader)


    return { files: response.value.data.map(fileMapper), pagination: response.value.meta.pagination }

}


function fileMapper(item) {

    const result = {
        name: item.name,
        description: item.description,
        format: item.file[0].mime,
        url: ''
    }

    if (result.format.includes('image')) {
        result.thumbnail = item.file[0]?.formats.thumbnail.url

        if (item.file[0]?.formats?.large) {
            result.url = item.file[0].formats.large.url
        } else if (item.file?.formats?.medium) {
            result.url = item.file[0].formats.medium.url
        } else {
            result.url = item.file[0].formats.small.url
        }
    } else {
        result.url = item.file[0].url
    }

    return result



}

const fileService = {
    getPaths, getFiles
}


export default fileService