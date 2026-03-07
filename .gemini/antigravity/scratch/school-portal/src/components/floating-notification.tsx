"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Clock, ChevronRight } from "lucide-react";

const notifications = [
    { id: 1, tag: "Exam", tagClass: "bg-red-100 text-red-700", title: "Board Exam Timetable Released", time: "2 hours ago", desc: "Class 10 & 12 schedule is now live on the portal." },
    { id: 2, tag: "Event", tagClass: "bg-blue-100 text-blue-700", title: "Sports Day – March 10, 2026", time: "5 hours ago", desc: "Register your child for athletics events by March 7." },
    { id: 3, tag: "Admission", tagClass: "bg-green-100 text-green-700", title: "Admissions Open 2026–27", time: "1 day ago", desc: "Apply online for Nursery to Grade 11. Limited seats." },
    { id: 4, tag: "Holiday", tagClass: "bg-amber-100 text-amber-700", title: "Holi Holiday – March 14", time: "2 days ago", desc: "School closed on March 14 for Holi festival." },
];

export function FloatingNotification() {
    const [open, setOpen] = useState(false);
    const [dismissed, setDismissed] = useState<number[]>([]);
    const [toastVisible, setToastVisible] = useState(true);

    const active = notifications.filter(n => !dismissed.includes(n.id));
    const unread = active.length;

    // auto-hide the toast after 5s
    useEffect(() => {
        const timer = setTimeout(() => setToastVisible(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* ── Auto-pop toast ── */}
            <AnimatePresence>
                {toastVisible && !open && (
                    <motion.div
                        initial={{ x: 120, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 120, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="fixed bottom-28 right-4 z-40 max-w-xs bg-white rounded-2xl shadow-xl border border-gray-100 p-4 cursor-pointer"
                        onClick={() => { setOpen(true); setToastVisible(false); }}
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                                <Bell className="w-4 h-4 text-blue-700" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-gray-900">{notifications[0].title}</p>
                                <p className="text-xs text-gray-500 mt-0.5 truncate">{notifications[0].desc}</p>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); setToastVisible(false); }}
                                className="text-gray-400 hover:text-gray-600 shrink-0">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Notification panel ── */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
                            onClick={() => setOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.85, y: 20 }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            className="fixed bottom-24 right-4 z-50 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
                        >
                            {/* header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-700 to-blue-800">
                                <div className="flex items-center gap-2">
                                    <Bell className="w-4 h-4 text-white" />
                                    <p className="font-bold text-white text-sm">School Notifications</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {unread > 0 && (
                                        <span className="text-xs bg-white text-blue-700 font-black rounded-full px-2 py-0.5">{unread}</span>
                                    )}
                                    <button onClick={() => setOpen(false)} className="text-blue-200 hover:text-white transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* list */}
                            <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                                {active.length === 0 ? (
                                    <div className="py-10 text-center text-sm text-gray-400">All caught up! 🎉</div>
                                ) : (
                                    active.map(n => (
                                        <motion.div key={n.id} layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20, height: 0 }}
                                            className="px-5 py-4 hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold shrink-0 mt-0.5 ${n.tagClass}`}>{n.tag}</span>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-gray-900 leading-tight">{n.title}</p>
                                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{n.desc}</p>
                                                    <p className="text-[10px] text-gray-400 mt-1.5 flex items-center gap-1">
                                                        <Clock className="w-2.5 h-2.5" />{n.time}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => setDismissed(d => [...d, n.id])}
                                                    className="text-gray-300 hover:text-gray-500 shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>

                            {/* footer */}
                            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
                                <button
                                    onClick={() => setDismissed(notifications.map(n => n.id))}
                                    className="text-xs text-blue-600 font-bold hover:text-blue-800 flex items-center gap-1 transition-colors">
                                    Mark all as read <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ── FAB Bell button ── */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => { setOpen(o => !o); setToastVisible(false); }}
                className="fixed bottom-6 right-4 z-50 w-14 h-14 bg-blue-700 hover:bg-blue-800 text-white rounded-full shadow-xl shadow-blue-700/40 flex items-center justify-center transition-colors"
            >
                <motion.div
                    animate={unread > 0 ? { rotate: [0, -15, 15, -10, 10, 0] } : {}}
                    transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 4 }}
                >
                    <Bell className="w-6 h-6" />
                </motion.div>
                {unread > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow"
                    >
                        {unread}
                    </motion.span>
                )}
            </motion.button>
        </>
    );
}
