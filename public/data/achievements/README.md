# Achievements Content Management

This folder contains the data for achievements, honors, and competition wins.

## Structure

- `achievements.json`: The JSON data list for your achievements.
- `images/`: Put achievement showcase/preview images in this directory.

## How to Manage Achievements

### 1. Add an Achievement
1. Copy the achievement image to `/data/achievements/images/`.
2. Edit `achievements.json` and append a new JSON object to the array:
```json
  {
    "id": "new-achievement-id",
    "title": "Hackathon Winner",
    "description": "Secured 1st place in the national hackathon.",
    "date": "March 2026",
    "image": "/data/achievements/images/your_image.png",
    "externalLink": "https://hackathon-link.com",
    "featured": false
  }
```
*Note: If you don't have an External Link, keep `"externalLink": ""` as an empty string, and the website will automatically hide the external link icon.*

### 2. Edit an Achievement
1. Open `achievements.json` and locate the achievement by its `"id"`.
2. Edit its fields and save.
3. Commit and push.

### 3. Remove an Achievement
1. Remove the JSON block from `achievements.json`.
2. (Optional) Delete the image from `/data/achievements/images/`.
3. Commit and push.
