export interface IQuotesForm{
    author: string;
    description: string;
    category: string;
}

export interface IQuote{
    id: string;
    author: string;
    description: string;
    category: string;
}

export interface IQuoteAPI {
    [id: string]: IQuote;
}




