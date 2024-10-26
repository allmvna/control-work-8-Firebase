import {Button, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {useEffect, useState} from "react";
import {IQuotesForm} from "../../types";

const initialState = {
    author: "",
    description: "",
    category: "",
};

interface QuotesFormProps {
    quoteToEdit?: IQuotesForm;
    submitForm:  (quote: IQuotesForm) => Promise<void>;
}

const QuotesForm: React.FC<QuotesFormProps> = ({quoteToEdit, submitForm}) => {
    const [form, setForm] = useState<IQuotesForm>({...initialState});

    useEffect(() => {
        if (quoteToEdit) {
            setForm(prevState => ({
                ...prevState,
                ...quoteToEdit,
            }));
        }
    }, [quoteToEdit]);

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSelectChange = (e: SelectChangeEvent) => {
        setForm((prevState) => ({
            ...prevState,
            category: e.target.value,
        }));
    };

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await submitForm(form);
            setForm(initialState);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Typography
                sx={{ mb: 2, textAlign: "center", color: "#000" }}
                variant="h4"
            > {quoteToEdit ? "Edit quote" : "Add new quote"}
            </Typography>
                <form onSubmit={onSubmitForm}>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            mx: "auto",
                            width: "60%",
                            border: "3px solid #000",
                            borderRadius: "10px",
                            p: 4,
                        }}
                    >
                        <Grid size={12}>
                            <Select
                                sx={{ width: "100%", backgroundColor: "white", borderRadius: "10px" }}
                                labelId="category-select-label"
                                id="category-select"
                                value={form.category}
                                onChange={onSelectChange}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    Select category
                                </MenuItem>
                                <MenuItem value="Star Wars">Star Wars</MenuItem>
                                <MenuItem value="Famous people">Famous people</MenuItem>
                                <MenuItem value="Saying">Saying</MenuItem>
                                <MenuItem value="Humour">Humour</MenuItem>
                                <MenuItem value="Motivational">Motivational</MenuItem>
                            </Select>
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                sx={{
                                    width: "100%",
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                }}
                                id="outlined-basic"
                                label="Author"
                                variant="outlined"
                                name="author"
                                value={form.author}
                                onChange={onChangeField}
                                required
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                sx={{
                                    width: "100%",
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                }}
                                id="outlined-basic"
                                label="Enter quotes"
                                variant="outlined"
                                name="description"
                                value={form.description}
                                onChange={onChangeField}
                                required
                            />
                        </Grid>
                        <Grid size={12} sx={{ textAlign: "center" }}>
                            <Button size="large" type="submit" variant="contained">
                                {quoteToEdit ? "Edit" : "Add"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
        </>
    );
};

export default QuotesForm;
