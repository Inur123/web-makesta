import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PesertaController::create
* @see app/Http/Controllers/PesertaController.php:17
* @route '/{org}/kegiatan/{kegiatan}/peserta/create'
*/
export const create = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/{org}/kegiatan/{kegiatan}/peserta/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PesertaController::create
* @see app/Http/Controllers/PesertaController.php:17
* @route '/{org}/kegiatan/{kegiatan}/peserta/create'
*/
create.url = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{kegiatan}', parsedArgs.kegiatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PesertaController::create
* @see app/Http/Controllers/PesertaController.php:17
* @route '/{org}/kegiatan/{kegiatan}/peserta/create'
*/
create.get = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PesertaController::create
* @see app/Http/Controllers/PesertaController.php:17
* @route '/{org}/kegiatan/{kegiatan}/peserta/create'
*/
create.head = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PesertaController::create
* @see app/Http/Controllers/PesertaController.php:17
* @route '/{org}/kegiatan/{kegiatan}/peserta/create'
*/
const createForm = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PesertaController::create
* @see app/Http/Controllers/PesertaController.php:17
* @route '/{org}/kegiatan/{kegiatan}/peserta/create'
*/
createForm.get = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PesertaController::create
* @see app/Http/Controllers/PesertaController.php:17
* @route '/{org}/kegiatan/{kegiatan}/peserta/create'
*/
createForm.head = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PesertaController::show
* @see app/Http/Controllers/PesertaController.php:61
* @route '/{org}/kegiatan/{kegiatan}/peserta/{peserta}'
*/
export const show = (args: { org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } } | [org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{org}/kegiatan/{kegiatan}/peserta/{peserta}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PesertaController::show
* @see app/Http/Controllers/PesertaController.php:61
* @route '/{org}/kegiatan/{kegiatan}/peserta/{peserta}'
*/
show.url = (args: { org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } } | [org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            org: args[0],
            kegiatan: args[1],
            peserta: args[2],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        org: args.org,
        kegiatan: typeof args.kegiatan === 'object'
        ? args.kegiatan.id
        : args.kegiatan,
        peserta: typeof args.peserta === 'object'
        ? args.peserta.id
        : args.peserta,
    }

    return show.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{kegiatan}', parsedArgs.kegiatan.toString())
            .replace('{peserta}', parsedArgs.peserta.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PesertaController::show
* @see app/Http/Controllers/PesertaController.php:61
* @route '/{org}/kegiatan/{kegiatan}/peserta/{peserta}'
*/
show.get = (args: { org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } } | [org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PesertaController::show
* @see app/Http/Controllers/PesertaController.php:61
* @route '/{org}/kegiatan/{kegiatan}/peserta/{peserta}'
*/
show.head = (args: { org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } } | [org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PesertaController::show
* @see app/Http/Controllers/PesertaController.php:61
* @route '/{org}/kegiatan/{kegiatan}/peserta/{peserta}'
*/
const showForm = (args: { org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } } | [org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PesertaController::show
* @see app/Http/Controllers/PesertaController.php:61
* @route '/{org}/kegiatan/{kegiatan}/peserta/{peserta}'
*/
showForm.get = (args: { org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } } | [org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PesertaController::show
* @see app/Http/Controllers/PesertaController.php:61
* @route '/{org}/kegiatan/{kegiatan}/peserta/{peserta}'
*/
showForm.head = (args: { org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } } | [org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PesertaController::store
* @see app/Http/Controllers/PesertaController.php:29
* @route '/{org}/kegiatan/{kegiatan}/peserta'
*/
export const store = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{org}/kegiatan/{kegiatan}/peserta',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PesertaController::store
* @see app/Http/Controllers/PesertaController.php:29
* @route '/{org}/kegiatan/{kegiatan}/peserta'
*/
store.url = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{kegiatan}', parsedArgs.kegiatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PesertaController::store
* @see app/Http/Controllers/PesertaController.php:29
* @route '/{org}/kegiatan/{kegiatan}/peserta'
*/
store.post = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PesertaController::store
* @see app/Http/Controllers/PesertaController.php:29
* @route '/{org}/kegiatan/{kegiatan}/peserta'
*/
const storeForm = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PesertaController::store
* @see app/Http/Controllers/PesertaController.php:29
* @route '/{org}/kegiatan/{kegiatan}/peserta'
*/
storeForm.post = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\PesertaController::edit
* @see app/Http/Controllers/PesertaController.php:79
* @route '/{org}/kegiatan/{kegiatan}/peserta/{peserta}/edit'
*/
export const edit = (args: { org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } } | [org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/{org}/kegiatan/{kegiatan}/peserta/{peserta}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PesertaController::edit
* @see app/Http/Controllers/PesertaController.php:79
* @route '/{org}/kegiatan/{kegiatan}/peserta/{peserta}/edit'
*/
edit.url = (args: { org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } } | [org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            org: args[0],
            kegiatan: args[1],
            peserta: args[2],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        org: args.org,
        kegiatan: typeof args.kegiatan === 'object'
        ? args.kegiatan.id
        : args.kegiatan,
        peserta: typeof args.peserta === 'object'
        ? args.peserta.id
        : args.peserta,
    }

    return edit.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{kegiatan}', parsedArgs.kegiatan.toString())
            .replace('{peserta}', parsedArgs.peserta.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PesertaController::edit
* @see app/Http/Controllers/PesertaController.php:79
* @route '/{org}/kegiatan/{kegiatan}/peserta/{peserta}/edit'
*/
edit.get = (args: { org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } } | [org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PesertaController::edit
* @see app/Http/Controllers/PesertaController.php:79
* @route '/{org}/kegiatan/{kegiatan}/peserta/{peserta}/edit'
*/
edit.head = (args: { org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } } | [org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PesertaController::edit
* @see app/Http/Controllers/PesertaController.php:79
* @route '/{org}/kegiatan/{kegiatan}/peserta/{peserta}/edit'
*/
const editForm = (args: { org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } } | [org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PesertaController::edit
* @see app/Http/Controllers/PesertaController.php:79
* @route '/{org}/kegiatan/{kegiatan}/peserta/{peserta}/edit'
*/
editForm.get = (args: { org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } } | [org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PesertaController::edit
* @see app/Http/Controllers/PesertaController.php:79
* @route '/{org}/kegiatan/{kegiatan}/peserta/{peserta}/edit'
*/
editForm.head = (args: { org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } } | [org: string | number, kegiatan: string | { id: string }, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PesertaController::update
* @see app/Http/Controllers/PesertaController.php:97
* @route '/{org}/peserta/{peserta}'
*/
export const update = (args: { org: string | number, peserta: string | { id: string } } | [org: string | number, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/{org}/peserta/{peserta}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PesertaController::update
* @see app/Http/Controllers/PesertaController.php:97
* @route '/{org}/peserta/{peserta}'
*/
update.url = (args: { org: string | number, peserta: string | { id: string } } | [org: string | number, peserta: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            org: args[0],
            peserta: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        org: args.org,
        peserta: typeof args.peserta === 'object'
        ? args.peserta.id
        : args.peserta,
    }

    return update.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{peserta}', parsedArgs.peserta.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PesertaController::update
* @see app/Http/Controllers/PesertaController.php:97
* @route '/{org}/peserta/{peserta}'
*/
update.put = (args: { org: string | number, peserta: string | { id: string } } | [org: string | number, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PesertaController::update
* @see app/Http/Controllers/PesertaController.php:97
* @route '/{org}/peserta/{peserta}'
*/
const updateForm = (args: { org: string | number, peserta: string | { id: string } } | [org: string | number, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PesertaController::update
* @see app/Http/Controllers/PesertaController.php:97
* @route '/{org}/peserta/{peserta}'
*/
updateForm.put = (args: { org: string | number, peserta: string | { id: string } } | [org: string | number, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\PesertaController::destroy
* @see app/Http/Controllers/PesertaController.php:130
* @route '/{org}/peserta/{peserta}'
*/
export const destroy = (args: { org: string | number, peserta: string | { id: string } } | [org: string | number, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{org}/peserta/{peserta}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PesertaController::destroy
* @see app/Http/Controllers/PesertaController.php:130
* @route '/{org}/peserta/{peserta}'
*/
destroy.url = (args: { org: string | number, peserta: string | { id: string } } | [org: string | number, peserta: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            org: args[0],
            peserta: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        org: args.org,
        peserta: typeof args.peserta === 'object'
        ? args.peserta.id
        : args.peserta,
    }

    return destroy.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{peserta}', parsedArgs.peserta.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PesertaController::destroy
* @see app/Http/Controllers/PesertaController.php:130
* @route '/{org}/peserta/{peserta}'
*/
destroy.delete = (args: { org: string | number, peserta: string | { id: string } } | [org: string | number, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PesertaController::destroy
* @see app/Http/Controllers/PesertaController.php:130
* @route '/{org}/peserta/{peserta}'
*/
const destroyForm = (args: { org: string | number, peserta: string | { id: string } } | [org: string | number, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PesertaController::destroy
* @see app/Http/Controllers/PesertaController.php:130
* @route '/{org}/peserta/{peserta}'
*/
destroyForm.delete = (args: { org: string | number, peserta: string | { id: string } } | [org: string | number, peserta: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const peserta = {
    create: Object.assign(create, create),
    show: Object.assign(show, show),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default peserta