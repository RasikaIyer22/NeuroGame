import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from 'lucide-react';

export default function SaveScoreForm({ onSave, isLoading }) {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onSave(name.trim());
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8"
        >
            <p className="text-sm font-medium text-slate-700 mb-3">Save your score to the leaderboard:</p>
            <div className="flex gap-3">
                <Input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={30}
                    className="flex-1"
                    disabled={isLoading}
                    required
                />
                <Button
                    type="submit"
                    disabled={!name.trim() || isLoading}
                    className="bg-indigo-600 hover:bg-indigo-700"
                >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </motion.form>
    );
}