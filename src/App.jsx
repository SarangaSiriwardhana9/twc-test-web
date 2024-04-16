import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import WelcomePage from "./pages/WelcomePage";
import NewContact from "./pages/NewContact";
import Contacts from "./pages/Contacts";
import Error from "./pages/Error";

import PrivateRoute from "./components/PrivateRoute";
import { SnackbarProvider } from 'notistack';

export default function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={3} anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />

          <Route element={<PrivateRoute />}>
            <Route path='/' element={<WelcomePage />} />
            <Route path='/welcome' element={<WelcomePage />} />
            <Route path='/contacts/new' element={<NewContact />} />
            <Route path='/contacts' element={<Contacts />} />
          </Route>

          <Route path='*' element={<Error />} />
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  );
}
