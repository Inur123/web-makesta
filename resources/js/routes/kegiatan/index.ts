import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\KegiatanController::index
* @see app/Http/Controllers/KegiatanController.php:19
* @route '/{org}/kegiatan'
*/
export const index = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{org}/kegiatan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KegiatanController::index
* @see app/Http/Controllers/KegiatanController.php:19
* @route '/{org}/kegiatan'
*/
index.url = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { org: args }
    }

    if (Array.isArray(args)) {
        args = {
            org: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        org: args.org,
    }

    return index.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KegiatanController::index
* @see app/Http/Controllers/KegiatanController.php:19
* @route '/{org}/kegiatan'
*/
index.get = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KegiatanController::index
* @see app/Http/Controllers/KegiatanController.php:19
* @route '/{org}/kegiatan'
*/
index.head = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KegiatanController::index
* @see app/Http/Controllers/KegiatanController.php:19
* @route '/{org}/kegiatan'
*/
const indexForm = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KegiatanController::index
* @see app/Http/Controllers/KegiatanController.php:19
* @route '/{org}/kegiatan'
*/
indexForm.get = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KegiatanController::index
* @see app/Http/Controllers/KegiatanController.php:19
* @route '/{org}/kegiatan'
*/
indexForm.head = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\KegiatanController::create
* @see app/Http/Controllers/KegiatanController.php:53
* @route '/{org}/kegiatan/create'
*/
export const create = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/{org}/kegiatan/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KegiatanController::create
* @see app/Http/Controllers/KegiatanController.php:53
* @route '/{org}/kegiatan/create'
*/
create.url = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { org: args }
    }

    if (Array.isArray(args)) {
        args = {
            org: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        org: args.org,
    }

    return create.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KegiatanController::create
* @see app/Http/Controllers/KegiatanController.php:53
* @route '/{org}/kegiatan/create'
*/
create.get = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KegiatanController::create
* @see app/Http/Controllers/KegiatanController.php:53
* @route '/{org}/kegiatan/create'
*/
create.head = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KegiatanController::create
* @see app/Http/Controllers/KegiatanController.php:53
* @route '/{org}/kegiatan/create'
*/
const createForm = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KegiatanController::create
* @see app/Http/Controllers/KegiatanController.php:53
* @route '/{org}/kegiatan/create'
*/
createForm.get = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KegiatanController::create
* @see app/Http/Controllers/KegiatanController.php:53
* @route '/{org}/kegiatan/create'
*/
createForm.head = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\KegiatanController::store
* @see app/Http/Controllers/KegiatanController.php:60
* @route '/{org}/kegiatan'
*/
export const store = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{org}/kegiatan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KegiatanController::store
* @see app/Http/Controllers/KegiatanController.php:60
* @route '/{org}/kegiatan'
*/
store.url = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { org: args }
    }

    if (Array.isArray(args)) {
        args = {
            org: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        org: args.org,
    }

    return store.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KegiatanController::store
* @see app/Http/Controllers/KegiatanController.php:60
* @route '/{org}/kegiatan'
*/
store.post = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KegiatanController::store
* @see app/Http/Controllers/KegiatanController.php:60
* @route '/{org}/kegiatan'
*/
const storeForm = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KegiatanController::store
* @see app/Http/Controllers/KegiatanController.php:60
* @route '/{org}/kegiatan'
*/
storeForm.post = (args: { org: string | number } | [org: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\KegiatanController::show
* @see app/Http/Controllers/KegiatanController.php:87
* @route '/{org}/kegiatan/{kegiatan}'
*/
export const show = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{org}/kegiatan/{kegiatan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KegiatanController::show
* @see app/Http/Controllers/KegiatanController.php:87
* @route '/{org}/kegiatan/{kegiatan}'
*/
show.url = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            org: args[0],
            kegiatan: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        org: args.org,
        kegiatan: typeof args.kegiatan === 'object'
        ? args.kegiatan.id
        : args.kegiatan,
    }

    return show.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{kegiatan}', parsedArgs.kegiatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KegiatanController::show
* @see app/Http/Controllers/KegiatanController.php:87
* @route '/{org}/kegiatan/{kegiatan}'
*/
show.get = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KegiatanController::show
* @see app/Http/Controllers/KegiatanController.php:87
* @route '/{org}/kegiatan/{kegiatan}'
*/
show.head = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KegiatanController::show
* @see app/Http/Controllers/KegiatanController.php:87
* @route '/{org}/kegiatan/{kegiatan}'
*/
const showForm = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KegiatanController::show
* @see app/Http/Controllers/KegiatanController.php:87
* @route '/{org}/kegiatan/{kegiatan}'
*/
showForm.get = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KegiatanController::show
* @see app/Http/Controllers/KegiatanController.php:87
* @route '/{org}/kegiatan/{kegiatan}'
*/
showForm.head = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\KegiatanController::exportMethod
* @see app/Http/Controllers/KegiatanController.php:154
* @route '/{org}/kegiatan/{kegiatan}/export'
*/
export const exportMethod = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/{org}/kegiatan/{kegiatan}/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KegiatanController::exportMethod
* @see app/Http/Controllers/KegiatanController.php:154
* @route '/{org}/kegiatan/{kegiatan}/export'
*/
exportMethod.url = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            org: args[0],
            kegiatan: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        org: args.org,
        kegiatan: typeof args.kegiatan === 'object'
        ? args.kegiatan.id
        : args.kegiatan,
    }

    return exportMethod.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{kegiatan}', parsedArgs.kegiatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KegiatanController::exportMethod
* @see app/Http/Controllers/KegiatanController.php:154
* @route '/{org}/kegiatan/{kegiatan}/export'
*/
exportMethod.get = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KegiatanController::exportMethod
* @see app/Http/Controllers/KegiatanController.php:154
* @route '/{org}/kegiatan/{kegiatan}/export'
*/
exportMethod.head = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KegiatanController::exportMethod
* @see app/Http/Controllers/KegiatanController.php:154
* @route '/{org}/kegiatan/{kegiatan}/export'
*/
const exportMethodForm = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KegiatanController::exportMethod
* @see app/Http/Controllers/KegiatanController.php:154
* @route '/{org}/kegiatan/{kegiatan}/export'
*/
exportMethodForm.get = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KegiatanController::exportMethod
* @see app/Http/Controllers/KegiatanController.php:154
* @route '/{org}/kegiatan/{kegiatan}/export'
*/
exportMethodForm.head = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportMethod.form = exportMethodForm

/**
* @see \App\Http\Controllers\KegiatanController::sertifikat
* @see app/Http/Controllers/KegiatanController.php:160
* @route '/{org}/kegiatan/{kegiatan}/sertifikat'
*/
export const sertifikat = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sertifikat.url(args, options),
    method: 'post',
})

