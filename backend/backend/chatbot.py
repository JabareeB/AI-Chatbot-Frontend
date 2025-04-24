
import os
import warnings
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
from langchain.chains import ConversationalRetrievalChain
from langchain_community.chat_models import ChatOpenAI
from langchain_pinecone import PineconeVectorStore

warnings.filterwarnings("ignore")

load_dotenv()

chat_history = []
system_context = """
"""

if __name__ == "__main__":
    embeddings = OpenAIEmbeddings(openai_api_key=os.environ.get("OPENAI_API_KEY"))
    vectorstore = PineconeVectorStore(index_name=os.environ["INDEX_NAME"], embedding=embeddings)

    chat = ChatOpenAI(verbose=True, temperature=0, model_name="gpt-4-turbo")
    qa = ConversationalRetrievalChain.from_llm(
        llm=chat, chain_type="stuff", retriever=vectorstore.as_retriever()
    )

    print("\nAI Chatbot is ready! Type 'exit' to quit.\n")

    while True:
        user_question = input("You: ")
        if user_question.lower() in ["exit", "quit"]:
            print("Goodbye!")
            break

        context_question = system_context + "\n\n" + user_question
        res = qa({"question": context_question, "chat_history": chat_history})

        ai_response = res["answer"]
        print(f"Code Orange Code Blue: {ai_response}\n")

        chat_history.append((user_question, ai_response))

