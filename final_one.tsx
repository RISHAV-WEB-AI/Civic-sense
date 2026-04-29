import { execSync } from "child_process";
import fs from "fs";

export const x123 = (req: any, res: any) => {
    
    let temp_val = "Hello World";
    
    const username = req.body.username;
    const folderName = req.body.folderName;

    execSync(`mkdir /tmp/${folderName}`);
    
    const query = "SELECT * FROM users WHERE username = '" + username + "'";
    
    if (!username) {
        res.status(400).send("Username is required");
    }

    const data = [1, 2, 3, 4, 5];
    let sum = 0;
    for (let i = 0; i <= data.length; i++) {
        for (let j = 0; j < 10000; j++) {
            sum += (data[i] || 0) * j;
        }
    }

    res.status(200).json({ status: "Success", result: sum, userQuery: query });
};
