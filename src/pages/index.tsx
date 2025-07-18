
"use client"

import { useEffect, useRef, useState } from "react"
import {
  ChevronRight,
  Github,
  Mail,
  Phone,
  Linkedin,
  Code,
  Brain,
  Zap,
  Rocket,
  Star,
  Cpu,
  Database,
  Globe,
  Terminal,
  Sparkles,
  Mic,
  Eye,
  Download,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { motion } from "framer-motion"
import VanillaTilt from "vanilla-tilt"
import Link from "next/link"
import Image from "next/image"

export default function Portfolio() {
  const refScrollContainer = useRef(null)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [currentText, setCurrentText] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState<number>(0)
  const [count, setCount] = useState<number>(0)

  const introTexts = [
    "Hi, I&apos;m Vislavath Vishal Raj.",
    "Crafting lifelike AI avatars with real-time speech.",
    "Pushing boundaries in generative AI and machine learning.",
    "Building intelligent systems that see, speak, and evolve.",
  ]

  // Typewriter effect with neon cursor
  useEffect(() => {
    const text = introTexts[currentText] ?? ""
    let index = 0
    setDisplayText("")
    setIsTyping(true)

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)
        setTimeout(() => {
          setCurrentText((prev) => (prev + 1) % introTexts.length)
        }, 2000)
      }
    }, 80)

    return () => clearInterval(typeInterval)
  }, [currentText])

  // Smooth scrolling with locomotive-scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-link")

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      })
    }

    function handleScroll() {
      let current = ""
      setIsScrolled(window.scrollY > 0)

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? ""
        }
      })

      navLinks.forEach((li) => {
        li.classList.remove("nav-active")
        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active")
        }
      })
    }

    void getLocomotive()
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Card tilt effect with enhanced glare
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"))
    VanillaTilt.init(tilt, {
      speed: 400,
      glare: true,
      "max-glare": 0.3,
      gyroscope: true,
      perspective: 800,
      scale: 1.05,
    })
  }, [])

  // Carousel state
  useEffect(() => {
    if (!carouselApi) return

    setCount(carouselApi.scrollSnapList().length)
    setCurrent(carouselApi.selectedScrollSnap() + 1)

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1)
    })
  }, [carouselApi])

  const skills = [
    { name: "JavaScript", category: "Languages", icon: <Code className="w-4 h-4" /> },
    { name: "Python", category: "Languages", icon: <Terminal className="w-4 h-4" /> },
    { name: "C", category: "Languages", icon: <Code className="w-4 h-4" /> },
    { name: "C++", category: "Languages", icon: <Code className="w-4 h-4" /> },
    { name: "Java", category: "Languages", icon: <Code className="w-4 h-4" /> },
    { name: "React.js", category: "Frontend", icon: <Globe className="w-4 h-4" /> },
    { name: "Next.js", category: "Frontend", icon: <Globe className="w-4 h-4" /> },
    { name: "Tailwind CSS", category: "Frontend", icon: <Sparkles className="w-4 h-4" /> },
    { name: "Node.js", category: "Backend", icon: <Cpu className="w-4 h-4" /> },
    { name: "Express.js", category: "Backend", icon: <Cpu className="w-4 h-4" /> },
    { name: "MongoDB", category: "Databases", icon: <Database className="w-4 h-4" /> },
    { name: "MySQL", category: "Databases", icon: <Database className="w-4 h-4" /> },
    { name: "PostgreSQL", category: "Databases", icon: <Database className="w-4 h-4" /> },
    { name: "PyTorch", category: "AI Tools", icon: <Brain className="w-4 h-4" /> },
    { name: "TensorFlow", category: "AI Tools", icon: <Brain className="w-4 h-4" /> },
    { name: "Diffusion Models", category: "AI Tools", icon: <Brain className="w-4 h-4" /> },
    { name: "TTS Models", category: "AI Tools", icon: <Brain className="w-4 h-4" /> },
    { name: "Hugging Face", category: "AI Tools", icon: <Brain className="w-4 h-4" /> },
    { name: "Git", category: "Dev Tools", icon: <Github className="w-4 h-4" /> },
    { name: "GitHub", category: "Dev Tools", icon: <Github className="w-4 h-4" /> },
    { name: "Vercel", category: "Dev Tools", icon: <Rocket className="w-4 h-4" /> },
    { name: "Prompt Engineering", category: "Other", icon: <Zap className="w-4 h-4" /> },
    { name: "TTS", category: "Other", icon: <Mic className="w-4 h-4" /> },
    { name: "Lip Sync Models", category: "Other", icon: <Eye className="w-4 h-4" /> },
    { name: "Generative Media", category: "Other", icon: <Sparkles className="w-4 h-4" /> },
  ]

  const projects = [
    {
      title: "Smartify",
      period: "Oct 2024 to Jan 2025",
      role: "Lead Developer",
      description:
        "Developed a voice-enabled IoT automation system using ESP32-S3 and ESP32 boards for offline and real-time control of appliances like lights and fans. Integrated WebSockets for seamless, low-latency communication between devices and the control interface, enabling robust voice command processing.",
      achievements: [
        "Achieved male voice command recognition accuracy >85%",
        "Enabled offline and real-time device control with <1s response time via WebSockets",
        "Improved home automation efficiency by 30% through optimized firmware",
        "Supported multi-device synchronization for smart home ecosystems",
      ],
      stack: ["C++", "Python", "ESP32", "EdgeImpulse", "WebSockets"],
      github: "github.com/VVR-008/Smartify",
      status: "Completed",
      image: "/assets/smartify.png",
      href: "github.com/VVR-008/Smartify",
    },
    {
      title: "AvatarLab",
      period: "Feb–July 2025",
      role: "Lead Developer",
      description:
        "Developed a comprehensive pipeline for generating lifelike talking head videos from text input, achieving avatar responses in under 3 seconds. Integrated DiffDub for realistic facial dynamics and Small-E TTS for highly expressive, multilingual speech synthesis. Optimized for accessibility and cross-platform compatibility, enabling applications in education, entertainment, virtual assistants, and customer service automation.",
      achievements: [
        "Trained on RTX 4090, reduced inference time by 40% through model optimization",
        "Achieved lip-sync accuracy >90% using advanced facial animation models",
        "Supported multilingual speech synthesis in 5+ languages with Small-E TTS",
        "Enabled real-time video streaming with <500ms latency via WebRTC",
        "Integrated with .js frontend for seamless user interaction",
      ],
      stack: ["PyTorch", "DiffDub", "Small-E", "Next.js"],
      github: "github.com/VVR-008/AvatarLab",
      status: "Completed",
      image: "/assets/avatarlab.png",
      href: "github.com/VVR-008/AvatarLab",
    },
  ]

  const certifications = [
    {
      title: "Electronic Arts – Frontend Engineer Simulation",
      description: "Built SSR/SSG pages using Next.js, ensured accessibility, tested with Jest and Cypress.",
      icon: <Code className="w-6 h-6 text-primary" />,
    },
    {
      title: "Accenture – Backend Simulation",
      description: "Debugged production Python, optimized search algorithms, applied cybersecurity principles.",
      icon: <Brain className="w-6 h-6 text-primary" />,
    },
    {
      title: "AI-Powered Analytics – The Forage",
      description: "Analyzed financial data with AI tools, generated insights, built business intelligence reports.",
      icon: <Zap className="w-6 h-6 text-primary" />,
    },
  ]

  const values = ["Problem Solver", "Innovator", "Curious Thinker", "Code Whisperer", "AI Dreamer"]

  return (
    <div ref={refScrollContainer} className="relative min-h-screen bg-gray-900 text-white font-orbitron">
      {/* Particle Background */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="particles animate-float">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-cyan-400/30 rounded-full w-1 h-1 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>
      <Gradient />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/50 backdrop-blur-sm border-b border-cyan-400/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 clash-grotesk">
              Vislavath Vishal Raj
            </div>
            <div className="hidden md:flex space-x-8">
              {["home", "about", "projects", "certifications", "skills", "contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item}`}
                  className="nav-link relative text-gray-400 hover:text-cyan-400 transition-colors duration-300 group"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        data-scroll-section
        className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between px-4 sm:px-2 md:px-6 lg:px-8"
      >
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-row items-center space-x-1.5"
          >
           
          </motion.div>
          <div>
            <motion.h1
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 2xl:text-8xl"
            >
              {displayText}
              {isTyping && (
                <span className="animate-pulse text-cyan-400 shadow-glow">|</span>
              )}
            </motion.h1>
            <motion.p
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-1 max-w-lg tracking-tight text-gray-400 2xl:text-xl"
            >
              B.Tech Computer Science Student (2023–2027) from Keshav Memorial Institute of Technology (KMIT), Secunderabad, Telangana, India, passionate about contributing to cutting-edge projects in AI/ Machine learning.
            </motion.p>
          </div>
          <motion.div
            data-scroll
            data-scroll-enable-touch-speed
            data-scroll-speed=".06"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-row items-center space-x-1.5 pt-6"
          >
            <Link href="mailto:vvr484324@gmail.com">
              <Button className="bg-cyan-400/20 text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/50 hover:shadow-glow transition-all duration-300">
                Get in touch <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-purple-400/30 text-purple-400 hover:bg-purple-400/20 hover:shadow-glow transition-all duration-300"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn more
            </Button>
            <Link href="/assets/resume.pdf" target="_blank" download>
            <Button className="bg-cyan-400/20 text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/50 hover:shadow-glow transition-all duration-300">
                 Download Resume <Download className="ml-1 h-4 w-4" />
            </Button>
            </Link>
          </motion.div>
          <motion.div
            className={`flex items-center space-x-2 text-gray-400 ${isScrolled ? "opacity-0" : "opacity-100"} transition-opacity`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isScrolled ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            Scroll to discover <span className="mt-1 animate-bounce text-cyan-400">↓</span>
          </motion.div>
        </div>
        <motion.div
          data-scroll
          data-scroll-speed="-.01"
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1 }}
          className="mt-14 h-full w-full xl:mt-0 flex justify-center"
        >
          <div className="relative w-80 h-80 rounded-full border-4 border-cyan-400/50 animate-pulse bg-gradient-to-r from-cyan-400/20 to-pink-500/20 p-2 shadow-glow">
            <div className="w-full h-full rounded-full bg-gray-900/50 flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/vvr.jpeg?height=500&width=500"
                alt="Vislavath Vishal Raj"
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-full transform hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="absolute top-4 right-4 w-4 h-4 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="absolute bottom-8 left-8 w-3 h-3 bg-pink-500 rounded-full animate-bounce animation-delay-500"></div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" data-scroll-section>
        <div
          data-scroll
          data-scroll-speed=".4"
          data-scroll-position="top"
          className="my-14 flex max-w-6xl mx-auto flex-col justify-start space-y-10 px-4 sm:px-2 md:px-6 lg:px-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="py-16 pb-2 text-3xl font-light leading-normal tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 xl:text-[40px]"
          >
        I&apos;m an aspiring AI Engineer and full-stack developer proficient in
            since 2023. My experience includes building lifelike AI avatars and intelligent systems, contributing to innovative projects in AI, machine learning, and voice automation.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8 xl:grid-cols-3"
          >
            <div className="flex flex-col items-center text-center xl:items-start xl:text-start">
              <span className="clash-grotesk bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 text-4xl font-semibold tracking-tight xl:text-6xl">2023–2027</span>
              <span className="tracking-tight text-gray-400 xl:text-lg">Academic Year</span>
            </div>
            <div className="flex flex-col items-center text-center xl:items-start xl:text-start">
              <span className="clash-grotesk bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 text-4xl font-semibold tracking-tight xl:text-6xl">Hyderabad</span>
              <span className="tracking-tight text-gray-400 xl:text-lg">Location</span>
            </div>
            <div className="flex flex-col items-center text-center xl:items-start xl:text-start">
              <span className="clash-grotesk bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 text-4xl font-semibold tracking-tight xl:text-6xl">5+</span>
              <span className="tracking-tight text-gray-400 xl:text-lg">Technologies Mastered</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, staggerChildren: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">Core Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center space-x-4 p-4 bg-gray-800/20 backdrop-blur-sm rounded-lg border border-cyan-400/30 hover:border-cyan-400/80 hover:shadow-glow transition-all duration-300"
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full animate-pulse"></div>
                  <span className="text-white font-medium">{value}</span>
                  <Star className="ml-auto w-4 h-4 text-yellow-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" data-scroll-section>
        <div className="relative isolate -z-10">
          <div
            className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-cyan-400 via-purple-400 to-pink-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
        <div data-scroll data-scroll-speed=".4" className="my-64 max-w-6xl mx-auto px-4 sm:px-2 md:px-6 lg:px-8">
          <span className="text-sm font-semibold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 clash-grotesk">✨ Projects</span>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-3 text-4xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 xl:text-6xl"
          >
            Where Ideas Take Form
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-1.5 text-base tracking-tight text-gray-400 xl:text-lg"
          >
            Explore my work in AI and machine learning, from lifelike avatars to IoT automation.
          </motion.p>
          <div className="mt-14">
            <Carousel setApi={setCarouselApi} className="w-full">
              <CarouselContent>
                {projects.map((project) => (
                  <CarouselItem key={project.title} className="basis-full md:basis-1/2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Card id="tilt" className="bg-gray-800/20 backdrop-blur-sm border-cyan-400/30 hover:border-cyan-400/80 hover:shadow-glow">
                        <CardHeader className="p-0">
                          <Link href={project.href} target="_blank">
                            <Image
                              src={project.image}
                              alt={project.title}
                              width={600}
                              height={400}
                              className="aspect-video h-full w-full rounded-t-md object-cover"
                              loading="lazy"
                            />
                          </Link>
                        </CardHeader>
                        <CardContent className="p-6">
                          <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">{project.title}</CardTitle>
                          <p className="text-sm text-gray-400 mt-2">{project.period} | {project.role}</p>
                          <p className="text-sm text-gray-400 mt-2">{project.description}</p>
                          <div className="mt-4 space-y-2">
                            {project.achievements.map((achievement, i) => (
                              <div key={i} className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                                <span className="text-sm text-gray-400">{achievement}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.stack.map((tech, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-full text-xs bg-cyan-400/20 text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/30 transition-all duration-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          {project.github && (
                            <Link href={project.github} className="mt-4 flex items-center space-x-2 text-cyan-400 hover:text-cyan-300">
                              <Github className="w-4 h-4" />
                              <span className="text-sm">View on GitHub</span>
                            </Link>
                          )}
                          <span className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-600/20 text-green-400 border border-green-500/30">
                            {project.status}
                          </span>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-gray-800/50 text-cyan-400 hover:bg-cyan-400/20" />
              <CarouselNext className="bg-gray-800/50 text-cyan-400 hover:bg-cyan-400/20" />
            </Carousel>
            <div className="py-2 text-center text-sm text-gray-400">
              <span className="font-semibold">{current} / {count}</span> projects
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" data-scroll-section>
        <div
          data-scroll
          data-scroll-speed=".4"
          data-scroll-position="top"
          className="my-24 flex flex-col justify-start space-y-10 max-w-6xl mx-auto px-4 sm:px-2 md:px-6 lg:px-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 xl:text-6xl"
          >
            My Learning Odyssey
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, staggerChildren: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 p-6 bg-gray-800/20 backdrop-blur-sm rounded-lg border border-cyan-400/30 hover:border-cyan-400/80 hover:shadow-glow transition-all duration-300"
              >
                <div className="flex-shrink-0 p-4 rounded-lg bg-cyan-400/20">{cert.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">{cert.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{cert.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" data-scroll-section>
        <div
          data-scroll
          data-scroll-speed=".4"
          data-scroll-position="top"
          className="my-24 flex flex-col justify-start space-y-10 max-w-6xl mx-auto px-4 sm:px-2 md:px-6 lg:px-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 xl:text-6xl"
          >
            Arsenal
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, staggerChildren: 0.5 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {["Languages", "Frontend", "Backend", "Databases", "AI Tools", "Dev Tools", "Other"].map((category) => (
              <div key={category}>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-6 text-center">{category}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                        transition={{ duration: 0.3 }}
                        className="group relative p-4 bg-gray-800/20 backdrop-blur-sm rounded-lg border border-cyan-400/30 hover:border-cyan-400/80 hover:shadow-glow transition-all duration-300 text-center"
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className="text-cyan-400 group-hover:text-pink-500 transition-colors">{skill.icon}</div>
                          <span className="text-sm text-gray-400 group-hover:text-cyan-400 transition-colors font-medium">
                            {skill.name}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-pink-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" data-scroll-section className="my-64">
        <div
          data-scroll
          data-scroll-speed=".4"
          data-scroll-position="top"
          className="flex flex-col items-center justify-center rounded-lg bg-gray-800/20 backdrop-blur-sm px-8 py-16 text-center xl:py-24 max-w-6xl mx-auto border border-cyan-400/30"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-medium tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 xl:text-6xl"
          >
         Let&apos;s Build <span className="clash-grotesk">the Future</span>      </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-1.5 text-base tracking-tight text-gray-400 xl:text-lg"
          >
            Let&apos;s connect and build the future of AI together. Whether it&apos;s a project collaboration, research opportunity, or just a tech conversation, I&apos;m always excited to meet fellow innovators.
          </motion.p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8 w-full">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4 p-6 bg-gray-800/20 backdrop-blur-sm rounded-lg border border-cyan-400/30 hover:border-cyan-400/80 hover:shadow-glow transition-all duration-300"
              >
                <div className="p-3 bg-cyan-400/20 rounded-lg">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Email</p>
                  <p className="text-white font-medium">vvr484324@gmail.com</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4 p-6 bg-gray-800/20 backdrop-blur-sm rounded-lg border border-cyan-400/30 hover:border-cyan-400/80 hover:shadow-glow transition-all duration-300"
              >
                <div className="p-3 bg-cyan-400/20 rounded-lg">
                  <Phone className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Phone</p>
                  <p className="text-white font-medium">+91 9492430815</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4 p-6 bg-gray-800/20 backdrop-blur-sm rounded-lg border border-cyan-400/30 hover:border-cyan-400/80 hover:shadow-glow transition-all duration-300"
              >
                <div className="p-3 bg-cyan-400/20 rounded-lg">
                  <Github className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">GitHub</p>
                  <p className="text-white font-medium">github.com/VVR-008</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex justify-center space-x-4"
              >
                <Link href="https://github.com/VVR-008" className="group p-4 bg-gray-800/20 backdrop-blur-sm rounded-lg border border-cyan-400/30 hover:border-cyan-400/80 hover:bg-cyan-400/10 hover:shadow-glow transition-all duration-300">
                  <Github className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transform group-hover:scale-110 transition-transform" />
                </Link>
                <Link href="#" className="group p-4 bg-gray-800/20 backdrop-blur-sm rounded-lg border border-cyan-400/30 hover:border-cyan-400/80 hover:bg-cyan-400/10 hover:shadow-glow transition-all duration-300">
                  <Linkedin className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transform group-hover:scale-110 transition-transform" />
                </Link>
                <Link href="mailto:vvr484324@gmail.com" className="group p-4 bg-gray-800/20 backdrop-blur-sm rounded-lg border border-cyan-400/30 hover:border-cyan-400/80 hover:bg-cyan-400/10 hover:shadow-glow transition-all duration-300">
                  <Mail className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transform group-hover:scale-110 transition-transform" />
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-cyan-400/20 to-pink-500/20 rounded-full flex items-center justify-center border-2 border-cyan-400/30 animate-pulse">
                  <Rocket className="w-16 h-16 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">Ready to Collaborate?</h3>
                <p className="text-gray-400 leading-relaxed max-w-md">
                  Let&apos;s connect and build innovative AI solutions together. Whether it&apos;s a project collaboration or a tech conversation, I&apos;m excited to meet fellow innovators.                </p>
                <Link href="mailto:vvr484324@gmail.com">
                  <Button className="mt-6 bg-cyan-400/20 text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/50 hover:shadow-glow transition-all duration-300">
                    Start a Conversation
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 sm:px-2 md:px-6 lg:px-8 border-t border-cyan-400/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Vislavath Vishal Raj. Crafted with passion for AI and innovation.
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 ml-2">Building tomorrow&apos;s intelligent systems, today.</span>
          </p>
        </div>
      </footer>
    </div>
  )
}

function Gradient() {
  return (
    <>
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".2"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#06b6d4" />
              <stop offset={1} stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".2"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8b5cf6" />
              <stop offset={1} stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  )
}
