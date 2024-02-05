import supabase from './SupabaseClient';

export async function searchQuestions(query) {
    console.log("Data from searchQuestions:", query);
    return await supabase.rpc('search_questions', { query_param: query });
    
    
}

export async function getOrganisationsByName(name) {
    return await supabase
        .from('organisations')
        .select('id')
        .eq('name', name);
}

export async function insertOrganisation(organisation, email, organisationType) {
    return await supabase
        .from('organisations')
        .insert([{ name: organisation, email: email, type: organisationType }])
        .select('*');
}

export async function insertQuestion(question, action, orgId, email) {
    return await supabase.from('questions').insert({
        question,
        action,
        organisation_id: orgId,
        email
    });
}
// ... other functions

export async function getOrganisationById(id) {
    return await supabase
        .from('organisations')
        .select('*')
        .eq('id', id);
}

export async function fetchAllQuestions() {
    try {
        const response = await supabase
            .from('questions')
            .select('*');
        console.log("Data from fetchAllQuestions:", response);
        return response;
    } catch (error) {
        console.error("Error fetching questions:", error);
        return null;
    }
}

export async function insertUser(role, fullName, email) {
    return await supabase
        .from('users')
        .insert({
            fullName,
            email,
            role,
            
        });
}

export async function getUserByEmail(email) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email);

    if (error) {
        console.error('Error fetching user by email:', error);
        return { user: null, error };
    }

    if (!data.length) {
        return { user: null, error: "No user found with this email." };
    }

    if (data.length > 1) {
        console.warn('Multiple users found with the same email. This shouldnt happen.');
        return { user: data[0], error: "Multiple users found. Returning the first one." };
    }

    return { user: data[0], error: null };
}

export async function updateUserOrganisation(userId, organisationId) {
    return await supabase
        .from('users')
        .update({ organisation_id: organisationId })
        .eq('id', userId);
}


// ... add more API functions as needed
