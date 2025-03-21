"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const canvasRef = useRef(null);
  const [text, setText] = useState("");
  const words = ["MIST", "Manipal Information Security Team"];
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCipher, setShowCipher] = useState(false);
  const typingSpeed = 70;
  const deletingSpeed = 80;
  const delay = 1000;

  // Typing Effect
  useEffect(() => {
    const currentWord = words[wordIndex];

    const type = () => {
      if (!isDeleting) {
        setText((prev) => currentWord.substring(0, prev.length + 1));
        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        setText((prev) => currentWord.substring(0, prev.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const typingTimer = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(typingTimer);
  }, [text, isDeleting, wordIndex]);

  // Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 100;

    class Particle {
      constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < numParticles; i++) {
      const size = Math.random() * 4 + 1;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speedX = (Math.random() - 0.5) * 3;
      const speedY = (Math.random() - 0.5) * 3;
      particles.push(new Particle(x, y, size, speedX, speedY));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  // Matrix-style domain decryption effect
  const [matrixText, setMatrixText] = useState("█ █ █ █ █ █ █ █ █ █ █ █");

  useEffect(() => {
    const domainList = [
      "Technical",
      "Web Dev",
      "Research",
      "SMGD",
    ];

    let currentIndex = 0;
    const matrixInterval = setInterval(() => {
      setMatrixText((prev) => {
        if (currentIndex < domainList.length) {
          return prev.replace(/█/, domainList[currentIndex++]);
        } else {
          clearInterval(matrixInterval);
          return domainList.join(" | ");
        }
      });
    }, 500);

    return () => clearInterval(matrixInterval);
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-hidden flex flex-col justify-center items-center absolute h-full w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#f97317_130%)]">
      {/* Canvas for particle effect */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Logo with hover effect */}
      <motion.div
        className="relative group cursor-pointer z-10"
        onMouseEnter={() => setShowCipher(true)}
        onMouseLeave={() => setShowCipher(false)}
      >
        <motion.img
          src="/mist1.png"
          alt="MIST Logo"
          className="w-90 h-50 transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hidden Easter Egg */}
        {showCipher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-45 left-1/2 transform -translate-x-1/2  text-orange-400 text-sm p-2 rounded"
          >
            Cipher: 3xN7!&*#f@M15t
          </motion.div>
        )}
      </motion.div>

      {/* Typing Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold tracking-wide mt-10 z-10 "
      >
        {text}
        <span className="animate-pulse">|</span> {/* Blinking Cursor */}
      </motion.h1>

      {/* Matrix-style domain decryption */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg mt-4 tracking-widest z-10"
      >
        {matrixText}
      </motion.p>

      {/* Call-to-Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="mt-8 px-8 py-3 bg-orange-600 hover:bg-orange-800 rounded-full shadow-lg transition z-10"
      >
        Explore →
      </motion.button>
    </div>
  );
}
