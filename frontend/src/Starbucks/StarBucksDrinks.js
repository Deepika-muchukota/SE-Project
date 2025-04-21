.star-opt-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #0cefef;
}

.star-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 items per row */
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  justify-content: center;
}

.star-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #0ce34d;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.star-grid-item:hover {
  transform: scale(1.05);
}

.star-category-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.star-category-name {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.star-quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.star-quantity-controls button {
  background-color: #00704a;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.star-quantity-controls button:hover {
  background-color: #004d32;
}

.confirm-order-button {
  background-color: #d62d20;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.2s;
}

.confirm-order-button:hover {
  background-color: #b0241a;
}

.starbucks-container {
max-width: 1200px;
margin: 0 auto;
padding: 20px;
background-color: #f0f8ff;
min-height: 100vh;
}

.starbucks-container h1 {
text-align: center;
color: #006241;
margin-bottom: 30px;
font-size: 2.5rem;
}

.menu-grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
gap: 25px;
}

.menu-item {
background-color: white;
border-radius: 10px;
overflow: hidden;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
transition: transform 0.3s ease, box-shadow 0.3s ease;
display: flex;
flex-direction: column;
}

.menu-item:hover {
transform: translateY(-5px);
box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.menu-item img {
width: 100%;
height: 200px;
object-fit: cover;
}

.menu-item h3 {
padding: 15px 15px 5px;
margin: 0;
color: #333;
font-size: 1.2rem;
}

.menu-item .price {
padding: 0 15px 15px;
margin: 0;
color: #006241;
font-weight: bold;
font-size: 1.1rem;
}

.quantity-controls {
display: flex;
align-items: center;
justify-content: center;
padding: 0 15px 15px;
gap: 10px;
}

.quantity-btn {
width: 36px;
height: 36px;
border-radius: 50%;
border: none;
font-size: 1.2rem;
font-weight: bold;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
transition: all 0.2s ease;
color: white;
}

.decrease-btn {
background-color: #dc3545 !important;
color: white !important;
}

.decrease-btn:hover {
background-color: #c82333 !important;
}

.decrease-btn:disabled {
background-color: #e9a2a6 !important;
cursor: not-allowed;
}

.increase-btn {
background-color: #28a745 !important;
color: white !important;
}

.increase-btn:hover {
background-color: #218838 !important;
}

.quantity-display {
font-size: 1.2rem;
font-weight: bold;
min-width: 30px;
text-align: center;
color: #006241;  /* Starbucks green color */
}

.loading {
text-align: center;
padding: 50px;
font-size: 1.2rem;
color: #666;
}

.error {
text-align: center;
padding: 20px;
color: #dc3545;
background-color: #f8d7da;
border-radius: 5px;
margin: 20px;
}

@media (max-width: 768px) {
.menu-grid {
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 15px;
}

.menu-item img {
  height: 180px;
}
}

@media (max-width: 480px) {
.menu-grid {
  grid-template-columns: 1fr;
}

.starbucks-container {
  padding: 10px;
}

.starbucks-container h1 {
  font-size: 2rem;
}
}

.food-stalls-container {
background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
min-height: 100vh;
padding: 20px;
}

.food-stalls-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 30px;
max-width: 1200px;
margin: 0 auto;
padding: 20px;
}

.food-stall-card {
background: white;
border-radius: 15px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
transition: transform 0.3s ease, box-shadow 0.3s ease;
overflow: hidden;
}

.food-stall-card:hover {
transform: translateY(-5px);
box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