sertifikat.definition = {
    methods: ["post"],
    url: '/{org}/kegiatan/{kegiatan}/sertifikat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KegiatanController::sertifikat
* @see app/Http/Controllers/KegiatanController.php:160
* @route '/{org}/kegiatan/{kegiatan}/sertifikat'
*/
sertifikat.url = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            org: args[0],
            kegiatan: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        org: args.org,
        kegiatan: typeof args.kegiatan === 'object'
        ? args.kegiatan.id
        : args.kegiatan,
    }

    return sertifikat.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{kegiatan}', parsedArgs.kegiatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KegiatanController::sertifikat
* @see app/Http/Controllers/KegiatanController.php:160
* @route '/{org}/kegiatan/{kegiatan}/sertifikat'
*/
sertifikat.post = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sertifikat.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KegiatanController::sertifikat
* @see app/Http/Controllers/KegiatanController.php:160
* @route '/{org}/kegiatan/{kegiatan}/sertifikat'
*/
const sertifikatForm = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sertifikat.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KegiatanController::sertifikat
* @see app/Http/Controllers/KegiatanController.php:160
* @route '/{org}/kegiatan/{kegiatan}/sertifikat'
*/
sertifikatForm.post = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sertifikat.url(args, options),
    method: 'post',
})

sertifikat.form = sertifikatForm

/**
* @see \App\Http\Controllers\KegiatanController::edit
* @see app/Http/Controllers/KegiatanController.php:102
* @route '/{org}/kegiatan/{kegiatan}/edit'
*/
export const edit = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/{org}/kegiatan/{kegiatan}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KegiatanController::edit
* @see app/Http/Controllers/KegiatanController.php:102
* @route '/{org}/kegiatan/{kegiatan}/edit'
*/
edit.url = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            org: args[0],
            kegiatan: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        org: args.org,
        kegiatan: typeof args.kegiatan === 'object'
        ? args.kegiatan.id
        : args.kegiatan,
    }

    return edit.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{kegiatan}', parsedArgs.kegiatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KegiatanController::edit
