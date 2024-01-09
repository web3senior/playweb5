import { Suspense, useState, useEffect } from 'react'
import { useLoaderData, defer, Await, useNavigate, useParams, Link } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import LoadingSpinner from './components/LoadingSpinner'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import Shimmer from './helper/Shimmer'
import Icon from './helper/MaterialIcon'
import UserProfileMonochrome from './../../src/assets/user-profile-monochrome.svg'
import styles from './Album.module.scss'
import Loading from './components/LoadingSpinner'
import MaterialIcon from './helper/MaterialIcon'
import Heading from './helper/Heading'
import { DidKeyMethod, DidDhtMethod, DidIonMethod } from '@web5/dids'
import playweb5Protocol from '../protocols/playweb5.json'

export const loader = async ({ request, params }) => {
  return defer({
    someDataHere: [],
  })
}

export default function Profile({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [albumData, setAlbumData] = useState()
  const [songData, setSongData] = useState()
  const [pfp, setPfp] = useState(null)
  const [song, setSong] = useState(null)
  const auth = useAuth()
  const params = useParams()
  const navigate = useNavigate()

  function changeFile(e) {
    if (!e.target.files || !e.target.files[0]) return

    if (e.target.files[0].size > 8000000) {
      toast.error(`Maximum size for your avatar is 8MB`)
      return false
    }

    const FR = new FileReader()

    FR.addEventListener('load', function (evt) {
      //document.querySelector('#pfpImg').src = evt.target.result
      console.log(evt.target.result)
      setSong(evt.target.result)
    })

    FR.readAsDataURL(e.target.files[0])
  }

  const handleNewSong = async () => {
    auth.connectAgent().then(async ({ web5, userDid }) => {
      auth.installProtocol(playweb5Protocol).then(async (res) => {
        const albumData = {
          '@type': 'song',
          name: document.querySelector('[name="song_name"]').value,
          song_file: song,
          author: auth.userDid,
          recipient: auth.userDid,
        }
        const { record } = await web5.dwn.records.create({
          data: albumData,
          message: {
            published: true,
            protocol: playweb5Protocol.protocol,
            protocolPath: 'song',
            schema: playweb5Protocol.types.song.schema,
            //dataFormat: "audio/mpeg",
            dataFormat: playweb5Protocol.types.song.dataFormats[0],
            author: auth.userDid,
            recipient: auth.mintDIDnode,
          },
          encryption: {
            enabled: true,
          },
        })

        console.log(record)

        const { status } = await record.send(auth.mintDIDnode)
        console.log(status)
        if (status.code === 202 && status.detail === 'Accepted') toast.success(`Your new song created successfully`)
        return record
      })
    })
  }
  const handleNew = async () => {
    auth.connectAgent().then(async ({ web5, userDid }) => {
      auth.installProtocol(playweb5Protocol).then(async (res) => {
        const albumData = {
          '@type': 'album',
          name: document.querySelector('[name="name"]').value,
          description: document.querySelector('[name="description"]').value,
          image: pfp,
          author: auth.userDid,
          recipient: auth.userDid,
        }
        const { record } = await web5.dwn.records.create({
          data: albumData,
          message: {
            published: true,
            protocol: playweb5Protocol.protocol,
            protocolPath: 'album',
            schema: playweb5Protocol.types.album.schema,
            dataFormat: playweb5Protocol.types.album.dataFormats[0],
            author: auth.userDid,
            recipient: auth.mintDIDnode,
          },
          encryption: {
            enabled: true,
          },
        })

        console.log(record)

        const { status } = await record.send(auth.mintDIDnode)
        console.log(status)
        if (status.code === 202 && status.detail === 'Accepted') toast.success(`Your new album created successfully`)
        return record
      })
    })
  }

  function readFile(e) {
    console.log(e)

    if (!e.target.files || !e.target.files[0]) return

    if (e.target.files[0].size > 50000) {
      toast.error(`Maximum size for your avatar is 20KB`)
      return false
    }

    const FR = new FileReader()

    FR.addEventListener('load', function (evt) {
      document.querySelector('#pfpImg').src = evt.target.result
      console.log(evt.target.result)
      setPfp(evt.target.result)
    })

    FR.readAsDataURL(e.target.files[0])
  }

  const handleDelete = async (recordId) => {
    let t = toast.loading(`Deleting...`)

    ReadableStreamDefaultController
    const response = await auth.web5.dwn.records.delete({
      from: auth.mintDIDnode,
      message: {
        recordId: recordId,
        // author: userDid,
      },
    })
    console.log(response)

    if (response.status.code === 202 && response.status.detail === 'Accepted') {
      toast.success(`Deleted successfully`)
      toast.dismiss(t)
    } else toast.error(response.status.detail)
    return response
  }

  const handleQuery = async () => {
    auth.connectAgent().then(({ web5, userDid }) => {
      let t = toast.loading(`Reading albums...`)
      web5.dwn.records
        .query({
          from: auth.mintDIDnode,
          message: {
            filter: {
              protocol: playweb5Protocol.protocol,
              protocolPath: 'album',
              dataFormat: 'application/json',
              // author: userDid,
            },
            dateSort: 'createdDescending',
          },
        })
        .then((response) => {
          console.log(response)

          if (response.records.length < 1) {
            toast.dismiss(t)
            toast(`There is no album`, { icon: '⚠️' })
            return false
          }

          let doctorList = []
          return response.records.forEach(async (record, i) => {
            record.data.json().then((recordData) => {
              console.log(recordData)
              recordData.recordId = record._recordId
              recordData.author = record.author

              doctorList.push(recordData)

              if (++i === response.records.length) {
                setAlbumData(doctorList)
                console.log(doctorList)
                toast.dismiss(t)
              }
            })
          })
        })
    })
  }

  const handleSongQuery = async () => {
    auth.connectAgent().then(({ web5, userDid }) => {
      let t = toast.loading(`Reading albums...`)
      web5.dwn.records
        .query({
          from: auth.mintDIDnode,
          message: {
            filter: {
              protocol: playweb5Protocol.protocol,
              protocolPath: 'song',
              dataFormat: 'application/json',
              // author: userDid,
            },
            dateSort: 'createdDescending',
          },
        })
        .then((response) => {
          console.log(response)

          if (response.records.length < 1) {
            toast.dismiss(t)
            toast(`There is no album`, { icon: '⚠️' })
            return false
          }

          let doctorList = []
          return response.records.forEach(async (record, i) => {
            record.data.json().then((recordData) => {
              console.log(recordData)
              recordData.recordId = record._recordId
              recordData.author = record.author

              doctorList.push(recordData)

              if (++i === response.records.length) {
                setSongData(doctorList)
                console.log(doctorList)
                toast.dismiss(t)
              }
            })
          })
        })
    })
  }

  useEffect(() => {
    handleQuery()
  }, [])

  return (
    <section className={`${styles.section} animate fade`}>
      <div className={`__container`} data-width="medium">
        <div className={`grid grid--fill ${styles.list}`} style={{ '--data-width': '140px' }}>
          {albumData &&
            albumData.map((item, i) => {
              return (
                <div className="card" key={i} title={item.recordId}>
                  <div className="card__body d-flex justify-content-between align-items-center">
                   <Link to={`${item.recordId}`}>
                   <div className="d-flex flex-column">
                      <figure>
                        <img src={item.image} style={{ width: '140px' }} />
                      </figure>
                      <p style={{ textTransform: 'uppercase' }}>{item.name}</p>
                      <div onClick={() => handleDelete(item.recordId)}>
                        <MaterialIcon name="delete" style={{ color: 'red' }} />
                      </div>
                    </div>
                   </Link>
                  </div>
                </div>
              )
            })}
        </div>

            <div className="card mt-20">
              <div className="card__body">
                <ul className="d-flex flex-column" style={{ rowGap: '1rem' }}>
                  <li>
                    <label htmlFor="">Album Name</label>
                    <input type="text" name="name" />
                  </li>
                  <li>
                    <img id="pfpImg" />
                    <label htmlFor="">Album Image</label>
                    <input type="file" name="image" id="" onChange={(e) => readFile(e)} />
                  </li>
                  <li>
                    <label htmlFor="">Description</label>
                    <textarea name="description" id="" cols="30" rows="5"></textarea>
                  </li>
                  <li>
                    <button className="btn" onClick={() => handleNew()}>
                      Save
                    </button>
                  </li>
                </ul>
              </div>
            </div>

      </div>
    </section>
  )
}
