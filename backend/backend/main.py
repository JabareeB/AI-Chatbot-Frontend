import os
import json
import traceback
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain_text_splitters import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_community.chat_models import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from pinecone import Pinecone

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

class QueryRequest(BaseModel):
    query: str  

chat_history = []

def load_json_documents(file_paths):
    documents = []
    for file_path in file_paths:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            if isinstance(data, dict):
                for key, value in data.items():
                    text = f"{key}: {value}"
                    documents.append({"text": text, "source": file_path})
            elif isinstance(data, list):
                for obj in data:
                    text = "\n".join([f"{key}: {value}" for key, value in obj.items()])
                    documents.append({"text": text, "source": file_path})
    return documents

# Endpoint to handle ingestion
@app.post("/ingest")
async def ingest_data():
    try:
        print("Ingesting data...")

        json_files = [
            "datasource/degree.json",
            "datasource/Department.json",
            "datasource/advising.json",
            "datasource/academic_resources.json",
            "datasource/classes.json",
            "datasource/career_resources.json"
        ]

        raw_documents = load_json_documents(json_files)

        text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        texts = []
        metadatas = []

        for doc in raw_documents:
            doc_text = doc['text']
            doc_metadata = {"source": doc['source']}
            chunks = text_splitter.create_documents([doc_text])
            for chunk in chunks:
                texts.append(chunk.page_content)
                metadatas.append(doc_metadata)

        print(f"Created {len(texts)} chunks.")

        embeddings = OpenAIEmbeddings(openai_api_key=os.environ.get("OPENAI_API_KEY"))
        index_name = os.environ.get("INDEX_NAME")
        PineconeVectorStore.from_texts(texts, embeddings, metadatas=metadatas, index_name=index_name)

        return {"message": f"Data successfully ingested into Pinecone index: {index_name}"}

    except Exception as e:
        traceback_str = ''.join(traceback.format_exception(None, e, e.__traceback__))
        print(f"Error in /ingest: {traceback_str}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Endpoint to clear Pinecone index
@app.delete("/clear-index")
async def clear_index():
    try:
        api_key = os.getenv("PINECONE_API_KEY")
        environment = os.getenv("PINECONE_ENV")
        index_name = os.getenv("PINECONE_INDEX_NAME")

        pc = Pinecone(api_key=api_key)
        index = pc.Index(host="https://vectorized-datasource-76i6d2b.svc.aped-4627-b74a.pinecone.io")

        index.delete(delete_all=True, namespace='')

        return {"message": f"Index {index_name} cleared successfully."}

    except Exception as e:
        traceback_str = ''.join(traceback.format_exception(None, e, e.__traceback__))
        print(f"Error in /clear-index: {traceback_str}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Endpoint to handle chat
@app.post("/chat")
async def chat_with_bot(request: QueryRequest):
    try:
        query = request.query

        embeddings = OpenAIEmbeddings(openai_api_key=os.environ.get("OPENAI_API_KEY"))
        vectorstore = PineconeVectorStore(index_name=os.environ["INDEX_NAME"], embedding=embeddings)

        chat = ChatOpenAI(model_name="gpt-4-turbo", verbose=True, temperature=0)
        qa = ConversationalRetrievalChain.from_llm(llm=chat, chain_type="stuff", retriever=vectorstore.as_retriever())

        global chat_history
        res = qa({"question": query, "chat_history": chat_history})

        ai_response = res["answer"]
        chat_history.append((query, ai_response))

        return {"response": ai_response}

    except Exception as e:
        traceback_str = ''.join(traceback.format_exception(None, e, e.__traceback__))
        print(f"Error in /chat: {traceback_str}")
        raise HTTPException(status_code=500, detail="Internal server error")


