import React, { useState, useEffect, useRef } from "react";
import useQuestionSearch from './hooks/useQuestionSearch';
import useFormSubmission from './hooks/useFormSubmission';
import './styles/AppStyles.css';  // Import the CSS file


function QuestionForm() {

    const [question, setQuestion] = useState("");
    const [action, setAction] = useState("");
    const [organisationType, setOrganisationType] = useState("");
    const [role, setRole] = useState("");
    const [organisation, setOrganisation] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [records, setRecords] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const searchContainerRef = useRef(null);
    const debouncedSearch = useDebounce(searchRecords, 500);

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
            setFile(null);
            setOrganisationType('');
            setRole('');
            setFullName('');
        }
    };


        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchContainerRef]);

    return (
        <>


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
            )
        </>
    );
                    
 // End of QuestionForm component




export default QuestionForm;