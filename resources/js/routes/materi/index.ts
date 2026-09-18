import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\MateriController::store
* @see app/Http/Controllers/MateriController.php:12
* @route '/{org}/kegiatan/{kegiatan}/materi'
*/
export const store = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{org}/kegiatan/{kegiatan}/materi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MateriController::store
* @see app/Http/Controllers/MateriController.php:12
* @route '/{org}/kegiatan/{kegiatan}/materi'
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
* @see \App\Http\Controllers\MateriController::store
* @see app/Http/Controllers/MateriController.php:12
* @route '/{org}/kegiatan/{kegiatan}/materi'
*/
store.post = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MateriController::store
* @see app/Http/Controllers/MateriController.php:12
* @route '/{org}/kegiatan/{kegiatan}/materi'
*/
const storeForm = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MateriController::store
* @see app/Http/Controllers/MateriController.php:12
* @route '/{org}/kegiatan/{kegiatan}/materi'
*/
storeForm.post = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\MateriController::update
* @see app/Http/Controllers/MateriController.php:28
* @route '/{org}/materi/{materi}'
*/
export const update = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/{org}/materi/{materi}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MateriController::update
* @see app/Http/Controllers/MateriController.php:28
* @route '/{org}/materi/{materi}'
*/
update.url = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            org: args[0],
            materi: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        org: args.org,
        materi: typeof args.materi === 'object'
        ? args.materi.id
        : args.materi,
    }

    return update.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{materi}', parsedArgs.materi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MateriController::update
* @see app/Http/Controllers/MateriController.php:28
* @route '/{org}/materi/{materi}'
*/
update.put = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MateriController::update
* @see app/Http/Controllers/MateriController.php:28
* @route '/{org}/materi/{materi}'
*/
const updateForm = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MateriController::update
* @see app/Http/Controllers/MateriController.php:28
* @route '/{org}/materi/{materi}'
*/
updateForm.put = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\MateriController::destroy
* @see app/Http/Controllers/MateriController.php:41
* @route '/{org}/materi/{materi}'
*/
export const destroy = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{org}/materi/{materi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MateriController::destroy
* @see app/Http/Controllers/MateriController.php:41
* @route '/{org}/materi/{materi}'
*/
destroy.url = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            org: args[0],
            materi: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        org: args.org,
        materi: typeof args.materi === 'object'
        ? args.materi.id
        : args.materi,
    }

    return destroy.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{materi}', parsedArgs.materi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MateriController::destroy
* @see app/Http/Controllers/MateriController.php:41
* @route '/{org}/materi/{materi}'
*/
destroy.delete = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\MateriController::destroy
* @see app/Http/Controllers/MateriController.php:41
* @route '/{org}/materi/{materi}'
*/
const destroyForm = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MateriController::destroy
* @see app/Http/Controllers/MateriController.php:41
* @route '/{org}/materi/{materi}'
*/
destroyForm.delete = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\MateriController::up
* @see app/Http/Controllers/MateriController.php:56
* @route '/{org}/materi/{materi}/up'
*/
export const up = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: up.url(args, options),
    method: 'patch',
})

up.definition = {
    methods: ["patch"],
    url: '/{org}/materi/{materi}/up',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\MateriController::up
* @see app/Http/Controllers/MateriController.php:56
* @route '/{org}/materi/{materi}/up'
*/
up.url = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            org: args[0],
            materi: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        org: args.org,
        materi: typeof args.materi === 'object'
        ? args.materi.id
        : args.materi,
    }

    return up.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{materi}', parsedArgs.materi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MateriController::up
* @see app/Http/Controllers/MateriController.php:56
* @route '/{org}/materi/{materi}/up'
*/
up.patch = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: up.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MateriController::up
* @see app/Http/Controllers/MateriController.php:56
* @route '/{org}/materi/{materi}/up'
*/
const upForm = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: up.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MateriController::up
* @see app/Http/Controllers/MateriController.php:56
* @route '/{org}/materi/{materi}/up'
*/
upForm.patch = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: up.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

up.form = upForm

/**
* @see \App\Http\Controllers\MateriController::down
* @see app/Http/Controllers/MateriController.php:71
* @route '/{org}/materi/{materi}/down'
*/
export const down = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: down.url(args, options),
    method: 'patch',
})

down.definition = {
    methods: ["patch"],
    url: '/{org}/materi/{materi}/down',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\MateriController::down
* @see app/Http/Controllers/MateriController.php:71
* @route '/{org}/materi/{materi}/down'
*/
down.url = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            org: args[0],
            materi: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        org: args.org,
        materi: typeof args.materi === 'object'
        ? args.materi.id
        : args.materi,
    }

    return down.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{materi}', parsedArgs.materi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MateriController::down
* @see app/Http/Controllers/MateriController.php:71
* @route '/{org}/materi/{materi}/down'
*/
down.patch = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: down.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MateriController::down
* @see app/Http/Controllers/MateriController.php:71
* @route '/{org}/materi/{materi}/down'
*/
const downForm = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: down.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MateriController::down
* @see app/Http/Controllers/MateriController.php:71
* @route '/{org}/materi/{materi}/down'
*/
downForm.patch = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: down.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

down.form = downForm

const materi = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    up: Object.assign(up, up),
    down: Object.assign(down, down),
}

export default materi