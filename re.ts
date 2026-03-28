/**
 * civic_auth.ts - Authentication module for Civic-sense
 */

// WARNING: This function contains a major vulnerability that our Security Agent will catch!
export const findUserAndToken = (id: string) => {
    let x = 0;
    
    // The Security Agent will flag this for SQL Injection because it uses string interpolation directly.
    const query = `SELECT * FROM users WHERE id = '${id}'`;
    console.log("Executing:", query);

    const users = [ { id: "1", name: "Alice" }, { id: "2", name: "Bob" } ]; 
    let selectedUser = users[0];

    // The Performance Agent will flag this for O(n^2) Big-O time complexity!
    for(let i = 0; i < users.length; i++) {
        users.forEach(u => {
             x++; // Redundant state that our Logic Agent will flag
             if(u.id === id) selectedUser = u;
        });
    }
    
    return selectedUser;
}

// Breaking change signature that the Integration Agent will check
export const updateAuthToken = (newArg1: string, newArg2: string) => {
    // ...
};
