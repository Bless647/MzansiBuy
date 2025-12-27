<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Admin Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="main.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>

<header class="top">
  <h1>Admin Dashboard</h1>
</header>

<!-- Password Modal -->
<div id="passwordModal" class="modal">
  <div class="modal-content">
    <h2>Enter Admin Password</h2>
    <input type="password" id="adminPassword" placeholder="Password">
    <button id="loginAdmin">Login</button>
  </div>
</div>

<main id="adminContent" style="display:none;">
  <div class="admin-controls">
    <input type="text" id="productName" placeholder="Product Name">
    <input type="text" id="productDesc" placeholder="Description">
    <input type="number" id="productPrice" placeholder="Price">
    <input type="text" id="productImg" placeholder="Image URL">
    <button id="addProduct">Add Product</button>
  </div>
  <div id="adminProducts" class="grid"></div>
</main>

<script type="module" src="app.js"></script>
</body>
</html>