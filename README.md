# Wishing
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Shashikantgiri-web/wishing)

Wishing is a modern, interactive, and beautifully animated web application designed to celebrate birthdays in a unique and memorable way. It allows users to create personalized birthday pages that are dynamically rendered based on whether it's their special day. The platform features an "anti-gravity" theme with floating elements, special VIP experiences, and the ability for friends to send heartfelt wishes.

## Key Features

*   **Personalized Birthday Pages:** Each user gets a dedicated page that transforms on their birthday.
*   **Dynamic Layout System:**
    *   **Birthday Layout:** A celebratory view for users on their birthday, complete with a grand hero animation, surprise elements, and a message display.
    *   **VIP Birthday Layout:** An enhanced experience for special users, featuring custom 3D avatars, personalized videos, and a "Floating Memories" photo gallery.
    *   **Normal Layout:** A feed-style view for non-birthday days, allowing users to see whose birthday it is, explore upcoming celebrations, and send wishes.
*   **Interactive Components:** Engage with an animated "Surprise Box" that unleashes a confetti celebration and a special message.
*   **Send & Receive Wishes:** Friends and family can send messages that appear on the celebrant's page.
*   **Animated "Anti-Gravity" Theme:** A GSAP-powered background with floating particles creates a whimsical and magical user experience.
*   **VIP Admin Panel:** A dedicated page (`/special-admin`) to manage VIP users and their unique content, including 3D models, videos, and photo memories.
*   **Secure Authentication:** User management and authentication are handled securely by Clerk.

## Tech Stack

*   **Framework:** Next.js (with App Router)
*   **Language:** JavaScript, React
*   **Database:** MongoDB
*   **Authentication:** Clerk
*   **Styling:** Tailwind CSS, shadcn/ui
*   **Animation:** GSAP (GreenSock Animation Platform)

## Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

*   Node.js (v18 or later)
*   npm, yarn, or pnpm
*   MongoDB Atlas account (or a local MongoDB instance)
*   Clerk account

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/shashikantgiri-web/wishing.git
    cd wishing
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the following environment variables with your credentials:

    ```env
    # MongoDB Connection String
    MONGODB_URI="your_mongodb_connection_string"

    # Clerk Authentication Keys
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
    CLERK_SECRET_KEY="your_clerk_secret_key"
    ```

4.  **Seed the database with a VIP user (Optional):**
    To test the VIP Birthday Layout, you can run the seed script. Edit the user details in `scripts/seed-special.js` first, then run:
    ```sh
    node scripts/seed-special.js
    ```

5.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Project Structure

The repository is organized to follow Next.js conventions and maintain a clear separation of concerns.

```
/
├── app/                  # Main application directory (App Router)
│   ├── (layouts)/        # Page routes for different user experiences
│   │   ├── birthday_layout-1/ # Standard birthday page
│   │   ├── birthday_layout-2/ # VIP birthday page
│   │   └── normal_layout-3/  # Non-birthday feed page
│   ├── api/              # API route handlers
│   └── page.js           # Homepage / User Onboarding
├── components/           # Reusable React components
├── lib/                  # Library functions (DB connection, utils)
├── public/               # Static assets (images, videos)
└── scripts/              # Standalone scripts (e.g., DB seeding)
```

## API Endpoints

The application uses Next.js API Routes to handle backend logic and database interactions.

| Endpoint                | Method | Description                                                              |
| ----------------------- | ------ | ------------------------------------------------------------------------ |
| `/api`                  | `POST` | Creates a new user profile in the database after initial sign-up.        |
| `/api/check-user`       | `GET`  | Checks if a user with a given email exists in the database.              |
| `/api/messages`         | `POST` | Submits a new wish/message for a specific user.                          |
| `/api/messages`         | `GET`  | Fetches all messages sent to a specific user.                            |
| `/api/special-users`    | `POST` | Creates or updates a special/VIP user with premium content.              |
| `/api/special-users`    | `GET`  | Retrieves the list of all special/VIP users.                             |
| `/api/users`            | `GET`  | Fetches a list of all registered users for the "Explore" page.           |
