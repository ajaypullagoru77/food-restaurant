FOOD RESTAURANT

Project Overview:
Food Restaurant is a responsive, modern web application designed to simulate an online food ordering platform. Inspired by contemporary restaurant websites, it features a visually appealing interface with sections for browsing food items, viewing customer reviews, and placing orders. The application includes a shopping cart, user authentication, payment processing, and smooth animations, providing a seamless user experience across devices.

Features:
*Interactive Menu: Browse food items categorized as specialties, popular dishes, and gallery items.
*Shopping Cart: Add, remove, and adjust quantities of food items in the cart, with local storage persistence.
*User Authentication: Register and log in with credentials stored in local storage.
*Payment Processing: Simulated payment form for completing orders.
*Responsive Design: Optimized for desktop, tablet, and mobile devices with a collapsible navbar.
*Scroll Animations: Smooth section transitions and scroll-to-top functionality.
*Loader Animation: Engaging loading screen on page load.
*Social Media Integration: Links to social media profiles in the footer.

Demo:
A live demo of the project will be hosted soon (add link here once deployed). Alternatively, you can run the project locally by following the installation instructions below.

Installation
To run Food Restaurant locally, follow these steps:

1.Clone the Repository:
git clone https://github.com/ajaypullagoru77/food-restaurant.git

2.Navigate to the Project Directory:
cd food-restaurant

3.Open the Project:
*Open index.html in a web browser directly, or
*Use a local server (e.g., Live Server in VS Code or http-server via Node.js) for the best experience:
npm install -g http-server
http-server

4.Ensure Dependencies:
*The project uses Font Awesome 5.15.3 for icons, loaded via CDN.
*Ensure all image files referenced in index.html are available in the images/ directory.

Usage:
1.Navigate the Site: Use the navbar to access Home, Speciality, Popular, Gallery, Review, and Order sections.
2.Add to Cart: Click "Order Now" on food items in the Popular or Gallery sections to add them to the cart.
3.View Cart: Click the cart icon to view and manage cart items, including adjusting quantities or removing items.
4.Authenticate: Click the user icon to log in or register. Authentication is required to proceed to payment.
5.Place Order: Complete the order form in the Order section or proceed to payment from the cart.
6.Responsive Menu: On mobile devices, click the menu icon to toggle the navbar.

Project Structure:
food-restaurant/
├── images/              # Images for home, speciality, popular, steps, gallery, and review sections
│   ├── home/            # Home section images
│   ├── specality/       # Speciality section images and icons
│   ├── popular/         # Popular section images
│   ├── steps/           # Steps section images
│   ├── gallery/         # Gallery section images
│   └── review/          # Review section images
├── styles.css           # Stylesheet for the application
├── script.js            # JavaScript for functionality
├── index.html           # Main HTML file
└── README.md            # Project documentation

Technologies Used:

*HTML5: For structuring the web application.
*CSS3: For styling, including animations, responsive design, and custom effects like hover transitions.
*JavaScript: For dynamic functionality, including cart management, authentication, and animations.
*Font Awesome 5.15.3: For icons used in the UI.
*Local Storage: To persist cart items and user authentication data.
*Google Fonts (Nunito): For typography.

Contributing
Contributions are welcome! To contribute:

1.Fork the repository.
2.Create a new branch (git checkout -b feature/your-feature).
3.Make your changes and commit (git commit -m 'Add your feature').
4.Push to the branch (git push origin feature/your-feature).
5.Open a pull request.
Please ensure your code follows the existing style and includes appropriate comments.

Future Enhancements:
*Integrate a backend API for dynamic food item data and real user authentication.
*Add a search functionality to filter food items.
*Implement a real payment gateway (e.g., Stripe or PayPal).
*Enhance accessibility features for better usability.
*Add more interactive animations for food item previews.

License:
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any inquiries or feedback, please reach out via GitHub Issues or contact me at ajaykumarpullagoru77@example.com.

Built with 🍴 by Ajay Pullagoru

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FOOD RESTARANT</title>
</head>
<body>
    <img src="food restarant.png" width="100%" height="100%">

    </image>
</body>
</html>
