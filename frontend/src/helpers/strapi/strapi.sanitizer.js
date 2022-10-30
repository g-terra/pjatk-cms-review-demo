const sanitizeResults = (response) => {

    if (!response ) {

        console.log("no response");
        return []
    }
    if ( !response.data) {
        console.log("no data");

        return []
    }

    if ( !Array.isArray(response.data)) {
        console.log("not an array");
        return []
    }

    return response.data.map(item => {
        let sanitized = sanitizeObject(item)
        return sanitized
    })
};

const sanitizeObject = (item) => {
    let sanitized = {}
    if (!item || typeof item !== 'object') {
        return sanitized
    }
    for (const [key, value] of Object.entries(item)) {
        if (key === 'id') {
            sanitized[key] = value
        }
        else if (key === 'attributes') {
            for (const [keyAttribute, valueAttribute] of Object.entries(item[key])) {
                if (typeof item[key][keyAttribute] === 'object' && item[key][keyAttribute]) {
                    sanitized[keyAttribute] = sanitizeObject(valueAttribute.data)
                } else {
                    sanitized[keyAttribute] = valueAttribute
                }
            }
        }
    }
    return sanitized
}

export { sanitizeResults, sanitizeObject };
