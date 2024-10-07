# TODO:

## PAGES:

- [x] home
- [x] about
- [ ] admin
  - [x] add product
  - [x] edit product
  - [x] floor plans
  - [x] products
  - [ ] dashboard
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
- [ ] profile
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
- [ ] add category field to the product schema
- [ ] api route for similar products

## AFTER API BUILDING:

- [x] Secure /admin routes
- [x] Populate fields for admin/edit-product
- [x] handle files
  - [x] admin/add-products
  - [x] contact
- [x] form values for contact
- [x] add google analytics
- [ ] Dashboard for admin
  - [ ] charts based on number of queries from google analytics
- [ ] Slack Integration

## GENERAL:

- [x] After signing in, the navbar should show logout and not login
- [x] After signing in, if the user is an admin then a button for admin pannel should be visible
- [x] Make logo
- [ ] Add error on forms(form validation)
  - [ ] contact form
  - [ ] add product form

## BONUS:

- [ ] Custom signup page
- [ ] Custom signin page
- [ ] Featured products
  - [ ] add featured field in product schema and modify the api route
  - [ ] display featured products in homescreen
