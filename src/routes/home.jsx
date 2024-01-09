import { useEffect, useState } from 'react'
import { useNavigate, defer, useLoaderData, Link } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import Loading from './components/LoadingSpinner'
import { CheckIcon, ChromeIcon, BraveIcon } from './components/icons'
import toast, { Toaster } from 'react-hot-toast'
import LogoCover from './../../src/assets/mindidchain.png'
import Logo from './../assets/logo.svg'
import styles from './Home.module.scss'
import Shimmer from './helper/Shimmer'
import { useAuth, protocolDefinition } from './../contexts/AuthContext'
import { Web5 } from '@web5/api'

export const loader = async () => {
  return defer({
    key: await [],
  })
}

function Home({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState()
  const [data, setData] = useState([])
  const [activeRecipient, setActiveRecipient] = useState(null)
  const auth = useAuth()
  const navigate = useNavigate()

  const handleConnect = async (e) => {
    auth.connectAgent().then((web5) => {
      navigate('/album')
    })
  }

  useEffect(() => {}, [])

  return (
    <>
      {isLoading && <Loading />}
      <section className={styles.section}>
        <div className={`__container`} data-width="medium">
          <div className={`${styles.container} text-center d-flex flex-column align-items-center justify-content-center`}>
            <figure>
              <img src={Logo}/>
            </figure>
            <h1>Bring music to life</h1>

            <button onClick={() => handleConnect()} className={`btn ${styles.connectBtn}`}>
              Connect
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
