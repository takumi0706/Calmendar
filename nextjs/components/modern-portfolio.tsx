'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDownIcon, GithubIcon, TwitterIcon, MailIcon, ExternalLinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function ModernPortfolio() {
  const [activeSection, setActiveSection] = useState('summary')
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['summary', 'experience', 'projects', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-900 to-blue-900 text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/10 backdrop-blur-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Takumi Oyamada
          </motion.h1>
          <motion.div 
            className="flex space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {['summary', 'experience', 'projects', 'contact'].map((section) => (
              <a 
                key={section}
                href={`#${section}`} 
                className={`text-sm uppercase tracking-wider hover:text-primary transition-colors duration-200 ${activeSection === section ? 'text-primary font-bold' : 'text-primary-foreground'}`}
              >
                {section}
              </a>
            ))}
          </motion.div>
        </nav>
      </header>

      <main className="container mx-auto px-4 pt-24">
        <motion.section 
          className="h-screen flex flex-col justify-center items-center text-center"
          style={{ opacity, scale }}
        >
          <motion.h2 
            className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Student Engineer & Systems Designer
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Based in Kanazawa 🏡 Exploring Technology 🌐 Working Across Japan
          </motion.p>
          <motion.div 
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20" asChild>
              <a href="https://github.com/takumi0706" target="_blank" rel="noopener noreferrer">
                <GithubIcon className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20" asChild>
              <a href="https://twitter.com/1ye_q" target="_blank" rel="noopener noreferrer">
                <TwitterIcon className="mr-2 h-4 w-4" /> Twitter
              </a>
            </Button>
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20" asChild>
              <a href="mailto:ganndamu0706@gmail.com">
                <MailIcon className="mr-2 h-4 w-4" /> Email
              </a>
            </Button>
          </motion.div>
        </motion.section>

        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDownIcon className="h-8 w-8 text-white/60" />
        </motion.div>

        <motion.section 
          id="summary" 
          className="py-16"
          {...fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Summary</h2>
          <p className="text-lg leading-relaxed text-gray-300">
            Backend development and problem-solving are my passion. I enjoy creating scalable systems and efficient software architectures, with a current focus on RESTful API development using Spring Boot and frontend development with Next.js. I'm also building foundational knowledge in infrastructure to enhance my overall skill set. My belief is rooted in doing things that bring joy to others and providing offerings that make people happy.
          </p>
        </motion.section>

        <motion.section 
          id="experience" 
          className="py-16"
          {...fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Experience</h2>
          <Tabs defaultValue="work" className="w-full">
            <TabsList className="w-full justify-start bg-white/10 text-white">
              <TabsTrigger value="work" className="data-[state=active]:bg-white/20">Work History</TabsTrigger>
              <TabsTrigger value="education" className="data-[state=active]:bg-white/20">Education</TabsTrigger>
            </TabsList>
            <TabsContent value="work">
              <Card className="bg-white/10 border-white/20 text-white">
                <CardHeader>
                  <CardTitle>Intern, Frontend & Backend Developer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Kyoto Development Institute</p>
                  <p>Apr 2024 - Present</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="education">
              <Card className="bg-white/10 border-white/20 text-white">
                <CardHeader>
                  <CardTitle>Kanazawa University</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>School of Electronics, Information and Communication Sciences</p>
                  <p>2023 - Present</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.section>

        <motion.section 
          id="projects" 
          className="py-16"
          {...fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors duration-200">
              <CardHeader>
                <CardTitle>Calmendar</CardTitle>
              </CardHeader>
              <CardContent>
                <p>A chat-style calendar management app</p>
                <Button variant="outline" className="mt-4 bg-white/10 hover:bg-white/20 border-white/20" asChild>
                  <a href="https://calmendar.com/" target="_blank" rel="noopener noreferrer">
                    View Project <ExternalLinkIcon className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <motion.section 
          id="contact" 
          className="py-16"
          {...fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Contact</h2>
          <p className="text-lg mb-4 text-gray-300">I'm available for interesting projects. Let's work together!</p>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" asChild>
            <a href="mailto:ganndamu0706@gmail.com">Get in Touch</a>
          </Button>
        </motion.section>
      </main>

      <footer className="bg-background/10 text-center py-8 mt-16">
        <p className="text-gray-400">© 2024 Takumi Oyamada. All rights reserved.</p>
      </footer>
    </div>
  )
}