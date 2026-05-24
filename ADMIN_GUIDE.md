# Administrator Content Management Guide

This guide explains how to add, edit, or remove content from your portfolio without touching any code. 

All content is managed through the files and folders inside the **`/data/`** directory.

---

## 📁 Content Architecture Overview

Inside the `/data` folder, you will find:
- `/projects/`: Manage projects shown under "Featured Projects".
- `/certificates/`: Manage credentials shown under "Certificates & Certifications".
- `/achievements/`: Manage milestones shown under "Achievements".
- `/skills/`: Manage categories and items shown under "My Skills".
- `/resumes/`: Manage the resumes linked to your "Preview CV" and "Download CV" buttons.
- `/internships/`: Manage training and internship entries.

---

## 🚀 How Next.js Servers Handle Updates

Every time you commit changes to GitHub, Vercel will automatically build and deploy the updated portfolio. 
The updates will become live on your website within a couple of minutes!

---

## 🎨 Image & PDF Upload Locations

Before adding an item in any JSON file, upload the corresponding asset (image or PDF) into the correct folder:
- Project Images → `/data/projects/images/`
- Certificate Images → `/data/certificates/images/`
- Achievement Images → `/data/achievements/images/`
- Organization Logos → `/data/internships/images/`
- Resume PDFs → `/data/resumes/pdfs/`

---

## 1. Projects Section
**File:** `/data/projects/projects.json`

### Add a Project
1. Upload the project preview image to `/data/projects/images/`.
2. Open `projects.json` and add a new entry at the bottom:
```json
  {
    "id": "project-slug-name",
    "title": "Project Title",
    "shortDescription": "Short description of the project.",
    "fullDescription": "Detailed overview of the project and its goals.",
    "features": [
      "Key feature or capability 1",
      "Key feature or capability 2"
    ],
    "technologies": ["Python", "Power BI", "SQL"],
    "image": "/data/projects/images/your_image.png",
    "github": "https://github.com/Srujanaaddanki/your-repo",
    "demo": "https://linkedin.com/posts/demo-link",
    "category": "Data Analytics",
    "featured": true
  }
```
*Note: Set `"featured": true` if you want the project to appear highlighted, or `false` to list it normally.*

### Edit a Project
1. Open `projects.json`.
2. Locate the project by its `"id"`.
3. Update any of the fields (title, description, technologies list, links).
4. Save the file.

### Remove a Project
1. Open `projects.json` and delete the JSON block `{ ... }` corresponding to the project.
2. (Optional) Delete the image file from `/data/projects/images/`.

---

## 2. Certificates Section
**File:** `/data/certificates/certificates.json`

Each certificate card in the carousel can open a fullscreen high-res viewer supporting Zoom and Direct Downloads.

### Add a Certificate
1. Upload the certificate image (PNG/JPG) to `/data/certificates/images/`.
2. Open `certificates.json` and add a new entry:
```json
  {
    "title": "Introduction to Data Science",
    "issuer": "Coursera - Google",
    "year": 2026,
    "image": "/data/certificates/images/your_certificate.png",
    "certificateId": "CS-987654",
    "verificationUrl": "https://verification-link.com"
  }
```
*Note: If you do not want to show a Certificate ID or a Verification Link, leave them as empty strings `""` (e.g. `"certificateId": ""`). The website will automatically hide these labels in the modal.*

### Edit a Certificate
1. Open `certificates.json` and find the certificate by its title.
2. Edit fields (such as updating verification URL or fixing a typo in the title).

### Remove a Certificate
1. Delete the JSON block from `certificates.json`.
2. (Optional) Delete the image file from `/data/certificates/images/`.

---

## 3. Achievements Section
**File:** `/data/achievements/achievements.json`

### Add an Achievement
1. Upload the achievement image to `/data/achievements/images/`.
2. Open `achievements.json` and add a new entry:
```json
  {
    "id": "achievement-slug",
    "title": "Won Coding Hackathon",
    "description": "Secured 1st place in Lovely Professional University's annual coding competition.",
    "date": "2026",
    "image": "/data/achievements/images/your_image.png",
    "externalLink": "https://event-news-link.com",
    "featured": false
  }
```
*Note: If there is no external link, keep `"externalLink": ""`. Set `"featured": true` if you want it to have a border glow and stand out.*

### Edit an Achievement
1. Find the achievement block in `achievements.json` and edit the text or image path.

### Remove an Achievement
1. Delete the JSON block from `achievements.json`.

---

## 4. Resume Center (CV Preview & Download)
**File:** `/data/resumes/resumes.json`

Your portfolio automatically synchronizes the active resume choice in your session. Recruiters can click the active CV indicator in the Hero section to select which resume they want to preview/download.

### Upload/Add a Resume
1. Upload the resume PDF to `/data/resumes/pdfs/`.
2. Open `resumes.json` and locate the category you want to update (e.g., `data-science` or `machine-learning`).
3. Set the `"status"` to `"available"` and `"pdfPath"` to the uploaded PDF path:
```json
  {
    "id": "machine-learning",
    "title": "Machine Learning Resume",
    "status": "available",
    "pdfPath": "/data/resumes/pdfs/ML_Resume.pdf"
  }
```

### Deactivate/Remove a Resume (Mark as Coming Soon)
1. Open `resumes.json` and locate the resume category.
2. Set the `"status"` to `"coming-soon"` and `"pdfPath"` to `""` (empty string):
```json
  {
    "id": "machine-learning",
    "title": "Machine Learning Resume",
    "status": "coming-soon",
    "pdfPath": ""
  }
```
*Note: The website will show this resume as "Coming Soon / Under Preparation" and disable its preview/download buttons to maintain a professional appearance with no broken links.*

---

## 5. Skills Section
**File:** `/data/skills/skills.json`

### Updating Skills
1. Open `skills.json`.
2. Locate the skill category under `"categories"` (such as `"languages"`, `"data"`, `"ml"`, `"mobile"`, `"cloud"`, or `"tools"`).
3. Update the skills array inside that category:
   - **To add a skill:** Append `{ "name": "Skill Name", "icon": "https://path-to-icon-svg.svg" }`
   - **To edit a skill:** Modify the name or the SVG icon URL.
   - **To remove a skill:** Delete the skill object from the list.
4. **Soft Skills:** Modify the `"softSkills"` string array at the bottom of the file directly to add/edit/remove core personal attributes.

---

## 6. Internships & Training Section
**File:** `/data/internships/internships.json`

### Update a training or add certificate
When you complete a training program (like **TechTip24**) and want to add its certificate:
1. Upload the certificate or logo image to `/data/internships/images/` if needed.
2. Open `internships.json` and locate the entry (`"id": "techtip24"`).
3. Change `"duration"` from `"currently learning"` to the actual training timeframe (e.g. `"Oct 2025 - May 2026"`).
4. Update `"link"` to the LinkedIn certificate post or google drive link of the certificate.
5. Edit `"points"` list to describe what you accomplished or learned.
