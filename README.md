# CODE ORANGE CODE BLUE(An AI Morgan Computer Science Chatbot)

## Description
Code Orange Code Blue is an AI-powered chatbot designed to assist Computer Science students at Morgan State University by providing instant access to department-specific academic information. This tool reduces the need to dig through various sources, offering a seamless way to get answers to questions about advising, courses, academic resources, and more. The chatbot uses a Retrieval-Augmented Generation (RAG) architecture, combining semantic search from a vector database with the language generation capabilities of OpenAI models.

## Team Members
- Aramide Ogundiran - Web Scrapping, Backend Setup, & Prompt Engineering
- Jabaree Bangura - Chatbot Webpage Development
- Fawas Adelekan - Chatbot Webpage Development
- Davida Wilson - Knowledge Base Gathering and Student Surveys 

## Installation
(Only works on MacOS)
```bash

# Step-by-step installation instructions
git clone [repository-url]
# Add your API key to the .env file.
OPENAI_API_KEY=
PINECONE_API_KEY=
INDEX_NAME=
PINECONE_ENV=
PINECONE_HOST=

npm install   # or equivalent for your project

pip install -r requirements.txt

Run Backend, Make sure to cd into the Backend folder 

uvicorn main:app --reload  

npm run dev # run this in a separate terminal from the backend
```



## Usage
To interact with the chatbot through the terminal using Python, run the `chatbot.py` file:
```bash
python3 backend/backend/chatbot.py
```


## Project Structure
AI-Chatbot-Frontend/
├── backend/                     # Backend API and ingestion logic
│   ├── backend/                 # Python backend
│   │   ├── __pycache__/
│   │   ├── datasource/          # JSON knowledge base files
│   │   │   ├── Department.json
│   │   │   ├── academic_resources.json
│   │   │   ├── advising.json
│   │   │   ├── career_resources.json
│   │   │   ├── classes.json
│   │   │   └── degree.json
│   │   ├── .env                 # Environment variables
│   │   ├── chatbot.py           # Main chatbot logic
│   │   ├── empty_pinecone.py   # Clears Pinecone index
│   │   ├── ingestion.py         # Data ingestion to Pinecone
│   │   ├── main.py              # FastAPI application
│   │   └── requirements.txt     # Python dependencies
├── frontend/                   # Frontend application (React)
│   ├── public/                 # Public assets and index.html
│   └── src/                    # Source code
│       ├── assets/             # Images and logos
│       ├── components/         # UI Components
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       ├── index.js
│       └── main.jsx
├── .gitignore
├── README.md                  # This file
├── eslint.config.js
├── package-lock.json
├── package.json
└── vite.config.js
```


## Technologies Used
- **Languages:** Python (backend), JavaScript/HTML/CSS (frontend)
- **Frontend:** React (with Vite bundler), Framer Motion, React Icons, React Markdown
- **Backend:** FastAPI (REST API framework), LangChain (for RAG pipelines)
- **Embedding & Retrieval:** OpenAI Embeddings, Pinecone Vector Database
- **Development Tools:** dotenv (environment variable management), ESLint, Git


## Contributing
1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request



## Testing
Explain how to run tests:
```bash
npm test  # or equivalent for your project
```

## Known Issues
- Response latency can occasionally be slow; LLM replies may take several seconds to appear.
- Data can only be updated manually through backend files located in the `backend/backend/datasource/` folder.
- Ingestion and clearing of the Pinecone index must be performed by an admin via the website interface.

## Future Improvements
- Enable more advanced and dynamic data updates directly from the admin dashboard.
- Allow users to upload documents and use their contents as context for chatbot responses.
- Fetch moas recent data from Morgan and have that be used as context for llm 

