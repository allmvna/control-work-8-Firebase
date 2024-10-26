import QuotesForm from "../QuotesForm/QuotesForm.tsx";
import {IQuote, IQuotesForm} from "../../types";
import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import axiosAPI from "../../axiosAPI.ts";

const EditQuote = () => {
    const [quote, setQuote] = useState<IQuote>();
    const params = useParams<{ idQuote: string }>();


    const fetchOneQuote = useCallback(async (id: string) => {
        try {
            const response: { data: IQuote } = await axiosAPI<IQuote>(
                `quotes/${id}.json`,
            );
            if (response.data) {
                setQuote(response.data);
            }
        } catch (e) {
            console.error(e);
        }
    }, []);


    useEffect(() => {
        if (params.idQuote) {
            void fetchOneQuote(params.idQuote);
        }
    }, [params.idQuote, fetchOneQuote]);

    const submitForm = async (quoteData: IQuotesForm) => {
        try {
            await axiosAPI.put(`quotes/${params.idQuote}.json`, quoteData);
        } catch (error) {
            console.error(error);
        }
    };
    return quote && (
        <>
            <QuotesForm quoteToEdit = {quote} submitForm={submitForm}/>
        </>
    );
};

export default EditQuote;