import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from './component/Loader'
export default () => {
  const [nameArtist, setName] = useState({name: '', body: ''})
  const [artists, getArtists] = useState([])
  const [loader, getLoader] = useState(true)
  useEffect(()=>{
    axios.get('http://localhost:8080/')
    .then(res => {
      console.log(res.data);
      getArtists(res.data)
      console.log(artists)
      getLoader(false)
    })
    .catch(err => (console.log('Не смог получит данные с сервера',err.message)))
  }, [])
  const comptWillUpdate = () => {
    axios.get('http://localhost:8080/')
    .then(res => {
      console.log(res.data);
      getArtists(res.data)
      console.log(artists)
      getLoader(false)
    })
    .catch(err => (console.log('Не смог получит данные с сервера',err.message)))
  }
  const submit = (event) => {
    event.preventDefault();
    const payload = {
      name: nameArtist.name
    }
    axios({
      url: 'http://localhost:8080',
      method: 'POST',
      data: payload
    })
    .then(() => {
      console.log('Данные ушли на сервер')
      resetInputs();
      comptWillUpdate();
      // useEffect(()=>{
      //   axios.get('http://localhost:8080/')
      //   .then(res => {
      //     console.log(res.data);
      //     getArtists(res.data)
      //     console.log(artists)
      //     getLoader(false)
      //   })
      //   .catch(err => (console.log('Не смог получит данные с сервера',err.message)))
      // })
    })
    .catch((err) => {
      console.log(err.message)
      console.log('Не удалось отправить данные на сервер')
    });
  }
  const resetInputs = () => {
    setName({name: '', body: ''})
  }
  return(
    
    <div className="App">
      <h2>Welcome to my App</h2>
      <form onSubmit={submit}>
        <div className="form-input">
          <input 
            type="text"
            name="name"
            value={nameArtist.name}
            placeholder="Введите имя Артиста"
            onChange={(e) => {setName({[e.target.name]: e.target.value, body: nameArtist.body})}}
          />
        </div>
        <div className="form=input">
          <textarea
            name="body"
            cols="30"
            rows="10"
            onChange={(e) => {setName({[e.target.name]: e.target.value, name: nameArtist.name})}}
          ></textarea>
          <h1>{nameArtist.name}</h1>
          <h1>{nameArtist.body}</h1>
          <button>Добавить</button>
        </div>
      </form>
      <div className="wrap-artist">
        {
          loader ? <Loader/> : artists.map( art => (<p className="elem-artist" key={art._id}>{art.name}</p>))
        }
      </div>
    </div>
  )
}