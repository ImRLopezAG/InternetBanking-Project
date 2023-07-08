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

#### types of users

| Role | Description                |
| :--- | :------------------------- |
| 1    | **Admin**                  |
| 2    | **Client**                 |

### type of products

| Role | Description                |
| :--- | :------------------------- |
| 1    | **Debit**                 |
| 2    | **Credit**                  |
| 3   | **Saving**                  |
| 4   | **Loan**                  |

## Authenticate with JWT


```
  authorization: Bearer ${token}
```

#### Log In

```
  Post /api/Auth/LogIn
```

| Body       | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `email or username`    | `string` | **Required**.    |
| `password` | `string` | **Required**. |

#### Log out

```
  Post /api/Auth/logOut
```
## Users

unless you are authenticated as admin you can only get your own user and create a new one as a client

### Get Users

```
  GET /api/user/list
```

### Get User

```
  GET /api/user/get/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

### Get User by email

```
  GET /api/user/email/${email}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`   | `string` | **Required**. Id of item to fetch |

### Get User by username

```
  GET /api/user/username/${username}
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `username` | `string` | **Required**. Id of item to fetch |

### Add User

```
  Post /api/user/create
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
  Put /api/user/update/${id}
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
  Delete /api/user/delete/${id}
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |
## Products

### Get Products

```
  GET /api/product/list
```

### Get Product

```
  GET /api/product/get/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. |
### Get Product

```
  GET /api/product/get/${pin}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pin`      | `string` | **Required**. |

from here all the endpoints need to be authenticated as admin
### Add Product

```
  Post /api/product/create
```

| Body          | Type     | Description   |
| :------------ | :------- | :------------ |
| `user`        | `string` | **Required**. |
| `balance`        | `number` | **Optional**. |

### Add Balance

```
  Post /api/product/add-balance
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pin`      | `string` | **Required**. |
| `balance`        | `number` | **Required**. |

### Update Product

```
  Put /api/product/update/${id}
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

| Body          | Type     | Description   |
| :------------ | :------- | :------------ |
| `balance`        | `number` | **Required**. |
### Delete Product

```
  Delete /api/product/delete/${id}
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |


## Beneficiary 

### Get Beneficiaries

you need to be authenticated as admin

```
  GET /api/beneficiary/list
```
### Get all sender Beneficiaries

```
  GET /api/beneficiary/list/${sender}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `sender`      | `string` | **Required**. |

### Get Beneficiary

```
  GET /api/beneficiary/get/${id}  
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. |

### Add Beneficiary

```
  Post /api/beneficiary/create
```

| Body          | Type     | Description   |
| :------------ | :------- | :------------ |
| `sender`        | `string` | **Required**. |
| `receptor`        | `string` | **Required**. |

### Delete Beneficiary

you need to be authenticated as the sender of the beneficiary

```
  Delete /api/beneficiary/delete/${id}
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |


## Payment

### Get Payments

you need to be authenticated as admin

```
  GET /api/payment/list
```

### Get Payments by sender

```
  GET /api/payment/list/${sender}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `sender`      | `string` | **Required**. |

### Get Payment
you need to be authenticated as admin

```
  GET /api/payment/get/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. |

### Add Payment

you need to be authenticated as the sender of the payment or as admin

```
  Post /api/payment/create
```

| Body          | Type     | Description   |
| :------------ | :------- | :------------ |
| `sender`        | `string` | **Required**. |
| `receptor`        | `string` | **Required**. |
| `amount`        | `number` | **Required**. |



## Authors

[![ImRLopezAG](https://img.shields.io/badge/ImRLopezAG-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ImRLopezAG)

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://imrlopez.dev)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/angel-gabriel-lopez/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/imr_lopez)
