# Aeroflow Webstore


Aeroflow is a responsive e-commerce webstore tailored for the ventilation systems business. It enables clients to explore a wide range of products and easily upload their floor plans for further discussions. The platform also features an intuitive admin panel for managing product listings efficiently.

---

## Key Features
- **User Profile Management**: Easily manage user profiles, including updating details and connecting external accounts.
- **Secure Authentication**: Powered by Clerk for seamless and secure user authentication.
- **Admin Panel**: Dedicated section for administrators to manage user data and app settings.
- **Responsive Design**: Optimized for both desktop and mobile experiences.
- **Scalable Backend**: Built with Payload CMS and GraphQL for flexibility and scalability.

---

## Technologies Used
- **Frontend**: React and Next.js with TailwindCSS for styling.
- **Backend**: Payload CMS with MongoDB for database management.
- **Authentication**: Clerk for user authentication.
- **GraphQL**: For efficient data fetching and management.
- **UI Components**: NextUI for dropdowns, accordions, and modals.

---


## Prerequisites
Before running the application, ensure the following are installed on your machine:
1. **Node.js** (v16+)
2. **npm** or **yarn**
3. **MongoDB** (local or cloud instance)
4. **Clerk Account** (for User Management)
---

## Installation and Setup
Follow these steps to set up and run the Aeroflow web application:

### 1. Clone the Repository
```bash
git clone https://github.com/KaalaAadmi/aeroflow.git
cd aeroflow
```
### 2. Install Dependencies 
Install the required dependencies using npm or yarn:

```bash
npm install
# OR
yarn install

```
## Running the Application
### 1. Configure Environment Variables
Modify the .env file in the root directory and add the following environment variables:
```bash
MONGODB_URI=<Your MongoDB Connection String>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<Your Clerk Frontend API Key>
CLERK_SECRET_KEY=<Your Clerk Secret API Key>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signin
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
CLOUDINARY_URL=<Your Cloudinary URL>
CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
NEXT_PUBLIC_CLOUDINARY_PRESET_NAME=<Your Cloudinary Preset Name>
NEXT_PUBLIC_URL=<This would be: `http://localhost:3000` while development, otherwise, make it your production URL>
GOOGLE_CLIENT_ID=<Your Google Analytics Tag>
```

> NOTE: `GRAPHQL_ENDPOINT` is your host followed by `/api/graphql`, so for local dev environment, it will be: `http://localhost:3000/api/graphql`


### 2. Run the Application
Start the development server:
```bash 
npm run dev
# OR
yarn dev

```
The app will be accessible at `http://localhost:3000`
### 3. Production Build
To build and serve the app for production:
```bash 
npm run build
npm start

```

# 6. Summary:

### Things to Replace:
- Replace `https://github.com/KaalaAadmi/aeroflow.git` with the actual repository URL.
- Replace `<Your Clerk Frontend API Key>`, `<Your MongoDB Connection String>`, and other placeholder values with the actual environment variable names and descriptions.
- Add your actual support email or contact details under the **Support** section.

This `README.md` provides a detailed overview and setup guide for the Aeroflow web application, making it easy for others to understand and run the app.
