"use client";

import Confetti from "@/components/confetti";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { useState } from "react";

export default function ProposalPage() {
	const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
	const [noCount, setNoCount] = useState(0);
	const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
	const [showConfetti, setShowConfetti] = useState(false);

	const handleNoHover = () => {
		// Move the "No" button to a random position when hovered
		if (noCount < 3) {
			const x = Math.random() * 200 - 100;
			const y = Math.random() * 200 - 100;
			setNoButtonPosition({ x, y });
			setNoCount(noCount + 1);
		}
	};

	const handleYesClick = () => {
		setAnswer("yes");
		setShowConfetti(true);
	};

	const handleNoClick = () => {
		setAnswer("no");
	};

	const handleReset = () => {
		setAnswer(null);
		setNoCount(0);
		setNoButtonPosition({ x: 0, y: 0 });
		setShowConfetti(false);
	};

	return (
		<main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-red-100 p-4">
			{showConfetti && <Confetti />}

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="text-center max-w-md mx-auto"
			>
				{answer === null && (
					<Card className="p-8 shadow-lg bg-white/80 backdrop-blur-sm">
						<motion.div
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							transition={{
								type: "spring",
								stiffness: 260,
								damping: 20,
								delay: 0.3,
							}}
						>
							<div className="flex justify-center mb-6">
								<motion.div
									animate={{
										scale: [1, 1.2, 1],
									}}
									transition={{
										repeat: Number.POSITIVE_INFINITY,
										duration: 1.5,
									}}
								>
									<Heart className="h-20 w-20 text-red-500 fill-red-500" />
								</motion.div>
							</div>

							<h1 className="text-3xl font-bold text-gray-800 mb-6">
								Will you be my girlfriend?
							</h1>

							<div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
								<Button
									size="lg"
									className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg"
									onClick={handleYesClick}
								>
									Yes! ❤️
								</Button>

								<motion.div
									animate={{
										x: noButtonPosition.x,
										y: noButtonPosition.y,
									}}
									transition={{ type: "spring", stiffness: 300, damping: 10 }}
								>
									<Button
										size="lg"
										variant="outline"
										className="border-gray-300 text-gray-700 px-8 py-6 text-lg"
										onMouseEnter={handleNoHover}
										onClick={handleNoClick}
									>
										No
									</Button>
								</motion.div>
							</div>
						</motion.div>
					</Card>
				)}

				{answer === "yes" && (
					<Card className="p-8 shadow-lg bg-white/80 backdrop-blur-sm">
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.5 }}
							className="text-center"
						>
							<div className="flex justify-center mb-6">
								<motion.div
									animate={{
										scale: [1, 1.2, 1],
										rotate: [0, 10, -10, 0],
									}}
									transition={{
										repeat: Number.POSITIVE_INFINITY,
										duration: 2,
									}}
								>
									<Heart className="h-24 w-24 text-red-500 fill-red-500" />
								</motion.div>
							</div>

							<h1 className="text-3xl font-bold text-gray-800 mb-4">
								Yay! I&apos;m so happy! ❤️
							</h1>

							<p className="text-xl text-gray-700 mb-8">
								This is the beginning of something beautiful!
							</p>

							<Button
								className="mt-4 bg-red-500 hover:bg-red-600"
								onClick={handleReset}
							>
								Back to proposal
							</Button>
						</motion.div>
					</Card>
				)}

				{answer === "no" && (
					<Card className="p-8 shadow-lg bg-white/80 backdrop-blur-sm">
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.5 }}
							className="text-center"
						>
							<div className="flex justify-center mb-6">
								<X className="h-20 w-20 text-gray-400" />
							</div>

							<h1 className="text-3xl font-bold text-gray-800 mb-4">
								Are you sure?
							</h1>

							<p className="text-xl text-gray-700 mb-8">
								Maybe you want to reconsider? 😊
							</p>

							<div className="flex flex-col gap-4">
								<Button
									className="bg-red-500 hover:bg-red-600"
									onClick={handleYesClick}
								>
									Actually, yes! ❤️
								</Button>

								<Button
									variant="outline"
									className="border-gray-300"
									onClick={handleReset}
								>
									Let me think again
								</Button>
							</div>
						</motion.div>
					</Card>
				)}
			</motion.div>

			<p className="mt-12 text-gray-600 text-sm">Made with ❤️ just for you</p>
		</main>
	);
}
