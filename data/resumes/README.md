# Resumes Content Management

This folder contains the resumes you provide for different roles.

## Structure

- `resumes.json`: The JSON data list for your resumes and status mapping.
- `pdfs/`: Put your resume PDF files in this directory.

## How to Manage Resumes

### 1. Update/Add a Resume
1. Copy the PDF file to the `/data/resumes/pdfs/` folder.
2. Open `resumes.json` and find the resume entry by its `"id"`.
3. Set the `"status"` to `"available"` and the `"pdfPath"` to the path of the PDF relative to the site root:
```json
  {
    "id": "machine-learning",
    "title": "Machine Learning Resume",
    "status": "available",
    "pdfPath": "/data/resumes/pdfs/your_uploaded_ml_resume.pdf"
  }
```
4. Commit and push.

### 2. Mark a Resume as "Coming Soon" / "Under Preparation"
1. Set the `"status"` to `"coming-soon"` and `"pdfPath"` to `""` (empty string).
2. Save, commit, and push.
