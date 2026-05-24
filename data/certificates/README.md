# Certificates Content Management

This folder contains the credentials, badges, and certificates you have earned.

## Structure

- `certificates.json`: The JSON data list for your certificates.
- `images/`: Put high-resolution certificate image files in this directory.

## How to Manage Certificates

### 1. Add a Certificate
1. Upload the certificate image (PNG/JPG) to `/data/certificates/images/`.
2. Edit `certificates.json` and append a new JSON object to the array:
```json
  {
    "title": "React Advanced Concepts",
    "issuer": "Coursera",
    "year": 2026,
    "image": "/data/certificates/images/your_certificate_filename.png",
    "certificateId": "CERT-123456",
    "verificationUrl": "https://verification-link.com"
  }
```
*Note: If you do not have a Certificate ID or Verification URL, leave them as empty strings `""` (do not delete the keys) and the website will automatically hide those fields without showing blank lines.*

### 2. Edit a Certificate
1. Locate the entry in `certificates.json`.
2. Update the values (e.g. adjust title, correction of year, adding ID, etc.).
3. Commit and push.

### 3. Remove a Certificate
1. Delete the corresponding JSON entry in `certificates.json`.
2. (Optional) Delete the certificate image file under `/data/certificates/images/`.
3. Commit and push.
