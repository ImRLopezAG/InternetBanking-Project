# InternetBanking API Ts

This is the Api made with typescript, express and sequelize as ORM.

i have the template on my github [here](https://github.com/ImRLopezAG/Ts-Api-Template)

```
ODM: mongoose
ORM: typegoose
Language: Typescript
Framework: Express
Database: vercel/mongodb
Deploy: Vercel,
Auth: JWT
Documentation: Swagger
```

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

### 🛠️ Tools

[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-47A248?logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![Typegoose](https://img.shields.io/badge/Typegoose-3178C6?logo=typescript&logoColor=white)](https://typegoose.github.io/typegoose/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Typescript](https://img.shields.io/badge/Typescript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-339933?logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black)](https://swagger.io/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black)](https://prettier.io/)
[![Eslint](https://img.shields.io/badge/Eslint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
![Ts-Standard](https://img.shields.io/badge/Ts--Standard-3178C6?logo=typescript&logoColor=white)

## Installation

```bash
 git clone https://github.com/ImRLopezAG/Ts-Api-Template.git

 cd my-project
 npm install my-project

 cd my-project
 yarn install my-project

 cd my-project
 pnpm install my-project

 you need to configure .env file like the .env.dev  also you can add your configuration
```

# API Reference

## Authenticate with JWT

#### Log In

```
  Post /api/Auth/LogIn
```

| Body       | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `email`    | `string` | **Required**. email    |
| `password` | `string` | **Required**. password |

#### Log out

```
  Post /api/Auth/LogOut
```

## Products

### Get Products

```
  GET /api/Product/List
```

### Get Product

```
  GET /api/Product/Get/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

### Add Product

```
  Post /api/Product/Create
```

| Body          | Type     | Description   |
| :------------ | :------- | :------------ |
| `userId`        | `string` | **Required**. |



### Delete Product

```
  Delete /api/Product/Delete/${id}
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

## Users

### Get Users

```
  GET /api/User/List
```

### Get User

```
  GET /api/User/Get/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

### Get User by email

```
  GET /api/User/email/${email}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`   | `string` | **Required**. Id of item to fetch |

### Get User by username

```
  GET /api/User/username/${username}
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `username` | `string` | **Required**. Id of item to fetch |

### Add User

```
  Post /api/User/Create
```

| Body              | Type     | Description   |
| :---------------- | :------- | :------------ |
| `firstname`       | `string` | **Required**. |
| `lastname`        | `string` | **Required**. |
| `email`           | `string` | **Required**. |
| `username`        | `string` | **Required**. |
| `password`        | `string` | **Required**. |
| `confirmPassword` | `string` | **Required**. |
| `role`            | `number` | **Required**. |

### Update User

```
  Put /api/User/Update/${id}
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

| Body              | Type     | Description   |
| :---------------- | :------- | :------------ |
| `firstname`       | `string` | **Required**. |
| `lastname`        | `string` | **Required**. |
| `email`           | `string` | **Required**. |
| `username`        | `string` | **Required**. |
| `password`        | `string` | **Required**. |
| `confirmPassword` | `string` | **Required**. |
| `role`            | `number` | **Required**. |

### Delete User

```
  Delete /api/User/Delete/${id}
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

## Authors

[![ImRLopezAG](https://img.shields.io/badge/ImRLopezAG-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ImRLopezAG)

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://imrlopez.dev)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/angel-gabriel-lopez/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/imr_lopez)
