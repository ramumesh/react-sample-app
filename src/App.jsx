import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './components/pages/Welcome/Welcome';
import { PATHS } from './common/constant';
import Login from './components/pages/Login/Login';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Chat from './components/pages/Chat/Chat';
import LoginSuccess from './components/pages/LoginSuccess/LoginSuccess';
import UsersList from './components/pages/UsersList/UsersList';
import DocumentList from './components/pages/DocumentList/DocumentList';
import Register from './components/pages/Register/Register';
import RegisterSuccess from './components/pages/RegisterSuccess/RegisterSuccess';
import EditUser from './components/pages/EditUser/EditUser';

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path={PATHS.WELCOME} element={<Welcome />} />
      <Route path={PATHS.LOGIN} element={<Login />} />
      <Route path={PATHS.REGISTER} element={<Register />} />
      <Route path={PATHS.REGISTER_SUCCESS} element={<RegisterSuccess />} />
      <Route path={PATHS.DASHBOARD} element={<Dashboard />}>
        <Route index element={<LoginSuccess />} />
        <Route path={PATHS.CHAT} element={<Chat />} />
        <Route path={PATHS.USERS} element={<UsersList />} />
        <Route path={PATHS.DOCUMENTS} element={<DocumentList />} />
        <Route path={PATHS.EDIT_USER} element={<EditUser />} />
      </Route>
    </Routes>
  </BrowserRouter>;
}

export default App;
