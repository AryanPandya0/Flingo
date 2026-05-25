# Flingo Backend Implementation Plan (8-Day Roadmap)

This document outlines the step-by-step strategy for building the MERN stack backend for the Flingo Social Media Application.

## Day 1: Foundation & Database Architecture
**Objective:** Set up the server environment and design the data structures.
*   Initialize Node.js project and install core dependencies (`express`, `mongoose`, `dotenv`, `cors`).
*   Set up the Express server and connect it to a MongoDB cluster (MongoDB Atlas).
*   Define the Mongoose Schemas and Models:
    *   `User` (auth details, bio, followers array).
    *   `Post` (content, media, author ref).
    *   `Comment` & `Notification`.
*   Implement basic global error handling middleware.

## Day 2: Authentication & Security
**Objective:** Secure the application and implement user registration/login.
*   Install security dependencies (`bcryptjs`, `jsonwebtoken`, `cookie-parser`).
*   Build `POST /api/auth/register` (hash passwords before saving).
*   Build `POST /api/auth/login` (verify passwords and issue JWTs).
*   Create a `protectRoute` middleware to verify JWTs for private routes.
*   Build `POST /api/auth/logout` (clear cookies).

## Day 3: User Profiles & The Social Graph
**Objective:** Enable users to edit profiles and interact with each other.
*   Build `GET /api/users/:username` to fetch profile data and follower counts.
*   Build `PUT /api/users/update` for profile editing (bio, display name).
*   Implement the Follow/Unfollow logic (`POST /api/users/follow/:id`).
    *   Update both the follower's `following` array and the target's `followers` array.
*   Implement `POST /api/users/bookmark/:postId` for the Bookmarks page.

## Day 4: Content Creation & Media Uploads
**Objective:** Allow users to create posts with images.
*   Set up Cloudinary and Multer for handling multipart/form-data (image uploads).
*   Build `POST /api/posts/create` (upload image to Cloudinary, save URL to MongoDB).
*   Build `DELETE /api/posts/:id` (delete post from DB and Cloudinary).
*   Build `GET /api/posts/user/:username` to fetch posts for a specific user's profile.

## Day 5: Feeds & Post Interactions
**Objective:** Populate the Home/Explore feeds and enable likes/comments.
*   Build `GET /api/posts/feed` (The Home Feed): Query posts *only* from users the current user follows, sorted by date.
*   Build `GET /api/posts/explore`: Query recent/popular posts from all public users.
*   Build `POST /api/posts/like/:id`: Toggle like/unlike status.
*   Build `POST /api/posts/comment/:id`: Add a comment object to a post.

## Day 6: Real-time Messaging (WebSockets)
**Objective:** Implement live direct messaging using Socket.io.
*   Integrate `socket.io` with the Express server.
*   Create `Message` and `Conversation` MongoDB models.
*   Build `GET /api/messages/conversations` (fetch inbox).
*   Build `GET /api/messages/:userId` (fetch chat history).
*   Build `POST /api/messages/send/:userId` (save message to DB and emit real-time socket event to the receiver).

## Day 7: Notifications & Final Polish
**Objective:** Keep users engaged with activity alerts and secure the app.
*   Build logic to automatically generate a `Notification` document when someone likes, comments, or follows.
*   Build `GET /api/notifications` to fetch a user's alerts.
*   Emit real-time socket events for notifications so the UI updates instantly.
*   Conduct API testing using Postman.
*   Clean up console logs and refine error messages.

## Day 8: Frontend Integration
**Objective:** Connect the React UI to the new Backend.
*   Set up React Context or Zustand to manage global Auth state (user data) on the frontend.
*   Replace mock data in Home, Explore, and Profile pages with `fetch/axios` calls to the API.
*   Wire up the Login/Register forms.
*   Connect the UI components for messaging and notifications to Socket.io client.
