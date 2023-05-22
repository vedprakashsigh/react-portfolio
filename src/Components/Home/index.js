import { Link } from 'react-router-dom'
import './index.scss'


const Home = () => {
  return (
    <div className='container home-page'>
        <div className="text-zone">
            <h1>Hi, <br /> I'm Ved Prakash <br/>
            Developer 
            </h1>
            <h2>Frontend Developer | Python Expert</h2>
            <Link to='/contact' className='flat-btn'>CONTACT ME</Link>
        </div>
      
    </div>
  )
}

export default Home
