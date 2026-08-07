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

