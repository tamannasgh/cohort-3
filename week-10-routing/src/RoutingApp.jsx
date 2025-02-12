import { BrowserRouter, Routes, Route, Link, Outlet, useParams } from "react-router-dom"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/todo/:id" element={<Todo />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

function Layout() {
  return (
    <>
      <header>
        <Link to="/">home</Link>
        <Link to="/about">about</Link>
        <Link to="/contact">contact</Link>
        <Link to="/todo/1">todo/1</Link>
        <Link to="/todo/2">todo/2</Link>
      </header>
      <Outlet />
      <h1>Footer</h1>
    </>
  )
}


function Home() {
  return <h1>Home</h1>;

}
function About() {
  return <h1>About</h1>;
}
function Contact() {
  return <h1>Contact</h1>;
}

function Todo() {

  // const params = useParams();
  // const id = params.id;

  const { id } = useParams();

  return <h1>Todo no {id}</h1>;
}

function Error() {
  return <h1>there is no page like this.</h1>;
}

export default App
