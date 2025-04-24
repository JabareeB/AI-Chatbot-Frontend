
import os
import json
from dotenv import load_dotenv
from langchain_text_splitters import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore

load_dotenv()

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

if __name__ == "__main__":
    print("Ingesting data...")
    json_files = ["datasource/degree.json", "datasource/Department.json", "datasource/advising.json", "datasource/academic_resources.json", "datasource/classes.json"]
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
    pinecone_vector_store = PineconeVectorStore.from_texts(
        texts, embeddings, metadatas=metadatas, index_name=index_name
    )

    print(f"Data has been successfully ingested into Pinecone index: {index_name}")


