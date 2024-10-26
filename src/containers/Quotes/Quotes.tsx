import {Route, Routes} from "react-router-dom";
import {Container} from "@mui/material";
import NavBar from "../../components/NavBar/NavBar.tsx";
import NewQuotes from "../NewQuotes/NewQuotes.tsx";
import QuotesList from "../QuotesList/QuotesList.tsx";

const Quotes = () => {
    return (
        <>
            <header>
                <NavBar/>
            </header>
            <Container maxWidth="lg" sx={{color: "white"}}>
                <Routes>
                    <Route path="/" element={<QuotesList/>}/>
                    <Route path="/quotes" element={<QuotesList/>}/>
                    <Route path="/add-quotes" element={<NewQuotes/>}/>
                </Routes>
            </Container>
        </>
    );
};

export default Quotes;