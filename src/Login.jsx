import { useContext, useState } from "react"
import { AuthContext } from "./authContext"
import { Link } from "react-router-dom"
import { createUser, getToken } from "./api"

const CreateUserInput = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userCreated, setUserCrated] = useState('')
  const [editable, setEditable] = useState(false)

  const submit = () => {
    createUser ({ username, password, firstName, lastName})
  }

  return (
    <div className="p-5">
      <button onClick={() => {
        setEditable(true)
        setUserCrated('')
      }}
        >Create User</button>
      <div>
        <div>Username:</div>
        <input readOnly = {!editable}
          onChange={e => setUsername(e.target.value)}
          value={username}
          />
          <div>Password:</div>
        <input readOnly = {!editable}
          type = 'password'
          onChange={e => setPassword(e.target.value)}
          value={password}
          />
        <div>First Name:</div>
        <input readOnly = {!editable}
          onChange={e => setFirstName(e.target.value)}
          value={firstName}
          />
        <div>Last Name:</div>
        <input readOnly = {!editable}
          onChange={e => setLastName(e.target.value)}
          value={lastName}
          />
    </div>
      

      <div style={{ marginTop: 20 }}>
        <button onClick={() => {
          submit()
          setUsername('')
          setPassword('')
          setFirstName('')
          setLastName('')
          setUserCrated('New user created!')
          setEditable(false)
        }
        }
        >Submit</button>
        <h2>{ userCreated }</h2>
      </div>
    </div>
  )
}

function Login() {
  const { auth } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = () => {
    getToken({ auth, username, password})
  }

  return (
    <div className="p-5">
      <h1>Login</h1>
      <div>
        <div>Username:</div>
        <input
          onChange={e => setUsername(e.target.value)}
          value={username}
          />
          <div>Password:</div>
        <input
          type = 'password'
          onChange={e => setPassword(e.target.value)}
          value={password}
          />
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => submit()}>Submit</button>
      </div>

      <hr/>

      <CreateUserInput />
    </div>
  )
}


export default Login