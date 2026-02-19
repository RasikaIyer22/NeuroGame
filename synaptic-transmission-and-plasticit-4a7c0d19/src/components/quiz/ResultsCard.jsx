import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Trophy, Target, RotateCcw, Sparkles, Brain } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function ResultsCard({ score, totalQuestions, onRestart }) {
    const percentage = Math.round((score / totalQuestions) * 100);
    
    const getGrade = () => {
        if (percentage >= 90) return { label: "Neuroscience Expert!", color: "text-emerald-500", bg: "bg-emerald-50" };
        if (percentage >= 70) return { label: "Great Understanding!", color: "text-indigo-500", bg: "bg-indigo-50" };
        if (percentage >= 50) return { label: "Good Progress!", color: "text-amber-500", bg: "bg-amber-50" };
        return { label: "Keep Learning!", color: "text-rose-500", bg: "bg-rose-50" };
    };

    const grade = getGrade();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className={cn(
                    "w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center",
                    grade.bg
                )}
            >
                {percentage >= 70 ? (
                    <Trophy className={cn("w-12 h-12", grade.color)} />
                ) : (
                    <Brain className={cn("w-12 h-12", grade.color)} />
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                    Quiz Complete!
                </h2>
                <p className={cn("text-xl font-semibold mb-8", grade.color)}>
                    {grade.label}
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 mb-8"
            >
                <div className="flex items-center justify-center gap-12">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Target className="w-5 h-5 text-indigo-500" />
                            <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Score</span>
                        </div>
                        <p className="text-4xl font-bold text-slate-800">
                            {score}<span className="text-2xl text-slate-400">/{totalQuestions}</span>
                        </p>
                    </div>
                    
                    <div className="w-px h-16 bg-slate-200" />
                    
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Sparkles className="w-5 h-5 text-indigo-500" />
                            <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Accuracy</span>
                        </div>
                        <p className="text-4xl font-bold text-slate-800">
                            {percentage}<span className="text-2xl text-slate-400">%</span>
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <Button
                    onClick={onRestart}
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl px-8 py-6 text-lg font-semibold shadow-lg shadow-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-300"
                >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Try Again
                </Button>
            </motion.div>
        </motion.div>
    );
}