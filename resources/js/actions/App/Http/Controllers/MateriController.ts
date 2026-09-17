import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MateriController::store
* @see app/Http/Controllers/MateriController.php:11
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
* @see app/Http/Controllers/MateriController.php:11
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
* @see app/Http/Controllers/MateriController.php:11
* @route '/{org}/kegiatan/{kegiatan}/materi'
*/
store.post = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MateriController::store
* @see app/Http/Controllers/MateriController.php:11
* @route '/{org}/kegiatan/{kegiatan}/materi'
*/
const storeForm = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MateriController::store
* @see app/Http/Controllers/MateriController.php:11
* @route '/{org}/kegiatan/{kegiatan}/materi'
*/
storeForm.post = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\MateriController::update
* @see app/Http/Controllers/MateriController.php:27
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
* @see app/Http/Controllers/MateriController.php:27
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
* @see app/Http/Controllers/MateriController.php:27
* @route '/{org}/materi/{materi}'
*/
update.put = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MateriController::update
* @see app/Http/Controllers/MateriController.php:27
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
* @see app/Http/Controllers/MateriController.php:27
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
* @see app/Http/Controllers/MateriController.php:40
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
* @see app/Http/Controllers/MateriController.php:40
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
* @see app/Http/Controllers/MateriController.php:40
* @route '/{org}/materi/{materi}'
*/
destroy.delete = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\MateriController::destroy
* @see app/Http/Controllers/MateriController.php:40
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
* @see app/Http/Controllers/MateriController.php:40
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
* @see \App\Http\Controllers\MateriController::moveUp
* @see app/Http/Controllers/MateriController.php:55
* @route '/{org}/materi/{materi}/up'
*/
export const moveUp = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: moveUp.url(args, options),
    method: 'patch',
})

moveUp.definition = {
    methods: ["patch"],
    url: '/{org}/materi/{materi}/up',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\MateriController::moveUp
* @see app/Http/Controllers/MateriController.php:55
* @route '/{org}/materi/{materi}/up'
*/
moveUp.url = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions) => {
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

    return moveUp.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{materi}', parsedArgs.materi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MateriController::moveUp
* @see app/Http/Controllers/MateriController.php:55
* @route '/{org}/materi/{materi}/up'
*/
moveUp.patch = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: moveUp.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MateriController::moveUp
* @see app/Http/Controllers/MateriController.php:55
* @route '/{org}/materi/{materi}/up'
*/
const moveUpForm = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: moveUp.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MateriController::moveUp
* @see app/Http/Controllers/MateriController.php:55
* @route '/{org}/materi/{materi}/up'
*/
moveUpForm.patch = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: moveUp.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

moveUp.form = moveUpForm

/**
* @see \App\Http\Controllers\MateriController::moveDown
* @see app/Http/Controllers/MateriController.php:70
* @route '/{org}/materi/{materi}/down'
*/
export const moveDown = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: moveDown.url(args, options),
    method: 'patch',
})

moveDown.definition = {
    methods: ["patch"],
    url: '/{org}/materi/{materi}/down',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\MateriController::moveDown
* @see app/Http/Controllers/MateriController.php:70
* @route '/{org}/materi/{materi}/down'
*/
moveDown.url = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions) => {
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

    return moveDown.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{materi}', parsedArgs.materi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MateriController::moveDown
* @see app/Http/Controllers/MateriController.php:70
* @route '/{org}/materi/{materi}/down'
*/
moveDown.patch = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: moveDown.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MateriController::moveDown
* @see app/Http/Controllers/MateriController.php:70
* @route '/{org}/materi/{materi}/down'
*/
const moveDownForm = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: moveDown.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MateriController::moveDown
* @see app/Http/Controllers/MateriController.php:70
* @route '/{org}/materi/{materi}/down'
*/
moveDownForm.patch = (args: { org: string | number, materi: string | { id: string } } | [org: string | number, materi: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: moveDown.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

moveDown.form = moveDownForm

const MateriController = { store, update, destroy, moveUp, moveDown }

export default MateriController