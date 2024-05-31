import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./authContext"
import { addReader, createAuthor, createBook, fetchBookList, fetchUser } from "./api"
import axios from "axios"

function App() {

  const { auth } = useContext(AuthContext)
  // const [userFirstName, setUserFirstName] = useState('')
  const [userGreeting, setUserGreeting] = useState('')
  const [bookList, setBookList] = useState([])
  let tempBookList = []
  const [userId, setUserId] = useState(0)

  useEffect(() =>{
    console.log('useEffect bookList =' + bookList)
  }, [bookList])

  const submit = () => {
    fetchUser({ auth })
      .then(response => {
        const firstName = response.data.first_name
        // setUserFirstName(firstName)
        setUserId(response.data.id)
        setUserGreeting(` ${ firstName }'s Book List`)
      })
      .catch(() => setUserGreeting('You are not logged in!'))
      
      fetchBookList({ auth })
      .then(response => {
        console.log(response.data)
        setBookList(response.data)
        tempBookList = response.data
      })
    }
    
    const addBook = () => {
      const bookToAdd = prompt('Enter a book title')
      console.log('title =', bookToAdd)
      fetchBookList ({ auth })
      .then(response => {
        console.log('addBook data =', response.data)
        setBookList(response.data)
        tempBookList = response.data
        let bookTitles = tempBookList.filter(book => book.title.includes(bookToAdd))

        if (bookTitles.length == 1) {

          if (!bookTitles[0].readers.includes(userId)) {
            let bookId = bookTitles[0].id
            console.log('bookID =', bookId)
            console.log('userId = ', userId)
            addReader ({ bookId, userId })
          } else {
            alert('This book is already in your list')
          }

        } else {

          const authorToAdd = prompt("Enter the book's author")
          const addPublished = Number(prompt("Enter the book's published date"))
          createBook ({ auth, title: bookToAdd, published: addPublished, author: authorToAdd, readers: userId })

        }
      })
  }

  return (
    <div className="p-5">
      <h1>Home</h1>
      <button onClick = {() => {
        submit()
      }}>
        Fetch Profile
      </button> 
      
      <button style={{ marginLeft: 20 }}
        onClick = {() => {
        addBook()
      }}>
        Add a Book
      </button>
      <h2> { userGreeting } </h2>
      {bookList.map(book => {
        return book.readers.includes(userId) ? (
          <div key = {book.id}>
            <h3> { book.title } </h3>
          </div>
        ) : null
      })}
    </div>
  )
}


export default App