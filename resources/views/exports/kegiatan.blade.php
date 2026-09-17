<table>
    <!-- HEADER KEGIATAN -->
    <tr>
        <td colspan="7" style="font-weight: bold; font-size: 14px;">DATA KEGIATAN: {{ strtoupper($kegiatan->nama) }}</td>
    </tr>
    <tr>
        <td colspan="2" style="font-weight: bold;">Penyelenggara</td>
        <td colspan="5">{{ $kegiatan->organisasi }}</td>
    </tr>
    <tr>
        <td colspan="2" style="font-weight: bold;">Lokasi</td>
        <td colspan="5">{{ $kegiatan->lokasi }}</td>
    </tr>
    <tr>
        <td colspan="2" style="font-weight: bold;">Tanggal</td>
        <td colspan="5">
            {{ \Carbon\Carbon::parse($kegiatan->tanggal_mulai)->translatedFormat('d F Y') }}
            @if($kegiatan->tanggal_selesai && $kegiatan->tanggal_mulai !== $kegiatan->tanggal_selesai)
                - {{ \Carbon\Carbon::parse($kegiatan->tanggal_selesai)->translatedFormat('d F Y') }}
            @endif
        </td>
    </tr>
    <tr>
        <td colspan="2" style="font-weight: bold;">Penanggung Jawab</td>
        <td colspan="5">
            {{ $kegiatan->petugas->where('peran', 'pj')->pluck('nama')->join(', ') }}
        </td>
    </tr>
    <tr>
        <td colspan="2" style="font-weight: bold;">Instruktur / Panitia</td>
        <td colspan="5">
            {{ $kegiatan->petugas->where('peran', 'instruktur')->pluck('nama')->join(', ') }}
        </td>
    </tr>
    <tr></tr> <!-- EMPTY ROW -->

    <!-- TABEL PESERTA -->
    <thead>
        <tr>
            <th rowspan="2" style="font-weight: bold; text-align: center; border: 1px solid #000; vertical-align: middle; background-color: #d8eed3;">No.</th>
            <th rowspan="2" style="font-weight: bold; text-align: center; border: 1px solid #000; vertical-align: middle; background-color: #d8eed3;">Nama Peserta</th>
            <th rowspan="2" style="font-weight: bold; text-align: center; border: 1px solid #000; vertical-align: middle; background-color: #d8eed3;">Tempat, Tanggal Lahir</th>
            <th rowspan="2" style="font-weight: bold; text-align: center; border: 1px solid #000; vertical-align: middle; background-color: #d8eed3;">Alamat Peserta</th>
            <th rowspan="2" style="font-weight: bold; text-align: center; border: 1px solid #000; vertical-align: middle; background-color: #d8eed3;">No HP</th>
            <th rowspan="2" style="font-weight: bold; text-align: center; border: 1px solid #000; vertical-align: middle; background-color: #d8eed3;">Sekolah</th>
            @foreach($kegiatan->materi as $materi)
                <th colspan="2" style="font-weight: bold; text-align: center; border: 1px solid #000; background-color: #d8eed3;">{{ $materi->nama }}</th>
            @endforeach
        </tr>
        <tr>
            @foreach($kegiatan->materi as $materi)
                <th style="font-weight: bold; text-align: center; border: 1px solid #000; background-color: #d8eed3;">Nilai</th>
                <th style="font-weight: bold; text-align: center; border: 1px solid #000; background-color: #d8eed3;">Indeks</th>
            @endforeach
        </tr>
    </thead>
    <tbody>
        @foreach($kegiatan->peserta as $index => $peserta)
            @php
                // Format TTL
                $ttlArray = [];
                if ($peserta->tempat_lahir) $ttlArray[] = $peserta->tempat_lahir;
                if ($peserta->tanggal_lahir) $ttlArray[] = \Carbon\Carbon::parse($peserta->tanggal_lahir)->translatedFormat('d F Y');
                $ttl = implode(', ', $ttlArray) ?: '-';

                // Map nilai by materi_id for easy access
                $nilaiMap = $peserta->nilai->pluck('nilai', 'materi_id')->toArray();
            @endphp
            <tr>
                <td style="border: 1px solid #000; text-align: center;">{{ $index + 1 }}</td>
                <td style="border: 1px solid #000;">{{ $peserta->nama }}</td>
                <td style="border: 1px solid #000;">{{ $ttl }}</td>
                <td style="border: 1px solid #000;">{{ $peserta->alamat ?? '-' }}</td>
                <td style="border: 1px solid #000; text-align: center;">{{ $peserta->no_hp ? "'".$peserta->no_hp : '-' }}</td>
                <td style="border: 1px solid #000;">{{ $peserta->sekolah ?? '-' }}</td>
                
                @foreach($kegiatan->materi as $materi)
                    @php
                        $val = $nilaiMap[$materi->id] ?? null;
                        $indeks = $val !== null ? \App\Helpers\NilaiHelper::indeks($val) : '-';
                    @endphp
                    <td style="border: 1px solid #000; text-align: center;">{{ $val !== null ? $val : '-' }}</td>
                    <td style="border: 1px solid #000; text-align: center;">{{ $indeks }}</td>
                @endforeach
            </tr>
        @endforeach
        
        @if($kegiatan->peserta->isEmpty())
            <tr>
                <td colspan="{{ 6 + ($kegiatan->materi->count() * 2) }}" style="text-align: center; border: 1px solid #000;">Belum ada peserta yang terdaftar di kegiatan ini.</td>
            </tr>
        @endif
    </tbody>
</table>
