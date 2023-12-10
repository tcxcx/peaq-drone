

# Database Schema Diagram
Tables Overview

Users
  │
  ├── Orders
  │    │
  │    ├── OrderDetails
  │    │
  │    └── Drones
  │
  └── Drones

1. Users
+-------------------+
| Users             |
+-------------------+
| PK walletAddress  |
+-------------------+

2. Drones
+--------------------------------------------------+
| Drones                                          |
+--------------------------------------------------+
| PK droneId                                      |
| FK ownerWalletAddress  ───> Users.walletAddress |
| title                                           |
| description                                     |
| imagePath                                       |
+--------------------------------------------------+

3. Orders
+--------------------------------------------------+
| Orders                                          |
+--------------------------------------------------+
| PK orderId                                      |
| FK walletAddress ───> Users.walletAddress       |
| FK droneId ───────> Drones.droneId              |
| orderStatus                                     |
| createdAt                                       |
+--------------------------------------------------+

4. OrderDetails

+---------------------------------------------+
| OrderDetails                                |
+---------------------------------------------+
| PK detailsId                                |
| FK orderId ─────> Orders.orderId            |
| address                                     |
| description                                 |
| rating                                      |
| comment                                     |
+---------------------------------------------+

