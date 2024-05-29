import { useContext, useState } from "react"
import { AuthContext } from "./authContext"
import { fetchBookList, fetchUser } from "./api"
import axios from "axios"


function App() {

  const { auth } = useContext(AuthContext)
  const [userFirstName, setUserFirstName] = useState('')
  const [userGreeting, setUserGreeting] = useState('')
  const [bookList, setBookList] = useState([])
  const [userId, setUserId] = useState(0)

  const submit = () => {
    fetchUser({ auth })
      .then(response => {
        console.log(response.data.first_name)
        setUserFirstName(response.data.first_name)
        setUserId(response.data.id)
        console.log(userFirstName)
        setUserGreeting(` ${ userFirstName }'s Book List`)
        return userGreeting
      })
    fetchBookList({ auth })
      .then(response => {
        console.log(response.data)
        setBookList(response.data)
      })
  }

  return (
    <div className="p-5">
      <h1>Home</h1>
      <button onClick = {() => {
        submit()
        }}>Fetch Profile</button>
      <h2> { userGreeting } </h2>
      {bookList.map(book => {
        console.log(book)
        return book.reader.includes(userId) ? (
          <div key = {book.id}>
            <h3> { book.title } </h3>
          </div>
        ) : null
})}
    </div>
  )
}


export default App