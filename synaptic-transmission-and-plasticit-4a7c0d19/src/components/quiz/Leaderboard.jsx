import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Zap } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function Leaderboard({ scores, currentScore }) {
    const topScores = scores
        .sort((a, b) => b.percentage - a.percentage || new Date(b.created_date) - new Date(a.created_date))
        .slice(0, 10);

    const getRankIcon = (index) => {
        if (index === 0) return { icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" };
        if (index === 1) return { icon: Medal, color: "text-slate-400", bg: "bg-slate-50" };
        if (index === 2) return { icon: Award, color: "text-orange-600", bg: "bg-orange-50" };
        return { icon: Zap, color: "text-indigo-500", bg: "bg-indigo-50" };
    };

    return (
        <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Top Scores
            </h3>
            
            {topScores.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                    No scores yet. Be the first!
                </div>
            ) : (
                topScores.map((score, index) => {
                    const rankInfo = getRankIcon(index);
                    const Icon = rankInfo.icon;
                    const isCurrentScore = currentScore && score.id === currentScore.id;

                    return (
                        <motion.div
                            key={score.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-xl border-2 transition-all",
                                isCurrentScore ? "bg-indigo-50 border-indigo-300" : "bg-white border-slate-200",
                                index < 3 && "shadow-md"
                            )}
                        >
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", rankInfo.bg)}>
                                {index < 3 ? (
                                    <Icon className={cn("w-5 h-5", rankInfo.color)} />
                                ) : (
                                    <span className="font-bold text-slate-600">#{index + 1}</span>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className={cn("font-semibold truncate", isCurrentScore ? "text-indigo-700" : "text-slate-800")}>
                                    {score.player_name}
                                    {isCurrentScore && <span className="ml-2 text-xs font-normal text-indigo-500">(You)</span>}
                                </p>
                                <p className="text-sm text-slate-500">
                                    {score.score}/{score.total_questions} correct
                                </p>
                            </div>

                            <div className={cn(
                                "text-2xl font-bold px-4 py-2 rounded-lg",
                                index === 0 && "bg-amber-100 text-amber-700",
                                index === 1 && "bg-slate-100 text-slate-700",
                                index === 2 && "bg-orange-100 text-orange-700",
                                index > 2 && "bg-indigo-50 text-indigo-700"
                            )}>
                                {score.percentage}%
                            </div>
                        </motion.div>
                    );
                })
            )}
        </div>
    );
}