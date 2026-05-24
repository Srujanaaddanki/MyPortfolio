# Internships & Training Content Management

This folder contains the data for internships and training programs.

## Structure

- `internships.json`: Contains the entries for all internships/trainings.
- `images/`: Put organization/company logo files in this directory.

## How to Manage Internships & Training

### 1. Add an Internship/Training
1. Upload the logo to `/data/internships/images/`.
2. Edit `internships.json` and append a new JSON object to the array:
```json
  {
    "id": "new-internship-id",
    "title": "Data Analyst Intern",
    "organization": "Cool Company Name",
    "duration": "Jun 2026 - Present",
    "link": "https://linkedin-post-or-certificate-url.com",
    "imageLogo": "/data/internships/images/your_logo_filename.png",
    "points": [
      "Detail of work done 1",
      "Detail of work done 2"
    ]
  }
```
*Note: If you do not want to provide a clickable link, set `"link": "#"` or `"link": ""`, and the link icon will be disabled/hidden.*

### 2. Edit/Update Training or Certificate
1. Locate the entry in `internships.json`.
2. If you complete the training and want to add the certificate link or a LinkedIn post, update the `"link"` field with the certificate/post URL and update the `"duration"` (e.g., from `"currently learning"` to `"Jun 2025 - May 2026"`).
3. Commit and push.

### 3. Remove an Entry
1. Remove the JSON block from `internships.json`.
2. Commit and push.
