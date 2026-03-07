// storage.ts — Single source of truth for all dynamic school data
// Reads/writes to localStorage. JSON files provide seed/default data.

export interface MarkRecord {
    score: number
    max: number
    examName: string
    date: string
    teacherId: string
    teacherName: string
}

export interface RemarkRecord {
    id: string
    teacherId: string
    teacherName: string
    subject: string
    remark: string
    date: string
}

export interface AttendanceRecord {
    status: "present" | "absent"
    time: string | null
    method: "qr" | "manual"
    classId: string
}

export interface ActivityRecord {
    id: string
    name: string
    type: string
    result: string
    points: number
    date: string
    teacherId: string
}

export interface NoticeRecord {
    id: string
    title: string
    body: string
    date: string
    type: "general" | "academic" | "event" | "urgent"
    targetClass: string // "all" | "1" | "2" etc
    author: string
    authorId: string
}

// ─── MARKS ──────────────────────────────────────────────────────────────────

export function getMarks(studentId: string): Record<string, MarkRecord> {
    if (typeof window === "undefined") return {}
    const raw = localStorage.getItem(`ats_marks_${studentId}`)
    return raw ? JSON.parse(raw) : {}
}

export function setMark(studentId: string, subject: string, record: MarkRecord) {
    const existing = getMarks(studentId)
    existing[subject] = record
    localStorage.setItem(`ats_marks_${studentId}`, JSON.stringify(existing))
}

export function setMarksForStudent(studentId: string, marks: Record<string, MarkRecord>) {
    localStorage.setItem(`ats_marks_${studentId}`, JSON.stringify(marks))
}

// Returns marks merged with defaults (localStorage takes priority)
export function getMergedMarks(
    studentId: string,
    defaultMarks: Record<string, number>
): Record<string, { score: number; max: number; fromStorage: boolean }> {
    const stored = getMarks(studentId)
    const result: Record<string, { score: number; max: number; fromStorage: boolean }> = {}
    for (const [subject, defaultScore] of Object.entries(defaultMarks)) {
        if (stored[subject]) {
            result[subject] = { score: stored[subject].score, max: stored[subject].max, fromStorage: true }
        } else {
            result[subject] = { score: defaultScore, max: 100, fromStorage: false }
        }
    }
    return result
}

// ─── ATTENDANCE ──────────────────────────────────────────────────────────────

export function getAttendanceForDate(date: string): Record<string, AttendanceRecord> {
    if (typeof window === "undefined") return {}
    const raw = localStorage.getItem(`ats_attendance_${date}`)
    return raw ? JSON.parse(raw) : {}
}

export function markAttendance(studentId: string, classId: string, method: "qr" | "manual" = "qr") {
    const date = new Date().toISOString().split("T")[0]
    const existing = getAttendanceForDate(date)
    existing[studentId] = {
        status: "present",
        time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
        method,
        classId,
    }
    localStorage.setItem(`ats_attendance_${date}`, JSON.stringify(existing))
}

export function markAbsent(studentId: string, classId: string) {
    const date = new Date().toISOString().split("T")[0]
    const existing = getAttendanceForDate(date)
    existing[studentId] = {
        status: "absent",
        time: null,
        method: "manual",
        classId,
    }
    localStorage.setItem(`ats_attendance_${date}`, JSON.stringify(existing))
}

export function isMarkedToday(studentId: string): boolean {
    const date = new Date().toISOString().split("T")[0]
    const existing = getAttendanceForDate(date)
    return !!existing[studentId]
}

export function getAttendanceForClass(classId: string, date: string): Record<string, AttendanceRecord> {
    const all = getAttendanceForDate(date)
    const filtered: Record<string, AttendanceRecord> = {}
    for (const [sid, rec] of Object.entries(all)) {
        if (rec.classId === classId) filtered[sid] = rec
    }
    return filtered
}

// ─── REMARKS ─────────────────────────────────────────────────────────────────

export function getRemarks(studentId: string): RemarkRecord[] {
    if (typeof window === "undefined") return []
    const raw = localStorage.getItem(`ats_remarks_${studentId}`)
    return raw ? JSON.parse(raw) : []
}

