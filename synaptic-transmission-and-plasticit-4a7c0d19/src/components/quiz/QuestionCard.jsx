import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from 'lucide-react';

export default function QuestionCard({ 
    question, 
    options, 
    selectedAnswer, 
    correctAnswer,
    onSelectAnswer,
    showResult,
    questionNumber,
    totalQuestions
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
        >
            <div className="mb-8">
                <span className="text-sm font-medium text-indigo-400 tracking-wide uppercase">
                    Question {questionNumber} of {totalQuestions}
                </span>
                <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-slate-800 leading-relaxed">
                    {question}
                </h2>
            </div>

            <div className="space-y-3">
                {options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === correctAnswer;
                    const showCorrect = showResult && isCorrect;
                    const showIncorrect = showResult && isSelected && !isCorrect;

                    return (
                        <motion.button
                            key={index}
                            onClick={() => !showResult && onSelectAnswer(index)}
                            disabled={showResult}
                            whileHover={!showResult ? { scale: 1.01 } : {}}
                            whileTap={!showResult ? { scale: 0.99 } : {}}
                            className={cn(
                                "w-full p-5 rounded-2xl text-left transition-all duration-300 border-2",
                                "flex items-center justify-between gap-4",
                                !showResult && !isSelected && "bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50",
                                !showResult && isSelected && "bg-indigo-100 border-indigo-400",
                                showCorrect && "bg-emerald-50 border-emerald-400",
                                showIncorrect && "bg-red-50 border-red-400",
                                showResult && !isCorrect && !isSelected && "opacity-50"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <span className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-sm",
                                    !showResult && !isSelected && "bg-slate-100 text-slate-600",
                                    !showResult && isSelected && "bg-indigo-500 text-white",
                                    showCorrect && "bg-emerald-500 text-white",
                                    showIncorrect && "bg-red-500 text-white",
                                    showResult && !isCorrect && !isSelected && "bg-slate-100 text-slate-400"
                                )}>
                                    {String.fromCharCode(65 + index)}
                                </span>
                                <span className={cn(
                                    "text-lg font-medium",
                                    showCorrect && "text-emerald-700",
                                    showIncorrect && "text-red-700",
                                    !showResult && "text-slate-700"
                                )}>
                                    {option}
                                </span>
                            </div>
                            
                            {showCorrect && (
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                            )}
                            {showIncorrect && (
                                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </motion.div>
    );
}