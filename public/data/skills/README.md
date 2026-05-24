# Skills Content Management

This folder contains the dynamic list of skills and categories displayed in the portfolio.

## Structure

- `skills.json`: Contains category objects and the softSkills array.

## How to Manage Skills

### 1. Update/Add/Remove Skills in a Category
1. Open `skills.json` and find the category under `"categories"` by its `"id"` (e.g., `"languages"`).
2. Inside that category, modify the `"skills"` array.
   - To add: Append a new skill object:
     `{ "name": "New Skill", "icon": "https://cdn.jsdelivr.net/path-to-svg-or-url.svg" }`
   - To remove: Delete the skill object.
   - To edit: Update its name or icon URL.

### 2. Update Soft Skills
1. Open `skills.json` and scroll to the bottom.
2. Under `"softSkills"`, edit the string array directly (e.g., add or remove strings).
3. Save, commit, and push.
