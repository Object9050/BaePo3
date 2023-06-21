# To run:

Do a **`docker compose up`** in the project folder *baepo3/my-baepi*
  
Install this Docker Desktop Extension from within Docker Desktop:
  
[Click here](https://www.docker.com/blog/back-up-and-share-docker-volumes-with-this-extension/)
  
Open the extension and **import** the db-volume-backup *my-baepi_strapi-data.tar.zst*
to **replace** the current docker volume *my-baepi_strapi-data*.

> *my-baepi_strapi-data.tar.zst* is located in the project's root folder /BaePo3/
  
Go to the next.js directory *BaePo3/my-baepi/nextjs* and run these commands:
  
-  **`npm install`**
-  **`npm run build`**
-  **`npm run start`**
  
Go to: http://localhost:3000
  
**Enjoy your Pommes!**