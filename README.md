
# Vending machine

A Vending machine that keeps track of change and products in the machine.


## Installation

After cloning the repo

```bash
  cd vending-machine
  npm install 
```

Run the project

```bash
  npm run dev
```
This will start the dev serve on port 3000
## API Reference

#### Setup products

```http
  POST /api/v1/inventory
```
Pass an array of products to set up the inventory.

#### Setup change

```http
  POST /api/v1/change
```
Pass an array of change to set up the cash register.

#### Get all products

```http
  GET /api/v1/inventory
```


#### Get product

```http
  GET /api/v1/inventory/${uid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uid`      | `string` | **Required**. unique code of product to fetch |

#### Update product

```http
  PUT /api/v1/inventory/:uid
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uid`     | `string` | **Required**. unique code of product to update |
| `count`   | `string` | Updates the new count


#### Delete product

```http
  DELETE /api/v1/inventory/:uid
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uid`     | `string` | **Required**. unique code of product to delete |


#### buy products

```http
  POST /api/v1/buy
```
Buy an inventory item.
## Authors

- [@tesfa-ozem](https://www.github.com/tesfa-ozem)

