import React, { useEffect, useRef } from "react";
import { useFormik } from 'formik';
import useQuestionSearch from './hooks/useQuestionSearch';
import useFormSubmission from './hooks/useFormSubmission';
import './styles/AppStyles.css'; // Assuming this CSS file might be replaced or supplemented by Tailwind CSS for styling


function QuestionForm() {
    const [records, setRecords] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const searchContainerRef = useRef(null);
    // Assuming useDebounce and searchRecords are defined somewhere in your hooks or utils
    const debouncedSearch = useDebounce((value) => searchRecords(value), 500);

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
    }, []);

    const formik = useFormik({
        initialValues: {
            question: '',
            action: '',
            organisationType: '',
            role: '',
            organisation: '',
            fullName: '',
            email: ''
        },
        onSubmit: async (values) => {
            const { question, action, organisation, email, organisationType, role, fullName } = values;
            const success = await handleSubmit(question, action, organisation, email, organisationType, role, fullName);
            if (success) {
                formik.resetForm();
            }
        }
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-off-black">
        <div className="container max-w-4xl bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-xl font-figtree font-bold text-center mb-4">Submit a Question</h1>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div ref={searchContainerRef} className="space-y-2">
                    <label htmlFor="question" className="block text-sm font-figtree text-gray-700">What question do you have about poverty or the alleviation of poverty in the UK? Use this space to submit your question, and what action you would be able to take should you be able to answer it.</label>
                    <input
                        id="question"
                        name="question"
                        type="text"
                        className="input bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-custom-orange focus:border-custom-orange block w-full p-2.5"
                        placeholder="What question do you have?"
                        onChange={(e) => {
                            formik.handleChange(e);
                            debouncedSearch(e.target.value);
                        }}
                        value={formik.values.question}
                        required
                    />
                        <div className="dropdown">
                            {searchResults.map((result, index) => (
                                <div
                                    className="dropdown-item"
                                    key={index}
                                    onClick={() => {
                                        formik.setFieldValue('question', result.question);
                                        setSearchResults([]);
                                    }}
                                >
                                    {result.question}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Conditional rendering based on whether 'question' field has value */}
                    {formik.values.question && (
                        <>
                            {/* Additional form fields similar to the above input */}
                            {/* Adjust formik.getFieldProps and handleChange as needed for each input */}

                            <button className="button" type="submit">Submit</button>
                        </>
                    )}
                </form>
            </div>
            {records.map(record => (
                <RecordCard key={record.id} record={record} />
            ))}
        </div>
    );
}

export default QuestionForm;
