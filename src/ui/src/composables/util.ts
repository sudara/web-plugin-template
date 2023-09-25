export function gainToDB (gain: number) : number {
    let db = Math.log10(gain) * 20;
    if (isFinite(db)) return db;
    return -100;
}