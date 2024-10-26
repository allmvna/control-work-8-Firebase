import { Route, Routes } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar.tsx";
import NewQuotes from "../NewQuotes/NewQuotes.tsx";
import QuotesList from "../QuotesList/QuotesList.tsx";
import EditQuote from "../../components/EditQuote/EditQuote.tsx";

const Quotes = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Container maxWidth="lg" sx={{ color: "white" }}>
        <Routes>
          <Route path="/" element={<QuotesList />} />
          <Route path="/quotes" element={<QuotesList />} />
          <Route path="/add-quotes" element={<NewQuotes />} />
          <Route path="/quotes/:idQuote/edit" element={<EditQuote />} />
          <Route
            path="*"
            element={<Typography variant="h2">Not found</Typography>}
          />
        </Routes>
      </Container>
    </>
  );
};

export default Quotes;
