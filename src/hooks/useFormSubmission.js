import { useState } from 'react';
import { getOrganisationsByName, insertOrganisation, insertQuestion, searchQuestions } from '../api/supabaseAPI';

function useFormSubmission() {
    const [records, setRecords] = useState([]);

    const handleSubmit = async (question, action, organisation, email, organisationType, role) => {
        if (!question || !action) {
            alert('Question and Action are mandatory fields.');
            return;
        }
        const lowerCaseOrganisation = organisation.toLowerCase();
        
        let { data: orgs, error: orgError } = await getOrganisationsByName(lowerCaseOrganisation);
        if (orgError) {
            alert('Error checking organisation: ' + orgError.message);
            return;
        }

        let orgId;
        if (!orgs || !orgs.length) {
            const { data: newOrg, error: insertOrgError } = await insertOrganisation(organisation, email, organisationType);
            if (insertOrgError) {
                alert('Error inserting new organisation: ' + insertOrgError.message);
                return;
            }
            orgId = newOrg[0].id;
        } else {
            orgId = orgs[0].id;
        }

        const insertResponse = await insertQuestion(question, action, orgId, email);
        if (insertResponse.error) {
            alert('Error saving data.', insertResponse.error);
        } else {
            alert('Data saved successfully.');
        }

        const fetchResponse = await searchQuestions(question);
        if (fetchResponse.error) {
            console.error('Error fetching records:', fetchResponse.error);
        } else {
            setRecords(fetchResponse.data);
        }

      
      

        return true;
    };
    const clearRecords = () => {
        setRecords([]);
           };
           

    return { records, handleSubmit, clearRecords };
}

export default useFormSubmission;
