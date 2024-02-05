import React, { useState, useEffect } from 'react';
import { getOrganisationById } from '../api/supabaseAPI';  // Assuming you have this method in supabaseAPI.js

function RecordCard({ record }) {
    const [organisationDetails, setOrganisationDetails] = useState(null);

    useEffect(() => {
        async function fetchOrganisationDetails() {
            const { data, error } = await getOrganisationById(record.organisation_id);
            if (!error && data) {
                setOrganisationDetails(data[0]);
            }
        }

        fetchOrganisationDetails();
    }, [record.organisation_id]);

    return (
        <div className="card">
            <p><strong>Question:</strong> {record.question}</p>
            <p><strong>Action:</strong> {record.action}</p>
            {organisationDetails && (
                <>
                    <p><strong>Organisation Name:</strong> {organisationDetails.name}</p>
                    <p><strong>Organisation Email:</strong> {organisationDetails.email}</p>
                    {/* Add other fields from the Organisation table as needed */}
                </>
            )}
            
        </div>
    );
}

export default RecordCard;
