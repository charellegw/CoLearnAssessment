import { Gamepad2 } from 'lucide-react';

export default function Header() {
    return(
        <header className="bg-white bg-opacity-10 border-b border-white border-opacity-50 px-5">
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white bg-opacity-25 rounded-2xl flex items-center justify-center">
                            <Gamepad2 size={28} className="text-white" />
                        </div>
                        
                        <h1 className="text-2xl font-bold bg-white bg-clip-text text-transparent">
                            TicTacToe
                        </h1>
                    </div>

                    <a href="https://github.com/charellegw/CoLearnAssessment" target="_blank" rel="noopener noreferrer" className="align-middle flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium transition-colors duration-200 group" >
                        <span>View on GitHub</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </div>
            </div>
        </header>
    );
};