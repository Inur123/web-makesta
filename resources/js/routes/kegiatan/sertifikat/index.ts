import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\KegiatanController::simpan
* @see app/Http/Controllers/KegiatanController.php:160
* @route '/{org}/kegiatan/{kegiatan}/sertifikat/simpan'
*/
export const simpan = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: simpan.url(args, options),
    method: 'post',
})

simpan.definition = {
    methods: ["post"],
    url: '/{org}/kegiatan/{kegiatan}/sertifikat/simpan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KegiatanController::simpan
* @see app/Http/Controllers/KegiatanController.php:160
* @route '/{org}/kegiatan/{kegiatan}/sertifikat/simpan'
*/
simpan.url = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions) => {
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

    return simpan.definition.url
            .replace('{org}', parsedArgs.org.toString())
            .replace('{kegiatan}', parsedArgs.kegiatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KegiatanController::simpan
* @see app/Http/Controllers/KegiatanController.php:160
* @route '/{org}/kegiatan/{kegiatan}/sertifikat/simpan'
*/
simpan.post = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: simpan.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KegiatanController::simpan
* @see app/Http/Controllers/KegiatanController.php:160
* @route '/{org}/kegiatan/{kegiatan}/sertifikat/simpan'
*/
const simpanForm = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: simpan.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KegiatanController::simpan
* @see app/Http/Controllers/KegiatanController.php:160
* @route '/{org}/kegiatan/{kegiatan}/sertifikat/simpan'
*/
simpanForm.post = (args: { org: string | number, kegiatan: string | { id: string } } | [org: string | number, kegiatan: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: simpan.url(args, options),
    method: 'post',
})

simpan.form = simpanForm

const sertifikat = {
    simpan: Object.assign(simpan, simpan),
}

export default sertifikat