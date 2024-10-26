import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItemText,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axiosAPI from "../../axiosAPI.ts";
import { useCallback, useEffect, useState } from "react";
import { IQuote, IQuoteAPI } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { NavLink } from "react-router-dom";

const QuotesList = () => {
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response: { data: IQuoteAPI } =
        await axiosAPI.get<IQuoteAPI>("quotes.json");

      if (response.data) {
        const quoteFromApi = Object.keys(response.data).map((quoteKey) => {
          return {
            ...response.data[quoteKey],
            id: quoteKey,
          };
        });
        setQuotes(quoteFromApi);

        const uniqueCategories = Array.from(
          new Set(quoteFromApi.map((quote) => quote.category)),
        );
        setCategories(uniqueCategories);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const deleteQuote = async (id: string) => {
    try {
      await axiosAPI.delete(`quotes/${id}.json`);
      void fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const filteredQuotes = selectedCategory
    ? quotes.filter((quote) => quote.category === selectedCategory)
    : quotes;

  return (
    <>
      <Typography
        variant="h4"
        sx={{ mb: 2, textAlign: "center", color: "#000" }}
      >
        Quotes
      </Typography>

      <Grid container spacing={2}>
        <Grid size={3}>
          {categories.length === 0 ? (
            <Alert severity="info">No categories</Alert>
          ) : (

              <List sx={{ border: "1px solid", borderColor: "#000" }}>
                {categories.length === 0 ? (
                    <div>
                      <ListItemText primary="No categories available" />
                    </div>
                ) : (
                    categories.map((category) => (
                        <div
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            style={{
                              borderBottom: "1px solid #c4c2c2",
                              padding: '8px',
                              cursor: 'pointer',
                              backgroundColor: selectedCategory === category ? 'lightblue' : 'transparent',
                            }}
                        >
                          <ListItemText
                              primary={
                                <Typography sx={{ color: selectedCategory === category ? 'blue' : 'black' }}>
                                  {category}
                                </Typography>
                              }
                          />
                        </div>
                    ))
                )}
                <div
                    onClick={() => setSelectedCategory(null)}
                    style={{
                      padding: '8px',
                      cursor: 'pointer',
                      backgroundColor: selectedCategory === null ? 'lightblue' : 'transparent',
                    }}
                >
                  <ListItemText
                      primary={
                        <Typography sx={{ color: selectedCategory === null ? "blue" : "black" }}>
                          All
                        </Typography>
                      }
                  />
                </div>
              </List>
          )}
        </Grid>

        <Grid size={9}>
          {filteredQuotes.length === 0 ? (
            <Alert severity="info">
              There are no quotes yet! Go to the "Add" page to add a new quote.
            </Alert>
          ) : (
            <Grid container spacing={2}>
              {filteredQuotes.map((quote) => (
                <Grid size={12} key={quote.id}>
                  <Card
                    sx={{
                      minWidth: 275,
                      backgroundColor: "inherit",
                      border: "3px solid",
                      borderRadius: "10px",
                      p: 1,
                    }}
                  >
                    <CardContent
                      sx={{
                        backgroundColor: "white",
                        border: "1px solid #9e9e9e",
                        borderRadius: "10px",
                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 20,
                          fontWeight: 600,
                          textAlign: "center",
                        }}
                      >
                        Category: {quote.category}
                      </Typography>
                      <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                        Author: {quote.author}
                      </Typography>
                      <hr />
                      <Typography sx={{ fontSize: 16 }}>
                        Quote: {quote.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <Button
                        component={NavLink}
                        to={`/quotes/${quote.id}/edit`}
                        variant="contained"
                        size="medium"
                        startIcon={<FormatListBulletedIcon />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="medium"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteQuote(quote.id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default QuotesList;
