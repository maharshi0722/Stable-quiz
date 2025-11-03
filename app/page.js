"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

const stableMCQQuestions = [
  {
    question: "What is Stable designed for?",
    options: ["Scalable USDT transactions", "Gaming applications", "Social media", "Video streaming"],
    answer: "Scalable USDT transactions",
  },
  {
    question: "Which feature allows Stable to offer gas-free peer transfers?",
    options: [
      "Using USDT as native gas",
      "Layer 2 Ethereum scaling",
      "Proof-of-Stake consensus",
      "Sharding technology",
    ],
    answer: "Using USDT as native gas",
  },
  {
    question: "What throughput does Stable aim to support for institutional volume?",
    options: ["Up to 1,000 TPS", "10,000+ TPS", "100,000 TPS", "Unlimited TPS"],
    answer: "10,000+ TPS",
  },
  {
    question: "What is Stable primarily designed for?",
    options: [
      "General-purpose smart contracts",
      "Stablecoin infrastructure and USDT transactions",
      "NFT marketplaces",
      "Decentralized social media apps",
    ],
    answer: "Stablecoin infrastructure and USDT transactions",
  },
  {
    question: "Which users are targeted by Stable's infrastructure?",
    options: [
      "Institutions, developers, and everyday users",
      "Only retail users",
      "Only NFT creators",
      "Only DeFi protocols",
    ],
    answer: "Institutions, developers, and everyday users",
  },
  {
    question: "Stable allows developers to launch apps natively using which compatibility?",
    options: [
      "Ethereum Virtual Machine (EVM)",
      "Bitcoin Virtual Machine",
      "Cardano Plutus",
      "Solana Rust SDK",
    ],
    answer: "Ethereum Virtual Machine (EVM)",
  },
  {
    question: "Which roadmap phase focuses on scaling throughput and execution?",
    options: ["Phase 1", "Phase 2", "Phase 3", "Phase 4"],
    answer: "Phase 2",
  },
  {
    question: "What problem does Stable aim to solve for regular USDT users?",
    options: [
      "High fees, slow transfers, and fragmented rails",
      "NFT minting delays",
      "Mining rewards volatility",
      "Decentralized exchange liquidity",
    ],
    answer: "High fees, slow transfers, and fragmented rails",
  },
  {
    question: "Which feature ensures users pay transaction fees in the same currency they hold?",
    options: [
      "Native USDT settlement",
      "Layer-2 token bridging",
      "Gas token conversion",
      "Multi-token staking",
    ],
    answer: "Native USDT settlement",
  },
  {
    question: "Stable is enterprise-ready because it supports?",
    options: [
      "High throughput, compliance, and reserved blockspace",
      "Only BTC transactions",
      "Token staking rewards",
      "Zero fees at all times",
    ],
    answer: "High throughput, compliance, and reserved blockspace",
  },
];

export default function Page() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [questions, setQuestions] = useState([]);
  const [quizKey, setQuizKey] = useState(0);
  const [disableOptions, setDisableOptions] = useState(false);

  const shuffleArray = (array) =>
    array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

  useEffect(() => {
    const shuffledQuestions = shuffleArray(stableMCQQuestions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setQuestions(shuffledQuestions);
  }, [quizKey]);

  const handleSelect = (option) => {
    if (disableOptions) return;
    setSelectedOption(option);
    setDisableOptions(true);

    if (option === questions[currentIndex].answer) setScore(score + 1);

    setTimeout(() => {
      setSelectedOption("");
      setDisableOptions(false);
      if (currentIndex + 1 < questions.length) setCurrentIndex(currentIndex + 1);
      else setFinished(true);
    }, 500);
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentIndex(0);
    setFinished(false);
    setQuizKey((prev) => prev + 1);
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between ${inter.className}
      bg-green-700 text-white transition-all duration-700`}
    >
      {/* Header */}
      <header className="flex flex-col items-center justify-start pt-5 md:pt-8 w-full bg-green-700 text-white fixed top-0 left-0 z-20">
        <div className="flex items-center gap-2 px-3">
          <img
            src="https://pbs.twimg.com/profile_images/1962180241927061504/FqGvk1jN_400x400.jpg"
            alt="Stable Logo"
            className="w-9 h-9 md:w-11 md:h-11 rounded-full"
          />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-green-100">
            Stable Quiz
          </h1>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center pt-28 pb-28 w-full px-4 sm:px-6">
        {!started ? (
          <div className="bg-white/95 rounded-3xl p-6 sm:p-10 shadow-xl w-full max-w-md text-center text-gray-900">
            <h2 className="text-2xl font-semibold text-green-800 mb-2">
              Welcome to the Stable Quiz!
            </h2>
            <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
              Test your knowledge of Stable blockchain and USDT features. 10 challenging questions await.
            </p>
            <button
              onClick={() => setStarted(true)}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full shadow hover:scale-105 transition-transform font-medium"
            >
              Start Quiz
            </button>
          </div>
        ) : !finished ? (
          <div className="bg-white/95 rounded-3xl p-6 sm:p-10 shadow-xl w-full max-w-md text-gray-900">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-700"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            <h2 className="text-base sm:text-lg font-semibold mb-3 text-center text-green-800">
              Question {currentIndex + 1} / {questions.length}
            </h2>
            <p className="mb-4 text-gray-800 text-center text-sm sm:text-base leading-relaxed">
              {questions[currentIndex].question}
            </p>

            <div className="grid grid-cols-1 gap-3">
              {questions[currentIndex].options.map((option, idx) => {
                let bgColor = "bg-white text-gray-800";
                if (selectedOption) {
                  if (option === questions[currentIndex].answer)
                    bgColor = "bg-green-500 text-white transition-colors duration-300";
                  else if (option === selectedOption && option !== questions[currentIndex].answer)
                    bgColor = "bg-red-400 text-white transition-colors duration-300";
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(option)}
                    disabled={disableOptions}
                    className={`border border-gray-200 rounded-xl p-3 text-left w-full shadow-sm hover:scale-105 transition-all duration-300 ${bgColor}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white/95 rounded-3xl p-8 sm:p-12 shadow-xl text-center w-full max-w-md text-gray-900">
            <h2 className="text-2xl font-bold mb-2 text-green-800">Quiz Completed!</h2>
            <p className="text-base mb-2">
              Your Score: <span className="font-bold">{score}</span> / {questions.length}
            </p>
            <p className="mb-4">Great job! Keep learning and exploring Stable blockchain features!</p>
            <button
              onClick={handleRestart}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full shadow hover:scale-105 transition-transform font-medium"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full py-2 text-center bg-green-700 text-white text-sm sm:text-base">
        &copy; {new Date().getFullYear()} Stable Quiz — Built by Maharshi
      </footer>
    </div>
  );
}
