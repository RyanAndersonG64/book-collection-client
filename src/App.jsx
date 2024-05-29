import { useContext } from "react"
import { AuthContext } from "./authContext"
import { fetchUser } from "./api"
import axios from "axios"


function App() {
  const { auth } = useContext(AuthContext)

  const submit = () => {
    fetchUser({ auth })
  }

  return (
    <div className="p-5">
      <h1>Home</h1>
      <button onClick = {() => {
        submit()
        return (
          <h2> { response.username } </h2>
        )
        }}>Fetch Profile</button>
    </div>
  )
}


export default App