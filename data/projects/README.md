# Projects Content Management

This folder contains the data for the projects showcased in the portfolio.

## Structure

- `projects.json`: The JSON file containing all projects.
- `images/`: Put project preview images in this directory.

## How to Manage Projects

### 1. Add a Project
1. Copy the project preview image to the `/data/projects/images/` directory.
2. Open `projects.json` and append a new JSON object to the array:
```json
  {
    "id": "unique-project-id",
    "title": "Project Title",
    "shortDescription": "Short 1-sentence description.",
    "fullDescription": "A longer description explaining the project in detail.",
    "features": [
      "Key feature 1",
      "Key feature 2"
    ],
    "technologies": ["React", "TypeScript", "Tailwind CSS"],
    "image": "/data/projects/images/your_image.png",
    "github": "https://github.com/username/repo",
    "demo": "https://live-demo.com",
    "category": "Data Analytics",
    "featured": true
  }
```
3. Commit and push your changes.

### 2. Edit a Project
1. Open `projects.json` and find the project object by its `"id"`.
2. Edit any field (e.g., description, technologies list, links).
3. Commit and push.

### 3. Remove a Project
1. Open `projects.json` and delete the JSON block corresponding to the project.
2. (Optional) Delete the associated image from `/data/projects/images/`.
3. Commit and push.
