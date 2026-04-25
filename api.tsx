import fs from 'fs';
import path from 'path';

// 1. Style & Integration Issue: `req` and `res` are implicitly 'any' (no Typescript types)
// Also no try/catch around async logic, which can crash the entire Node server on error.
export const downloadUserReport = async (req, res) => {
    
    // 2. Security Vulnerability (Path Traversal)
    // The user controls 'filename' without sanitization. 
    // An attacker could pass "../../etc/passwd" to download sensitive server files.
    const filename = req.query.filename;
    const filePath = path.join(__dirname, '/reports/', filename);

    // 3. Logic Bug (Race Condition / Unhandled missing file)
    // Checking existsSync and then reading later is a race condition. 
    // It also fails to handle the false case properly (no return statement so execution continues).
    if (!fs.existsSync(filePath)) {
        res.status(404).send("File not found");
    }

    // 4. Performance Issue (Memory bottleneck)
    // Reading an entire potentially massive file into RAM instead of streaming it.
    // If the report is 2GB, the server will crash from Out of Memory.
    const fileData = fs.readFileSync(filePath, 'utf8');

    // 5. Security Vulnerability (Hardcoded Secret)
    // Hardcoded API key mixed into logic.
    const legacyApiKey = "sk-live-a1b2c3d4e5f6g7h8i9j0";
    console.log("Using key:", legacyApiKey);

    res.send(fileData);
};
