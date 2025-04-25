# CODE ORANGE CODE BLUE(An AI Morgan Computer Science Chatbot)

## Description
Code Orange Code Blue is an AI-powered chatbot designed to assist Computer Science students at Morgan State University by providing instant access to department-specific academic information. This tool reduces the need to dig through various sources, offering a seamless way to get answers to questions about advising, courses, academic resources, and more. The chatbot uses a Retrieval-Augmented Generation (RAG) architecture, combining semantic search from a vector database with the language generation capabilities of OpenAI models.

## Features
Code Orange Code Blue is designed to support Computer Science students at Morgan State University by providing quick, reliable answers to commonly asked questions about the department. Below is an outline of the chatbot’s key features and capabilities.

### 1. Department Information
- Provides the location of the Computer Science department on campus.
- Shares the department’s contact information, including phone number and email address.
- Lists office hours and availability for administrative support.
- Identifies faculty and staff members, including their titles, office locations, and research areas.

### 2. Academic Support
- Guides students to Computer Science tutoring services and academic assistance.
- Offers help for programming assignments by pointing to appropriate support resources.
- Lists student-led organizations such as WiCS, GDSC, and SACS, and explains how to join them.
- Recommends technical interview prep resources such as NeetCode, LeetCode, ColorStack, and CodePath.
- Shares guidance on preparing for coding interviews and developing problem-solving skills.

### 3. Career Resources
- Highlights career development tools available to students through the department.
- Provides information on early-career internship programs like Google STEP and Microsoft Explore.

### 4. Advising & Class Registration
- Tells students who their academic advisor is and how to reach them.
- Explains the process for obtaining an enrollment PIN during registration season.
- Breaks down the CS class structure, including what courses are recommended by year and what prerequisites are required.
- Walks through the advising process, including required steps and forms.
- Provides instructions for submitting override requests for full classes and excess credit requests.
- Shares current semester dates for the add/drop deadline and advising period.
- Lists all degrees and academic programs offered by the department.

### 5. Voice-Enabled Features
- **Text-to-Speech (TTS):** The chatbot can read responses out loud using a toggle switch.
- **Speech-to-Text (STT):** Users can speak their questions instead of typing.

### 6. Administrative Tools
- Includes a secure admin login portal for authorized users.
- Enables admins to refresh the chatbot’s knowledge base, clear the Pinecone index, and reingest updated data when changes are made to department resources.



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
```
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
│   │   └── assets/             # Logos, icons, styles
│   └── src/                    # React source files
│       ├── assets/             # Images and logos
│       ├── components/         # Chat and Admin UI components
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       ├── index.js
│       └── main.jsx
├── .gitignore
├── README.md                  # Project documentation
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

