# DroneHive

## A Decentralized Drone Delivery Management System (DDDMS) for Machine IDs

## Overview

The Decentralized Drone Delivery Management System (DDDMS) is a cutting-edge, blockchain-enabled platform designed to revolutionize the logistics industry. This peer-to-peer system allows users to autonomously enlist their drones for various delivery tasks, creating an efficient and decentralized delivery network. Leveraging GPS, IoT, and blockchain technologies, DDDMS aims to provide secure, transparent, and reliable delivery services.

## Key Features

- **User Registration and Drone Listing:** Users can register and list their drones, specifying details like specifications, availability, and service fees.
- **Delivery Request and Matching:** Customers can place delivery requests; the system matches these with the best-suited drone.
- **Real-Time Tracking:** GPS technology integration allows for real-time tracking of drones and deliveries (BACKLOG).
- **Blockchain Integration:** Secure and transparent transactions with blockchain technology using the Polkadot and Peaq SDK's (BACKLOG) for payment processing and drone identity verification.
- **Feedback and Rating System:** Post-delivery feedback mechanism for service improvement.
- **Analytics Dashboard:** Data-driven insights for drone operators and administrators (BACKLOG).
- **Docker Containerization:** The application is containerized using Docker for scalable and easy deployment.

## Technologies Used

- **Frontend:** Next.js 14, Tailwind CSS, Framer Motion, GSAP, SIWS Substrate Login.
- **Backend:** Express.js, Supabase Storage and Database features
- **Blockchain:** Substrate (Polkadot SDK) log ins with nonce and verify signature with JWT expiry for blockchain to back-end interactions, Peaq Network javascript sdk.
- **Others:** Redis (caching  - pending), Docker (containerization), Lightweight Charts (analytics - pending), GPS and IoT integration (pending)

## Getting Started

### Prerequisites

- Node.js
- Docker (for containerization)
- A blockchain wallet like Polkadot.js for Substrate-based sign-in using SIWS (for blockchain functionalities).

### Docker Installation

The **Docker** setup for the DroneHive project includes configurations for both the front-end and back-end services. It is defined using a docker-compose.yml file and individual Dockerfile files for each service within each repository.

1. Clone the repository monorepo:
2. Run the following command in the terminal:

   ```bash
   docker-compose build --no-cache

   ```

3. And then run the following command:

   ```bash
   docker-compose up --build

   ```

4. Wait for both Next.js and Express.js microservices to run in port :3000 and :5000 respectively.


### Clone Repo Instructions 
Front-end node =18
Run the following command in the terminal:

   ```bash
   yarn dev

   ```
Back-end node =18
Run the following command in the terminal:

   ```bash
   npm start

   ```

### Development Environment Installation

1. Clone the repository:
2. Navigate to the project directory front-end and backend
3. Install dependencies (yarn on frontend) (npm start on backend)
4. Set up environment variables: Rename .env.example to .env and fill in the necessary details.

### Honorable Mentions

Special thanks for the inspiration to the teams at:

- **SIWS Talisman**

  - **GitHub**: [SIWS GitHub](https://github.com/TalismanSociety/siws)
  - **Website**: [SIWS Official Website](https://siws.xyz/)

- **Supabase**

  - **GitHub**: [SIWS GitHub](https://github.com/supabase/supabase-js)
  - **Website**: [SIWS Official Website](https://supabase.com/)

- **Ribbon Finance**
  - **GitHub**: [Ribbon Finance GitHub](https://github.com/riribbonbbon-finance)
  - **Website**: [Ribbon Finance Official Website](https://ribbon.finance/)

Their innovative approaches and cutting-edge solutions have been a significant source of inspiration for this technical task work.
