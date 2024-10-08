# TODO:

## PAGES:

- [x] home
- [x] about
- [x] admin
  - [x] add product
  - [x] edit product
  - [x] floor plans
  - [x] products
  - [-] dashboard
- [x] faq
- [x] privacy-policy
- [x] products
  - [x] get products from db
  - [x] make products page as per requirement
  - [x] make product details page as per requirement
  - [-] filters \***\*\*\*\*\*\*\***OMIT**\*\***\*\*\***\*\***
- [x] product details page
- [x] terms-and-conditions
- [x] login
- [x] register
- [x] profile - already in clerk userbutton
- [x] contact

## COMPONENTS:

- [x] Navbar
- [x] Product Card for Featured Home
- [x] Testimonials
- [x] ProductTable for admin
- [x] Footer

## API:

- [x] /upload-files
  - [x] upload images and pdfs to cloudinary and add link to mongodb
- [x] /add-product
  - [x] upload images to cloudinary and add link to mongodb
- [x] /update-product
- [x] /get-all-product
- [x] api for modifying product
- [x] api for deleting the images from cloudinary and mongodb
- [x] add category field to the product schema
- [x] api route for similar products
- [x] add featured field to the products schema
- [x] api route for featured products

## AFTER API BUILDING:

- [x] Secure /admin routes
- [x] Populate fields for admin/edit-product
- [x] handle files
  - [x] admin/add-products
  - [x] contact
- [x] form values for contact
- [x] add google analytics
- [-] Dashboard for admin
  - [-] charts based on number of queries from google analytics
- [ ] Slack Integration

## GENERAL:

- [x] After signing in, the navbar should show logout and not login
- [x] After signing in, if the user is an admin then a button for admin pannel should be visible
- [x] Make logo
- [x] Add error on forms(form validation)
  - [x] contact form
  - [x] add product form

## BONUS:

- [ ] Custom signup page
- [ ] Custom signin page
- [ ] Custom profile page
- [x] Custom User Button
- [x] Featured products
  - [x] add featured field in product schema and modify the api route
  - [x] display featured products in homescreen
- [x] Add skeleton
- [x] on clicking the enquire button on the product details page, pass the name of the product as query to /contact and fill in the description as "I want to enquire about {product name}"
