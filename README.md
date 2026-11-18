# Description
    this is a React Next.js project to help me learn how to developp a modern UI with a modern web API to do AI locally with Ollama
    this project depends on another project in gitup for the Web API component:
        AI-01-Document-Analysis-Tutor-Python-api

# How to run and install

Install:
    node.js

Recreate the libs in node_modules
    npm ci

run
    npm run dev


# Purpose of this project: 

I have recently completed the study of several tutorials on AI:
    Ms ai-900
    Ms ai-102
    Google ai engineer
    Coursera: math for ml - linear algebra

As a practice exercise I have developped:
    Node.js with Next.js UI
    depending on: a python FastAPI server for data and calculation

The UI contains the following pages:
    Document: Document Selection Page. Select a document from the document store.
    Analysee: Document Analysis Page: Using Ai service: Document Intelligence / Form Recognizer (Microsoft Azure)
    Knowledge: Semantic Analysis, Extract knowledge from document and create semantic groups (chunks)
    Semantic: Generates semantic representations used for knowledge retrieval, similarity matching, and intelligent search

The FastAPI contains the following routes

    api/store: list, get or add document to a local vault
    api/document: submit document stream to azure document intel service, store result in sqllite
    api/api/knowledge: use document analysis stored and chunk them, then embebedd the chunks, store in sqllite
    api/embeddebd: extract vectorized chunk, receive a question, embed the question, and calculate cosinus similarities

Environment variables
    the Fast API depends on the following variables:
    
        store_path={your path}\Documents
            for PDF documents to analyse

        repo_path={your path}\Repository
            SqlLite db
                document_analysis.db
                    to store PDF document analysis results
                    (will be created autom)
                document_knowledge.db
                    to store PDF analysis knowledge extraction (token)
                    (will be created autom)

        ollama_host=http://localhost:999999

        




