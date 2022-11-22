
# Vending machine

A Vending machine that keeps track of change and products in the machine.


## Run Locally

Clone the project

```bash
  git clone https://github.com/tesfa-ozem/vending-machine.git
```

Go to the project directory

```bash
  cd vending-machine
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Here is a postman collection for examples
- [Postman](https://www.getpostman.com/collections/74c8ae8413419c853e29)


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
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `amount`     | `array` | **Required**. The value of the denominations put in|
| `uniqueCode`     | `string` |  Unique code of the product being bought|
| `unit`     | `string` |  If not specified it returns the change in cents. If in dollers it returns dollers|

Buy an inventory item.

#### Withdraw change

```http
  POST /api/v1/withdraw
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `amount`     | `number` | **Required**. The amount to withdraw |
| `unit`     | `string` |  If not specified it returns the change in cents. If in dollers it returns dollers|

Withdraw change from the machine.

#### Get available change in the machine

```http
  GET /api/v1/change
```

Returns the available change in the machine

#### Update change

```http
  PUT /api/v1/change
```

Pass an array of change objects to update change
## Authors

- [@tesfa-ozem](https://www.github.com/tesfa-ozem)