* @see app/Http/Controllers/KegiatanController.php:102
* @route '/{org}/kegiatan/{kegiatan}/edit'
*/
edit.get = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KegiatanController::edit
* @see app/Http/Controllers/KegiatanController.php:102
* @route '/{org}/kegiatan/{kegiatan}/edit'
*/
edit.head = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KegiatanController::edit
* @see app/Http/Controllers/KegiatanController.php:102
* @route '/{org}/kegiatan/{kegiatan}/edit'
*/
const editForm = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KegiatanController::edit
* @see app/Http/Controllers/KegiatanController.php:102
* @route '/{org}/kegiatan/{kegiatan}/edit'
*/
editForm.get = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KegiatanController::edit
* @see app/Http/Controllers/KegiatanController.php:102
* @route '/{org}/kegiatan/{kegiatan}/edit'
*/
editForm.head = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\KegiatanController::update
* @see app/Http/Controllers/KegiatanController.php:112
* @route '/{org}/kegiatan/{kegiatan}'
*/
export const update = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/{org}/kegiatan/{kegiatan}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\KegiatanController::update
* @see app/Http/Controllers/KegiatanController.php:112
* @route '/{org}/kegiatan/{kegiatan}'
*/
update.url = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            org: args[0],
            kegiatan: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        org: args.org,
        kegiatan: typeof args.kegiatan === 'object'
        ? args.kegiatan.id
        : args.kegiatan,
    }

    return update.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{kegiatan}', parsedArgs.kegiatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KegiatanController::update
* @see app/Http/Controllers/KegiatanController.php:112
* @route '/{org}/kegiatan/{kegiatan}'
*/
update.put = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\KegiatanController::update
* @see app/Http/Controllers/KegiatanController.php:112
* @route '/{org}/kegiatan/{kegiatan}'
*/
const updateForm = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KegiatanController::update
* @see app/Http/Controllers/KegiatanController.php:112
* @route '/{org}/kegiatan/{kegiatan}'
*/
updateForm.put = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\KegiatanController::destroy
* @see app/Http/Controllers/KegiatanController.php:139
* @route '/{org}/kegiatan/{kegiatan}'
*/
export const destroy = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{org}/kegiatan/{kegiatan}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\KegiatanController::destroy
* @see app/Http/Controllers/KegiatanController.php:139
* @route '/{org}/kegiatan/{kegiatan}'
*/
destroy.url = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            org: args[0],
            kegiatan: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        org: args.org,
        kegiatan: typeof args.kegiatan === 'object'
        ? args.kegiatan.id
        : args.kegiatan,
    }

    return destroy.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{kegiatan}', parsedArgs.kegiatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KegiatanController::destroy
* @see app/Http/Controllers/KegiatanController.php:139
* @route '/{org}/kegiatan/{kegiatan}'
*/
destroy.delete = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\KegiatanController::destroy
* @see app/Http/Controllers/KegiatanController.php:139
* @route '/{org}/kegiatan/{kegiatan}'
*/
const destroyForm = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KegiatanController::destroy
* @see app/Http/Controllers/KegiatanController.php:139
* @route '/{org}/kegiatan/{kegiatan}'
*/
destroyForm.delete = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\KegiatanController::status
* @see app/Http/Controllers/KegiatanController.php:145
* @route '/{org}/kegiatan/{kegiatan}/status'
*/
export const status = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

status.definition = {
    methods: ["patch"],
    url: '/{org}/kegiatan/{kegiatan}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\KegiatanController::status
* @see app/Http/Controllers/KegiatanController.php:145
* @route '/{org}/kegiatan/{kegiatan}/status'
*/
status.url = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            org: args[0],
            kegiatan: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        org: args.org,
        kegiatan: typeof args.kegiatan === 'object'
        ? args.kegiatan.id
        : args.kegiatan,
    }

    return status.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{kegiatan}', parsedArgs.kegiatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KegiatanController::status
* @see app/Http/Controllers/KegiatanController.php:145
* @route '/{org}/kegiatan/{kegiatan}/status'
*/
status.patch = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\KegiatanController::status
* @see app/Http/Controllers/KegiatanController.php:145
* @route '/{org}/kegiatan/{kegiatan}/status'
*/
const statusForm = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KegiatanController::status
* @see app/Http/Controllers/KegiatanController.php:145
* @route '/{org}/kegiatan/{kegiatan}/status'
*/
statusForm.patch = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

status.form = statusForm

const kegiatan = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    export: Object.assign(exportMethod, exportMethod),
    sertifikat: Object.assign(sertifikat, sertifikat),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    status: Object.assign(status, status),
}

export default kegiatan