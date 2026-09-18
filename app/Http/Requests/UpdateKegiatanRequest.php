<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateKegiatanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama' => 'required|string|max:255',
            'lokasi' => 'required|string|max:255',
            'tanggal_teks' => 'required|string|max:255',
            'catatan' => 'nullable|string',
            'pj' => 'array',
            'pj.*' => 'required|string|max:255',
            'instruktur' => 'array',
            'instruktur.*' => 'required|string|max:255',
        ];
    }
}
