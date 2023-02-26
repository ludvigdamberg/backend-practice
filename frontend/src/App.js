import axios from 'axios'
import {useState,useEffect,useRef} from 'react'
import './App.css'


function App() {

  const [users,setUsers] = useState([])
  const [loading,setLoading] = useState(false)
  const [updating,setUpdating] =useState(false)
  const [updateId,setUpdateId] = useState("")
  const [name,setName] = useState("")
  const [age,setAge] = useState(0)
  const nameref = useRef()
  const ageref = useRef()



  const getAllUsers = () => {
    setLoading(true)
    axios.get("http://localhost:5000/users")
    .then(res => {
      setUsers(res.data)
      setLoading(false)
      nameref.current.value = null
      ageref.current.value = null
    })
  }

  const createUser = () => {
    axios.post("http://localhost:5000/save",{name:name,age:age})
    .then(res=> {
      getAllUsers()

    })

  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const deleteUser = (id) => {
    axios.post("http://localhost:5000/delete",{_id:id})
    .then(() => {
      getAllUsers()
      console.log(id)
    })
   
  }

  const updateUser = () => {
    axios.post("http://localhost:5000/updateAge",{_id:updateId,age:age})
    .then((data) => {
      setUpdating(false)
      console.log("success")  
      getAllUsers()
  })
  
}

  return (
    <div>
     {(loading === true) ? (
     <div>Loading...</div>
     ) :(
      <div>
        {users.map((user) => (
          <div key={user._id}>
          <h1>Name: {user.name}</h1>
          <h1>Age: {user.age}</h1>
          <button onClick={() => {deleteUser(user._id)}}>Delete user</button>
          <button onClick={() => {setUpdating(true)
          setUpdateId(user._id)}}>Update user Age</button>
          
          </div>
        ))}
      </div>
     )}
     <div>
      <input ref={nameref} type="text" onChange={(e) => setName(e.target.value)} placeholder="name"/>
      <input ref={ageref} type="number" onChange={(e) => setAge(e.target.value)}placeholder="age"/>
      <button onClick={updating? () => updateUser() : () => createUser()}>{updating ? "Update age" : "Create user"}</button>
     </div>
    </div>
  )


}

export default App;
