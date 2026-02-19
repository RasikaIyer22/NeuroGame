import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight, Zap } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import QuestionCard from '@/components/quiz/QuestionCard';
import ResultsCard from '@/components/quiz/ResultsCard';
import ProgressBar from '@/components/quiz/ProgressBar';
import Leaderboard from '@/components/quiz/Leaderboard';
import SaveScoreForm from '@/components/quiz/SaveScoreForm';

const questions = [
    {
        question: "What is the primary neurotransmitter released at the neuromuscular junction?",
        options: ["Dopamine", "Acetylcholine", "Serotonin", "GABA"],
        correct: 1
    },
    {
        question: "Long-term potentiation (LTP) is most strongly associated with which receptor?",
        options: ["GABA-A receptor", "Nicotinic receptor", "NMDA receptor", "Opioid receptor"],
        correct: 2
    },
    {
        question: "What ion influx is primarily responsible for the depolarization phase of an action potential?",
        options: ["Potassium (K+)", "Calcium (Ca2+)", "Sodium (Na+)", "Chloride (Cl-)"],
        correct: 2
    },
    {
        question: "Which process describes the reuptake of neurotransmitters back into the presynaptic neuron?",
        options: ["Exocytosis", "Endocytosis", "Pinocytosis", "Transporter-mediated uptake"],
        correct: 3
    },
    {
        question: "What is the synaptic cleft?",
        options: [
            "The interior of a neuron",
            "The gap between the presynaptic and postsynaptic membranes",
            "A type of ion channel",
            "The myelin sheath"
        ],
        correct: 1
    },
    {
        question: "Which phenomenon describes the decrease in synaptic strength following repeated stimulation?",
        options: ["Long-term potentiation", "Synaptic facilitation", "Long-term depression", "Sensitization"],
        correct: 2
    },
    {
        question: "SNARE proteins are essential for which process?",
        options: [
            "Action potential propagation",
            "Vesicle fusion and neurotransmitter release",
            "Receptor activation",
            "Myelin formation"
        ],
        correct: 1
    },
    {
        question: "What type of synapse uses direct electrical coupling between neurons?",
        options: ["Chemical synapse", "Gap junction", "Axo-axonic synapse", "Neuromuscular junction"],
        correct: 1
    },
    {
        question: "Hebbian plasticity is often summarized as:",
        options: [
            "Neurons that fire apart, wire apart",
            "Neurons that fire together, wire together",
            "Use it or lose it",
            "All or none response"
        ],
        correct: 1
    },
    {
        question: "Which protein is crucial for the calcium-dependent release of neurotransmitters?",
        options: ["Actin", "Synaptotagmin", "Tubulin", "Spectrin"],
        correct: 1
    },
    {
        question: "What is the role of acetylcholinesterase at the synapse?",
        options: [
            "Synthesize acetylcholine",
            "Transport acetylcholine into vesicles",
            "Break down acetylcholine in the synaptic cleft",
            "Release acetylcholine"
        ],
        correct: 2
    },
    {
        question: "Spike-timing-dependent plasticity (STDP) depends on:",
        options: [
            "The frequency of action potentials only",
            "The relative timing of pre and postsynaptic spikes",
            "The size of the synapse",
            "The number of dendrites"
        ],
        correct: 1
    }
];

export default function SynapticQuiz() {
    const [gameState, setGameState] = useState('intro'); // intro, playing, results
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [savedScore, setSavedScore] = useState(null);

    const queryClient = useQueryClient();

    const { data: leaderboardScores = [], isLoading: scoresLoading } = useQuery({
        queryKey: ['quizScores'],
        queryFn: () => base44.entities.QuizScore.list('-percentage', 50),
    });

    const saveScoreMutation = useMutation({
        mutationFn: (data) => base44.entities.QuizScore.create(data),
        onSuccess: (newScore) => {
            queryClient.invalidateQueries({ queryKey: ['quizScores'] });
            setSavedScore(newScore);
        },
    });

    const startGame = () => {
        setGameState('playing');
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setSavedScore(null);
    };

    const handleSaveScore = (playerName) => {
        const percentage = Math.round((score / questions.length) * 100);
        saveScoreMutation.mutate({
            player_name: playerName,
            score: score,
            total_questions: questions.length,
            percentage: percentage
        });
    };

    const handleSelectAnswer = (index) => {
        setSelectedAnswer(index);
        setShowResult(true);
        
        if (index === questions[currentQuestion].correct) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            setGameState('results');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
            {/* Decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-3xl mx-auto px-4 py-8 md:py-16">
                <AnimatePresence mode="wait">
                    {gameState === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-indigo-300"
                            >
                                <Brain className="w-12 h-12 text-white" />
                            </motion.div>

                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-5xl font-bold text-slate-800 mb-4"
                            >
                                Synaptic Transmission
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                    & Plasticity Quiz
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg text-slate-600 mb-8 max-w-md mx-auto"
                            >
                                Test your knowledge of neural communication and synaptic plasticity with {questions.length} challenging questions.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-wrap justify-center gap-4 mb-10"
                            >
                                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                                    <Zap className="w-4 h-4 text-amber-500" />
                                    <span className="text-sm font-medium text-slate-600">{questions.length} Questions</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                                    <Brain className="w-4 h-4 text-indigo-500" />
                                    <span className="text-sm font-medium text-slate-600">Neuroscience</span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <Button
                                    onClick={startGame}
                                    size="lg"
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl px-10 py-7 text-lg font-semibold shadow-2xl shadow-indigo-300 transition-all hover:shadow-indigo-400 hover:scale-105"
                                >
                                    Start Quiz
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </motion.div>
                        </motion.div>
                    )}

                    {gameState === 'playing' && (
                        <motion.div
                            key="playing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="mb-8">
                                <ProgressBar current={currentQuestion + 1} total={questions.length} />
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50">
                                <AnimatePresence mode="wait">
                                    <QuestionCard
                                        key={currentQuestion}
                                        question={questions[currentQuestion].question}
                                        options={questions[currentQuestion].options}
                                        selectedAnswer={selectedAnswer}
                                        correctAnswer={questions[currentQuestion].correct}
                                        onSelectAnswer={handleSelectAnswer}
                                        showResult={showResult}
                                        questionNumber={currentQuestion + 1}
                                        totalQuestions={questions.length}
                                    />
                                </AnimatePresence>

                                <AnimatePresence>
                                    {showResult && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="mt-8 flex justify-end"
                                        >
                                            <Button
                                                onClick={nextQuestion}
                                                size="lg"
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 py-6 font-semibold shadow-lg shadow-indigo-200 transition-all hover:shadow-xl"
                                            >
                                                {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                            </Button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="mt-6 text-center">
                                <span className="text-sm font-medium text-slate-400">
                                    Current Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
                                </span>
                            </div>
                        </motion.div>
                    )}

                    {gameState === 'results' && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                        >
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50">
                                <ResultsCard
                                    score={score}
                                    totalQuestions={questions.length}
                                    onRestart={startGame}
                                />

                                {!savedScore && (
                                    <div className="mt-8">
                                        <SaveScoreForm 
                                            onSave={handleSaveScore}
                                            isLoading={saveScoreMutation.isPending}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50">
                                <Leaderboard 
                                    scores={leaderboardScores}
                                    currentScore={savedScore}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}