
import './App.css';
import Form from './Form';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Card from './Card';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
import PaymentSuccessful from './About';
function App() {
return(
  <BrowserRouter>
  <Routes>
   <Route path='/' element={<div><Form/></div>}/>
   <Route path="/add-card" element={<div><Card/></div>}/>
   <Route path='/successful' element={<div><PaymentSuccessful/></div>}/>
   {/* <Route path='*' element={<div><PageNotFound></PageNotFound></div>}/> */}
  </Routes>
  </BrowserRouter>
)
}

export default App;
