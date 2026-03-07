"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { useState } from "react";

const photos = [
    {
        id: 1, src: "/school-campus.png", alt: "School Campus", category: "Campus",
        caption: "The grand entrance and sprawling campus of Sunrise International School"
    },
    {
        id: 2, src: "/school-classroom.png", alt: "Smart Classroom", category: "Academics",
        caption: "A modern smart classroom with students engaged in an interactive lesson"
    },
    {
        id: 3, src: "/school-canteen.png", alt: "School Canteen", category: "Facilities",
        caption: "Our hygienic and spacious school canteen serving nutritious meals daily"
    },
    {
        id: 4, src: "/school-sports-ground.png", alt: "Sports Ground", category: "Sports",
        caption: "Aerial view of our world-class sports facilities and cricket ground"
    },
    {
        id: 5, src: "/school-activities.png", alt: "Cultural Activities", category: "Cultural",
        caption: "Students showcasing their talents at the Annual Cultural Fest"
    },
    {
        id: 6, src: "/school-campus.png", alt: "Morning Assembly", category: "Campus",
        caption: "Students at the morning assembly under the Indian national flag"
    },
    {
        id: 7, src: "/school-sports-ground.png", alt: "Sports Day", category: "Sports",
        caption: "Annual Sports Day celebrations bringing the entire school community together"
    },
    {
        id: 8, src: "/school-classroom.png", alt: "Lab Class", category: "Academics",
        caption: "Students conducting experiments in our fully-equipped science laboratories"
    },
];

const categories = ["All", "Campus", "Academics", "Sports", "Cultural", "Facilities"];

export default function GalleryPage() {
    const [filter, setFilter] = useState("All");
    const [lightbox, setLightbox] = useState<number | null>(null);

    const filtered = filter === "All" ? photos : photos.filter(p => p.category === filter);

    const currentIdx = lightbox !== null ? filtered.findIndex(p => p.id === lightbox) : -1;
    const currentPhoto = lightbox !== null ? filtered.find(p => p.id === lightbox) : null;

    const prev = () => {
        if (currentIdx > 0) setLightbox(filtered[currentIdx - 1].id);
    };
    const next = () => {
        if (currentIdx < filtered.length - 1) setLightbox(filtered[currentIdx + 1].id);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100 pt-5 pb-4 px-4">
                <div className="max-w-7xl mx-auto flex items-center gap-3">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-700 font-medium transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Home
                    </Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-sm font-bold text-blue-700">Gallery</span>
                </div>
            </div>

            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-blue-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <span className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-white/15 border border-white/30 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
                            <Camera className="w-3 h-3" /> Photo Gallery
                        </span>
                        <h1 className="text-5xl font-black text-white mb-3">Campus <span className="text-cyan-300">Gallery</span></h1>
                        <p className="text-blue-200 max-w-xl">A visual journey through campus life, academics, sports, and cultural activities at Sunrise International.</p>
                    </motion.div>
                </div>
            </div>

            {/* Filter */}
            <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex gap-2 overflow-x-auto">
                    {categories.map(cat => (
                        <motion.button key={cat} onClick={() => setFilter(cat)}
                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${filter === cat ? "bg-blue-700 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}>
                            {cat}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Masonry-style grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <AnimatePresence mode="popLayout">
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-0">
                        {filtered.map((photo, i) => (
                            <motion.div key={photo.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.85 }}
                                transition={{ delay: i * 0.06 }}
                                className="group relative break-inside-avoid mb-4 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-shadow"
                                onClick={() => setLightbox(photo.id)}
                            >
                                <div className="relative" style={{ aspectRatio: i % 3 === 0 ? "4/5" : i % 3 === 1 ? "16/9" : "1/1" }}>
                                    <Image src={photo.src} alt={photo.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <div>
                                        <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{photo.category}</span>
                                        <p className="text-xs text-white font-semibold mt-0.5 leading-snug">{photo.caption}</p>
                                    </div>
                                </div>
                                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="w-3 h-3 text-white" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <Camera className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                        <p className="text-gray-400 font-semibold">No photos in this category yet</p>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox !== null && currentPhoto && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                        onClick={() => setLightbox(null)}>

                        {/* Close */}
                        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                            onClick={() => setLightbox(null)}>
                            <X className="w-5 h-5" />
                        </button>

                        {/* Prev */}
                        {currentIdx > 0 && (
                            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                                onClick={e => { e.stopPropagation(); prev(); }}>
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                        )}

                        {/* Next */}
                        {currentIdx < filtered.length - 1 && (
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                                onClick={e => { e.stopPropagation(); next(); }}>
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        )}

                        {/* Image */}
                        <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 22 }}
                            className="relative max-w-4xl w-full max-h-[80vh] rounded-2xl overflow-hidden"
                            onClick={e => e.stopPropagation()}>
                            <Image src={currentPhoto.src} alt={currentPhoto.alt} width={1200} height={800} className="object-cover w-full h-full max-h-[70vh]" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                                <span className="text-[10px] text-white/60 uppercase font-bold tracking-widest">{currentPhoto.category}</span>
                                <p className="text-sm text-white font-semibold mt-0.5">{currentPhoto.caption}</p>
                            </div>
                        </motion.div>

                        {/* Counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-xs font-bold">
                            {currentIdx + 1} / {filtered.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
