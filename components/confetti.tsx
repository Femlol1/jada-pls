"use client";

import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export default function Confetti() {
	const [dimensions, setDimensions] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const { innerWidth: width, innerHeight: height } = window;
		setDimensions({ width, height });

		const handleResize = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<ReactConfetti
			width={dimensions.width}
			height={dimensions.height}
			numberOfPieces={200}
			recycle={false}
			colors={["#f43f5e", "#ec4899", "#d946ef", "#a855f7", "#fb7185"]}
		/>
	);
}
