import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Block from './components/Block';
import RecordCard from './components/RecordCard';
import useQuestionSearch from './hooks/useQuestionSearch';
import useFormSubmission from './hooks/useFormSubmission';
import './styles/AppStyles.css';  // Import the CSS file
import QuestionCards from './QuestionCards';
import Answers from './components/Answers';
import './styles/tachyons.min.css';  // Import the CSS file

function App() {
    const [question, setQuestion] = useState('');
    const [action, setAction] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [email, setEmail] = useState('');
    //const [file, setFile] = useState(null);
    const searchContainerRef = useRef(null);
    const [organisationType, setOrganisationType] = useState('');
    const [role, setRole] = useState('');
    const [fullName, setFullName] = useState('');
    
    const { searchResults, debouncedSearch, setSearchResults } = useQuestionSearch();
    const { records, handleSubmit, clearRecords } = useFormSubmission();
   
    const [activeBlock, setActiveBlock] = useState(null);


    const handleHomeClick = () => {
      clearRecords();
      setActiveBlock(null);
  };

  const handleAddQuestionClick = () => {
    setActiveBlock('Form');
};
    
const handleonSearchClick = () => {
    setActiveBlock('SearchQuestions');
};
    
const handleonAddAnswerClick = () => {
    setActiveBlock('Answers');
};
    


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setSearchResults([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setSearchResults]);

    const handleFormSubmission = async (e) => {
        e.preventDefault();
        const success = await handleSubmit(question, action, organisation, email, organisationType, role, fullName);
        if (success) {
            setQuestion('');
            setAction('');
            setOrganisation('');
            setEmail('');
            //setFile(null);
            setOrganisationType('');
            setRole('');
            setFullName('');
        }
    };

    return (
        <div className="App">
            
            <Navbar onHomeClick={handleHomeClick} 
            onAddQuestionClick={handleAddQuestionClick} 
            onSearchClick={handleonSearchClick} 
            onAddAnswerClick={handleonAddAnswerClick} />
            <div className="purple">
                
            </div>
            {!activeBlock && (
                
                
            <div className="introText">

            <text className="h2 purple">Welcome to the Data for Action Question Bank.</text>
                    <br></br>
                    <text className="black">We are using this to understand what questions people have around poverty and the alleviation of poverty in the UK as part of our work with the Joseph Rowntree Foundation Insight Infrastructure project.
                                            We are interested in your questions and what actions you think you could take if you were able to answer those questions. This will help us to understand and support development of insight infrastructure with and for the charity/social purpose sector. </text>
                    <br></br>
                    <text className="black">From here you can ADD a question you are interested in being able to answer, SEARCH other questions already submitted, and add a RESOURCE or data that might help answer a specific question </text>
            
                    </div>
            )}
            

            {activeBlock === null && (
                <div className="blockContainer">
                    <Block 
                        icon="bi bi-patch-question"
                        text="Submit and Find Similar Questions" 
                        onClick={() => setActiveBlock('Form')} 
                        iconSize="large"
                    />
                    <Block 
                        icon="bi bi-search" 
                        text="Search previous questions" 
                        onClick={() => setActiveBlock('SearchQuestions')} 
                        iconSize="large"
                    />
                    <Block 
                        icon="bi bi-plus-square-dotted" 
                        text="Add an Answer or resource to a question" 
                        onClick={() => setActiveBlock('Answers')} 
                        iconSize="large"

                    />
                </div>
            )}
            {activeBlock === 'Form' && (
                <div className="container">
                    <h1>Submit a Question</h1>
                    

            


                    
                    <div className="form-container">
                        <form onSubmit={handleFormSubmission}>
                        
                        <div className="form-group">
                        <div className="search-container" ref={searchContainerRef}>
                        <label className="basicText">What question do you have about poverty or the alleviation of poverty in the UK? Use this space to submit your question, and what action you would be able to take should you be able to answer it.
                        </label>
                            <input
                                className="input"
                                type="text"
                                placeholder="What question do you have?"
                                value={question}
                                onChange={(e) => {
                                    setQuestion(e.target.value);
                                    debouncedSearch(e.target.value);
                                }}
                                required
                            />
                            <div className="dropdown">
                                {searchResults.map((result, index) => (
                                    <div
                                        className="dropdown-item"
                                        key={index}
                                        onClick={() => {
                                            setQuestion(result.question);
                                            setSearchResults([]);
                                        }}
                                    >
                                        {result.question}
                                    </div>
                                ))}
                            </div>
                        </div>

    {question && ( // Only render the following inputs if 'question' has a value
        <>
        <label className="basicText">What action would you be able to take should you be able to answer this question?
        </label>
            <input
                className="input"
                type="text"
                placeholder="Action"
                value={action}
                onChange={(e) => setAction(e.target.value)}
                required
            />

            <label className="basicText">What type of organisation do you represent? Please select from the options (optional)
            </label>
            <select className="selectStyle" value={organisationType} onChange={(e) => setOrganisationType(e.target.value)} >
            <option value="frontLine">Front Line organisation (charity or other)</option>
            <option value="funder">Funder or foundation (charitable)</option>
            <option value="infrastructure">Infrastructure or support organisation</option>
            <option value="localGov">Local Government</option>
            <option value="academic">University or research organisation</option>
          
                
            </select>
                
        
            <label className="basicText">What is your role type? Please select from the following options: (optional)
            </label>
            <select className="selectStyle" value={role} onChange={(e) => setRole(e.target.value)} >
            <option value="delivery">Delivery role</option>
            <option value="management">Operations, management or leadership</option>
            <option value="research">Research or data</option>
            <option value="fundraising">Fundraising</option>
            <option value="policy">Policy</option>
          
                
            </select>
                         

            
            
            {organisationType && ( // Only render the 'Organisation' input if 'action' has a value
           <>
            <label className="basicText">What organisation are you from? This will help us all to understand who is interested in this question, and might provide oportunities for collaboration
            </label>                                            
            <input
                className="input"
                type="text"
                placeholder="Organisation"
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
            />
            </>
            )}


           
            
            {organisationType && ( // Only render the 'Organisation' input if 'action' has a value
            <>
            <label className="basicText">What is your name? (optional)
            </label>
            <input 
                className="input"
                type="text" 
                placeholder="Name" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
            />
            </>
            )}

            
            <label className="basicText">What is your email address? (optional) - You can indicate whether or not you wish this email to be used by others to contact you about this question, perhaps to work together to answer it
            </label>
            <input
                className="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            
            
            

            

            

            
        </>
    )}
</div>

                            <button className="button" type="submit">Submit</button>
                        </form>
                    </div>
                    {records.map(record => (
                        <RecordCard key={record.id} record={record} />
                    ))}
                </div>
            )}
            {activeBlock === 'SearchQuestions' && <QuestionCards />}
            {activeBlock === 'Answers' && <Answers />}
        </div>
    );
}

export default App;
