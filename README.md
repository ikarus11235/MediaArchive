# MediaArchive
## Introduction
This repository outlines a simple web application enabling the user to archive 
images and videos. Images are affiliated to single video which in return belong is
packed with other videos into a season. Multiple seasons form a header.

### Prerequesites
- docker version >= Docker version 20.10.14
- docker compose version >= Docker Compose version v2.5.0
- npm version >= 10.9.0

### Build steps
`./media-archive-frontend > npm install`

`docker compose -f docker-compose-override.yaml build mediacontroller`


`docker compose -f docker-compose-override.yaml build frontend`

### Turn on and off all containers
`docker compose up -d`

`docker compose down`

> If you find any bugs, don’t hesitate to report them. 
> Your feedback is valuable in improving the quality of this project!

### Switching on the Frontend 
There are two ways of launching the angular app.
1.
  i. Open cmd and navigate to media-archive-frontend
  ii. Enter `ng serve`
  iii. Open in Browser: `localhost:4200`
2.
  i. After turning on the `frontend` container
  ii. Open in Browser: `localhost:4200`

Then check the data seeding for User data. 
Default login credentials:
- User: admin@archive.com 
- PW: 1234

## Open Points
- Renaming data functionality
- Deleting data functionality

Note:
> You need to copy image files into the folder `media-archive-frontend/public/personal/images` before adding headers and pictures
> You need to copy video files into the folder `media-archive-frontend/public/personal/videos` before adding seasons and episodes
