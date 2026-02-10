import { BrowserRouter, Routes, Route } from "react-router";

function App() {
    return (
    <>
        <Header/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartupPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/selector" element={<SelectorPage/>}/>
                <Route path="/profile" element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    </>);
}

export default App;
