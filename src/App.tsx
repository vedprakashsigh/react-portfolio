import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Projects from '@/pages/Projects'
import Resume from '@/pages/Resume'
import Contact from '@/pages/Contact'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Dashboard from '@/pages/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="resume" element={<Resume />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
      </Route>
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  )
}

export default App
