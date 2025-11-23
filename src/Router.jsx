import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css";
import AuthProvider from './contexts/AuthContext';
import LoaderProvider from './contexts/LoaderContext';
import About from './pages/About';
import Account from './pages/Account';
import CreateDiscussion from './pages/CreateDiscussion';
import Discussion from './pages/Discussion';
import Discussions from './pages/Discussions';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Problem from './pages/Problem';
import Problems from './pages/Problems';
import Register from './pages/Register';
import SuggestProblem from './pages/SuggestProblem';

export default function Router(){
    return (
        <BrowserRouter>
            <ToastContainer 
            position="top-center"
            autoClose={750}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable />
            <AuthProvider>
            <LoaderProvider>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/problems" element={<Problems />} />
                    <Route path="/problems/:problem_id" element={<Problem />} />
                    <Route path="/problems/suggest" element={<SuggestProblem />} />
                    <Route path="/discussions" element={<Discussions />} />
                    <Route path="/discussions/create" element={<CreateDiscussion />} />
                    <Route path="/discussions/:discussion_id" element={<Discussion />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </LoaderProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}