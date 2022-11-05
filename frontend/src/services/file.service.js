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


const getFiles = async (filters , token) => {

    const search = {
        locale: filters.locale,
        filters: {
            $and: [
                {
                    file_paths: {
                        path: {
                            $startsWith: filters.path
                        }
                    },
                    name: {
                        $contains: filters.searchPattern
                    }
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

    return response.value

}

const fileService = {
    getPaths, getFiles
}


export default fileService