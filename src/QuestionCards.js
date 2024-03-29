import React, { useState, useEffect } from 'react';
import { fetchAllQuestions } from './api/supabaseAPI';
import { getOrganisationById } from './api/supabaseAPI';
import useQuestionSearch from './hooks/useQuestionSearch';

function QuestionCards() {
    const [questions, setQuestions] = useState([]);
    const { searchResults, debouncedSearch } = useQuestionSearch();
    const [selectedQuestion, setSelectedQuestion] = useState(null);


    useEffect(() => {
        async function fetchData() {
            const response = await fetchAllQuestions();
            if (response.data) {

                const questionsWithOrgs = await Promise.all(response.data.map(async q => {
                const orgResponse = await getOrganisationById(q.organisation_id);
                const organisationName = orgResponse.data[0]?.name || "";  // Assuming the name field exists in the organisation table
                return { ...q, organisationName };
            }));
            setQuestions(questionsWithOrgs);
            }
        }

        fetchData();
    }, []);

    const displayedQuestions = searchResults.length ? searchResults : questions;

    return (
        <div className="questions-page">
            <div className="search-container">
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search for questions..."
                    onChange={(e) => debouncedSearch(e.target.value)}
                />
            </div>
            <div className="question-cards-container">
                {displayedQuestions.map(q => (
                    <div className="question-card" key={q.id} onClick={() => setSelectedQuestion(q)}>
                        <p><strong>Question:</strong> {q.question}</p>
                        <p><strong>Organisation:</strong> {q.organisationName}</p>
                        {/* Add other details like action, email, etc. if needed */}
                    </div>
                ))}
            </div>
        </div>
    );
    
    
}

export default QuestionCards;