export function addRemark(studentId: string, remark: Omit<RemarkRecord, "id">) {
    const existing = getRemarks(studentId)
    const newRemark: RemarkRecord = { ...remark, id: `R-${Date.now()}` }
    existing.unshift(newRemark)
    localStorage.setItem(`ats_remarks_${studentId}`, JSON.stringify(existing))
    return newRemark
}

export function deleteRemark(studentId: string, remarkId: string) {
    const existing = getRemarks(studentId).filter(r => r.id !== remarkId)
    localStorage.setItem(`ats_remarks_${studentId}`, JSON.stringify(existing))
}

// ─── ACTIVITIES ───────────────────────────────────────────────────────────────

export function getActivities(studentId: string): ActivityRecord[] {
    if (typeof window === "undefined") return []
    const raw = localStorage.getItem(`ats_activities_${studentId}`)
    return raw ? JSON.parse(raw) : []
}

export function addActivity(studentId: string, activity: Omit<ActivityRecord, "id">) {
    const existing = getActivities(studentId)
    const newActivity: ActivityRecord = { ...activity, id: `ACT-${Date.now()}` }
    existing.unshift(newActivity)
    localStorage.setItem(`ats_activities_${studentId}`, JSON.stringify(existing))
    return newActivity
}

// ─── NOTICES ─────────────────────────────────────────────────────────────────

export function getNotices(targetClass?: string): NoticeRecord[] {
    if (typeof window === "undefined") return []
    const raw = localStorage.getItem("ats_notices")
    const all: NoticeRecord[] = raw ? JSON.parse(raw) : getDefaultNotices()
    if (!targetClass) return all
    return all.filter(n => n.targetClass === "all" || n.targetClass === targetClass)
}

export function addNotice(notice: Omit<NoticeRecord, "id">) {
    const existing = getNotices()
    const newNotice: NoticeRecord = { ...notice, id: `NOT-${Date.now()}` }
    existing.unshift(newNotice)
    localStorage.setItem("ats_notices", JSON.stringify(existing))
    return newNotice
}

export function deleteNotice(noticeId: string) {
    const existing = getNotices().filter(n => n.id !== noticeId)
    localStorage.setItem("ats_notices", JSON.stringify(existing))
}

function getDefaultNotices(): NoticeRecord[] {
    return [
        {
            id: "NOT-DEFAULT-1",
            title: "Parent-Teacher Meeting",
            body: "PTM scheduled for Saturday, 1st March 2026 from 9 AM to 1 PM. Attendance is mandatory for all parents.",
            date: "2026-03-01",
            type: "event",
            targetClass: "all",
            author: "Dr. Rajendra Prasad",
            authorId: "PRI-001",
        },
        {
            id: "NOT-DEFAULT-2",
            title: "Annual Sports Day",
            body: "Annual Sports Day will be held on 5th March 2026. Students must bring their sports kits.",
            date: "2026-03-05",
            type: "event",
            targetClass: "all",
            author: "Dr. Rajendra Prasad",
            authorId: "PRI-001",
        },
        {
            id: "NOT-DEFAULT-3",
            title: "Final Exam Schedule Released",
            body: "Final exams will begin from 20th March 2026. Admit cards will be distributed by the class teacher next week.",
            date: "2026-02-25",
            type: "academic",
            targetClass: "all",
            author: "Dr. Rajendra Prasad",
            authorId: "PRI-001",
        },
    ]
}

// ─── CHAMP SCORE ─────────────────────────────────────────────────────────────

export function getChampScore(studentId: string, defaultScore?: number): number {
    if (typeof window === "undefined") return defaultScore ?? 0
    const stored = localStorage.getItem(`ats_champ_${studentId}`)
    if (stored) return parseInt(stored)
    return defaultScore ?? 0
}

export function updateChampScore(studentId: string, points: number) {
    const current = getChampScore(studentId)
    localStorage.setItem(`ats_champ_${studentId}`, String(current + points))
}
