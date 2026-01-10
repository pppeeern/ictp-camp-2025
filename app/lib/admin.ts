export const ADMIN_IDS = [
    "40514",
    "40502",
];

export function isAdmin(studentId: string | undefined | null) {
    if (!studentId) return false;
    return ADMIN_IDS.includes(studentId);
}
