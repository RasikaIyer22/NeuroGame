import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ current, total }) {
    const progress = ((current) / total) * 100;

    return (
        <div className="w-full relative py-8">
            {/* Dendrites branching from cell body */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-0">
                {/* Dendrite 1 - upper left */}
                <div className="absolute w-12 h-0.5 bg-gradient-to-l from-indigo-300 to-transparent rounded-full origin-right -rotate-45 left-0 -top-4" />
                <div className="absolute w-6 h-0.5 bg-gradient-to-l from-indigo-300 to-transparent rounded-full -left-8 -top-6 -rotate-12" />
                
                {/* Dendrite 2 - upper */}
                <div className="absolute w-10 h-0.5 bg-gradient-to-l from-indigo-300 to-transparent rounded-full -left-6 -top-8 -rotate-75" />
                
                {/* Dendrite 3 - lower left */}
                <div className="absolute w-12 h-0.5 bg-gradient-to-l from-indigo-300 to-transparent rounded-full origin-right rotate-45 left-0 top-4" />
                <div className="absolute w-6 h-0.5 bg-gradient-to-l from-indigo-300 to-transparent rounded-full -left-8 top-6 rotate-12" />
                
                {/* Dendrite 4 - lower */}
                <div className="absolute w-10 h-0.5 bg-gradient-to-l from-indigo-300 to-transparent rounded-full -left-6 top-8 rotate-75" />
            </div>

            {/* Neuron cell body (soma) at the start */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full shadow-lg z-10">
                <div className="absolute inset-1 bg-gradient-to-br from-indigo-300 to-purple-400 rounded-full" />
                {/* Nucleus */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-indigo-600 rounded-full opacity-40" />
                </div>
            </div>

            {/* Axon (the main neuron body) */}
            <div className="relative h-3 bg-slate-200 rounded-full ml-7 mr-12 overflow-visible">
                {/* Myelin sheath segments */}
                <div className="absolute inset-0 flex items-center justify-around">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="w-1 h-5 bg-slate-300 rounded-full opacity-60"
                        />
                    ))}
                </div>

                {/* Electrical current flowing through */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-full overflow-hidden"
                >
                    {/* Animated electrical pulse */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"
                        animate={{
                            x: ['-100%', '200%']
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </motion.div>
            </div>

            {/* Axon terminals - branching structure */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                {/* Terminal branch 1 - upper */}
                <div className="absolute right-8 -top-6">
                    <div className="w-10 h-0.5 bg-gradient-to-r from-indigo-400 to-indigo-300 rounded-full rotate-[-30deg] origin-left" />
                    <div className="absolute right-0 -top-1 w-4 h-4 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full shadow-md">
                        <div className="absolute inset-1 bg-gradient-to-br from-indigo-300 to-purple-400 rounded-full" />
                    </div>
                </div>
                
                {/* Terminal branch 2 - middle upper */}
                <div className="absolute right-6 -top-3">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-indigo-400 to-indigo-300 rounded-full rotate-[-15deg] origin-left" />
                    <div className="absolute right-0 -top-1 w-3.5 h-3.5 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full shadow-md">
                        <div className="absolute inset-0.5 bg-gradient-to-br from-indigo-300 to-purple-400 rounded-full" />
                    </div>
                </div>
                
                {/* Terminal branch 3 - center */}
                <div className="absolute right-4 top-0">
                    <div className="w-6 h-0.5 bg-gradient-to-r from-indigo-400 to-indigo-300 rounded-full" />
                    <div className="absolute right-0 -top-1.5 w-4 h-4 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full shadow-md">
                        <div className="absolute inset-1 bg-gradient-to-br from-indigo-300 to-purple-400 rounded-full" />
                    </div>
                </div>
                
                {/* Terminal branch 4 - middle lower */}
                <div className="absolute right-6 top-3">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-indigo-400 to-indigo-300 rounded-full rotate-[15deg] origin-left" />
                    <div className="absolute right-0 -top-1 w-3 h-3 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full shadow-md">
                        <div className="absolute inset-0.5 bg-gradient-to-br from-indigo-300 to-purple-400 rounded-full" />
                    </div>
                </div>
                
                {/* Terminal branch 5 - lower */}
                <div className="absolute right-8 top-6">
                    <div className="w-10 h-0.5 bg-gradient-to-r from-indigo-400 to-indigo-300 rounded-full rotate-[30deg] origin-left" />
                    <div className="absolute right-0 -top-1 w-3.5 h-3.5 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full shadow-md">
                        <div className="absolute inset-0.5 bg-gradient-to-br from-indigo-300 to-purple-400 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}