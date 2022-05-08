import "./App.css";
import "./footer.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import CreateUser from "./CreateUser";
import Footer from './Footer'
import Nav from "./Nav";
import SecureComponent from "./SecureComponent";
import Users from './Users';


function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<SecureComponent />}>
          <Route path='/' element={<CreateUser /> }> </Route>
          <Route path='/users' element={<Users/> }></Route>
          </Route>
          
          <Route path='/login' element={<Login /> }> </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
