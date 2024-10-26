import QuotesForm from "../QuotesForm/QuotesForm";
import { IQuote } from "../../types";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axiosAPI from "../../axiosAPI";

const EditQuote = () => {
  const [quote, setQuote] = useState<IQuote>();
  const { idQuote } = useParams<{ idQuote: string  }>();

  const fetchOneQuote = useCallback(async (id: string) => {
    try {
      const response = await axiosAPI.get<IQuote>(`quotes/${id}.json`);
      if (response.data) {
        setQuote(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (idQuote) {
      void fetchOneQuote(idQuote);
    }
  }, [idQuote, fetchOneQuote]);

  return <QuotesForm quoteToEdit={quote} idQuote={idQuote || ''} />;
};

export default EditQuote;
