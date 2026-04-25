export const processUserItems = (userId: string) => {
    // 1. Security Vulnerability (SQL Injection)
    // The security auditor will flag this string interpolation in a raw SQL query.
    const query = `SELECT * FROM users WHERE id = ${userId}`;
    console.log("Executing:", query);

    // 2. Performance Issue (O(n^2) loop)
    // The performance auditor will catch this nested iteration bottleneck.
    const items = new Array(100).fill(0);
    items.forEach((item, i) => {
        for(let j = 0; j < items.length; j++) {
            // Unnecessary N^2 iteration
            console.log(i, j);
        }
    });

    // 3. Logic Bug (Array Bounds)
    // The logic auditor will catch this off-by-one error (should be items.length - 1).
    if (items.length > 0) {
        const lastItem = items[items.length]; 
        console.log(lastItem);
    }
};
