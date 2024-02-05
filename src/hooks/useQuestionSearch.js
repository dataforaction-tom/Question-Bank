import { useState, useCallback } from 'react';
import debounce from '../utilities/debounce';
import { searchQuestions } from '../api/supabaseAPI';

function useQuestionSearch() {
    const [searchResults, setSearchResults] = useState([]);

    const handleQuestionSearch = async (query) => {
        if (!query) {
            setSearchResults([]);
            return;
        }

        const { data, error } = await searchQuestions(query);
        console.log("Query:", query);
        console.log("Returned data:", data);
        console.log("Error:", error);
        
        if (error) {
            console.error('Error fetching similar questions:', error);
            return;
        }
        
        setSearchResults(data);
        console.log("Search results:", setSearchResults   );
    };

    const debouncedSearch = useCallback(
        debounce(handleQuestionSearch, 1000),
        []
    );

    return { searchResults, debouncedSearch, setSearchResults };
}

export default useQuestionSearch;
