export function getIndeks(nilai: number | null | undefined | string): string {
    if (nilai === null || nilai === undefined || nilai === '') return '-';
    const n = Number(nilai);
    if (isNaN(n)) return '-';
    
    if (n >= 90) return 'A';
    if (n >= 80) return 'B';
    if (n >= 70) return 'C';
    if (n >= 60) return 'D';
    return 'E';
}
