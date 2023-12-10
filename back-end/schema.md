

# Database Schema Diagram
Users
  |
  +---> Drones
  |
  +---> Orders
          |
          +---> OrderDetails


Detailed Table Schemas
## Users
walletAddress (PK)

## Drones
droneId (PK)
ownerWalletAddress (FK to Users)
title
description
imagePath

## Orders
orderId (PK)
walletAddress (FK to Users)
droneId (FK to Drones)
orderStatus
createdAt

## OrderDetails
detailsId (PK)
orderId (FK to Orders)
address
description
rating
comment
