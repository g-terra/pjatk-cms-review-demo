module.exports = ({ env }) => ({
    // ..
    'transformer': {
        enabled: true,
        config: {
            prefix: '/api/',
            responseTransforms: {
                removeAttributesKey: true,
                removeDataKey: true,
            }
        }
    },
    publisher: {
        enabled: true,
    },
    "content-versioning": {
        enabled: true,
    },
    "strapi-newsletter": {
        enabled: true
    },
    // ..
    "fuzzy-search": {
        enabled: true,
        config: {
            contentTypes: [
                {
                    uid: "api::user-available-file.user-available-file",
                    modelName: "user-available-file",
                    transliterate: true,
                    fuzzysortOptions: {
                        characterLimit: 300,
                        threshold: -600,
                        limit: 10,
                        keys: [
                            {
                                name: "name",
                                weight: 100,
                            },
                            {
                                name: "description",
                                weight: 100,
                            }
                        ],
                    },
                },
                {
                    uid: "api::post.post",
                    modelName: "post",
                    transliterate: true,
                    fuzzysortOptions: {
                        characterLimit: 300,
                        threshold: -600,
                        limit: 10,
                        keys: [
                            {
                                name: "title",
                                weight: 100,
                            },
                            {
                                name: "description",
                                weight: 100,
                            }
                        ],
                    },
                },
            ],
        },
    },
    "rest-cache": {
        config: {
            provider: {
                name: "memory",
                options: {
                    max: 32767,
                    maxAge: 3600,
                },
            },
            strategy: {
                contentTypes: [
                    // list of Content-Types UID to cache
                    "api::post.post",
                    // "api::component.component",
                    // "api::component-attribute.component-attribute"
                    {
                        contentType: "api::component.component",
                        routes: /* @type {CacheRouteConfig[]} */ [
                          {
                            path: '/api/component', // note that we set the /api prefix here
                            method: 'GET', // can be omitted, defaults to GET
                            hitpass: false, // overrides default hitpass for this route
                            // keys: /* @type {CacheKeysConfig} */ {
                            //   useQueryParams: ['locale'], // use only locale query param for keys
                            // }
                          },
                        ],
                      },

                ],
            },
        },
    },

});
