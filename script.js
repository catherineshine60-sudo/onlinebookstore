// ==========================================
// PROFESSIONAL ONLINE BOOK STORE
// Main JavaScript File
// ==========================================

// Sample Book Data
const booksData = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
    rating: 4.5,
    category: "Fiction",
    image: "images/great-gatsby.svg",
    description: "A classic American novel set in the Jazz Age.",
    language: "English",
    publisher: "Scribner",
    isbn: "978-0743273565"
  },
  {
    id: 2,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 18.99,
    rating: 4.7,
    category: "Non-Fiction",
    image: "images/sapiens.svg",
    description: "From the Stone Age to Modern Times.",
    language: "English",
    publisher: "Harper",
    isbn: "978-0062316097"
  },
  {
    id: 3,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    price: 15.99,
    rating: 4.4,
    category: "Science",
    image: "images/brief-history-time.svg",
    description: "Exploring the universe and physics.",
    language: "English",
    publisher: "Bantam",
    isbn: "978-0553380163"
  },
  {
    id: 4,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 32.99,
    rating: 4.6,
    category: "Technology",
    image: "images/clean-code.svg",
    description: "A Handbook of Agile Software Craftsmanship.",
    language: "English",
    publisher: "Prentice Hall",
    isbn: "978-0132350884"
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 10.99,
    rating: 4.2,
    category: "Fiction",
    image: "images/catcher-rye.svg",
    description: "A timeless coming-of-age novel.",
    language: "English",
    publisher: "Little, Brown",
    isbn: "978-0316769174"
  },
  {
    id: 6,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    price: 17.99,
    rating: 4.5,
    category: "Non-Fiction",
    image: "images/thinking-fast-slow.svg",
    description: "How our minds work and make decisions.",
    language: "English",
    publisher: "Farrar, Straus and Giroux",
    isbn: "978-0374275631"
  },
  {
    id: 7,
    title: "The Origin of Species",
    author: "Charles Darwin",
    price: 14.99,
    rating: 4.3,
    category: "Science",
    image: "images/origin-species.svg",
    description: "The foundation of evolutionary biology.",
    language: "English",
    publisher: "Penguin Classics",
    isbn: "978-0140043501"
  },
  {
    id: 8,
    title: "Steve Jobs",
    author: "Walter Isaacson",
    price: 19.99,
    rating: 4.6,
    category: "Biography",
    image: "images/steve-jobs.svg",
    description: "The exclusive biography of the Apple founder.",
    language: "English",
    publisher: "Simon & Schuster",
    isbn: "978-1451648539"
  },
  {
    id: 9,
    title: "The Lean Startup",
    author: "Eric Ries",
    price: 16.99,
    rating: 4.4,
    category: "Business",
    image: "images/lean-startup.svg",
    description: "Build successful startups.",
    language: "English",
    publisher: "Crown Business",
    isbn: "978-0307887894"
  },
  {
    id: 10,
    title: "Where the Wild Things Are",
    author: "Maurice Sendak",
    price: 8.99,
    rating: 4.7,
    category: "Children's Books",
    image: "images/where-wild-things-are.svg",
    description: "A classic children's adventure story.",
    language: "English",
    publisher: "HarperCollins",
    isbn: "978-0064431729"
  },
  {
    id: 11,
    title: "1984",
    author: "George Orwell",
    price: 13.99,
    rating: 4.5,
    category: "Fiction",
    image: "images/1984.svg",
    description: "A dystopian novel about totalitarianism.",
    language: "English",
    publisher: "Penguin Classics",
    isbn: "978-0451524935"
  },
  {
    id: 12,
    title: "The Business Book",
    author: "Jonathan Law",
    price: 24.99,
    rating: 4.3,
    category: "Business",
    image: "images/business-book.svg",
    description: "The essential concepts you need to know.",
    language: "English",
    publisher: "DK",
    isbn: "978-0241188812"
  }
];

// Global Variables
let cart = [];
let wishlist = [];
let currentTheme = localStorage.getItem('theme') || 'light';
let filteredBooks = [...booksData];

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  loadCartFromStorage();
  loadWishlistFromStorage();
  setupEventListeners();
  displayBooks(booksData);
  updateCartCount();
  setupScrollToTop();
  if (document.querySelector('.books-grid')) {
    displayBooks(booksData);
  }
});

// ==========================================
// THEME MANAGEMENT
// ==========================================

function initializeTheme() {
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
}

// ==========================================
// EVENT LISTENERS
// ==========================================

function setupEventListeners() {
  // Theme Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Search Functionality
  const heroSearch = document.querySelector('.hero-search button');
  if (heroSearch) {
    heroSearch.addEventListener('click', () => {
      const query = document.querySelector('.hero-search input').value;
      searchBooks(query);
    });
  }

  // Newsletter Subscription
  const newsletterBtn = document.querySelector('.newsletter-form button');
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.querySelector('.newsletter-form input').value;
      if (email) {
        alert(`Thank you for subscribing with ${email}!`);
        document.querySelector('.newsletter-form input').value = '';
      }
    });
  }

  // Contact Form
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const submitBtn = contactForm.querySelector('.btn-primary');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
      });
    }
  }

  // Profile Nav
  const profileNavButtons = document.querySelectorAll('.profile-nav button');
  profileNavButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const sectionName = btn.dataset.section;
      switchProfileSection(sectionName);
    });
  });

  // Filters
  const categoryFilter = document.querySelector('#categoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', applyFilters);
  }

  const sortFilter = document.querySelector('#sortFilter');
  if (sortFilter) {
    sortFilter.addEventListener('change', applyFilters);
  }

  const searchFilter = document.querySelector('#searchFilter');
  if (searchFilter) {
    searchFilter.addEventListener('input', applyFilters);
  }

  // Checkout Button
  const checkoutBtn = document.querySelector('.checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your cart is empty!');
      } else {
        const total = calculateCartTotal();
        saveOrderToHistory(cart, total);
        alert(`Order placed successfully! Total: $${total.toFixed(2)}`);
        cart = [];
        saveCartToStorage();
        updateCartCount();
        displayCart();
      }
    });
  }

  // Chat Functionality
  const chatButton = document.querySelector('.chat-input button');
  if (chatButton) {
    chatButton.addEventListener('click', sendChatMessage);
  }

  const chatInput = document.querySelector('.chat-input input');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    });
  }
}

// ==========================================
// CART FUNCTIONS
// ==========================================

function addToCart(bookId) {
  const book = booksData.find(b => b.id === bookId);
  if (!book) return;

  const existingItem = cart.find(item => item.id === bookId);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      ...book,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartCount();
  showNotification(`"${book.title}" added to cart!`);
}

function removeFromCart(bookId) {
  cart = cart.filter(item => item.id !== bookId);
  saveCartToStorage();
  updateCartCount();
  displayCart();
}

function updateQuantity(bookId, quantity) {
  const item = cart.find(item => item.id === bookId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveCartToStorage();
    displayCart();
  }
}

function calculateCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  if (cartCount) {
    cartCount.textContent = totalItems;
    if (totalItems === 0) {
      cartCount.style.display = 'none';
    } else {
      cartCount.style.display = 'flex';
    }
  }
}

function displayCart() {
  const cartContainer = document.querySelector('.cart-items');
  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🛒</div><h2>Your cart is empty</h2><p>Add some books to get started!</p></div>';
    return;
  }

  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-image"><img src="${item.image}" alt="${item.title} cover"></div>
      <div class="cart-item-details">
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-author">${item.author}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div class="quantity-selector">
          <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <input type="number" value="${item.quantity}" readonly>
          <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
        <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    </div>
  `).join('');

  // Update summary
  const total = calculateCartTotal();
  const summarySubtotal = document.querySelector('.summary-row:not(.total) span');
  const summaryTotal = document.querySelector('.summary-row.total span');
  
  if (summarySubtotal) summarySubtotal.textContent = `$${total.toFixed(2)}`;
  if (summaryTotal) summaryTotal.textContent = `$${total.toFixed(2)}`;
}

function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
  const saved = localStorage.getItem('cart');
  if (saved) {
    cart = JSON.parse(saved);
  }
}

function saveOrderToHistory(orderItems, total) {
  const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
  const order = {
    id: `ORD${Date.now()}`,
    date: new Date().toLocaleDateString(),
    books: orderItems.reduce((sum, item) => sum + item.quantity, 0),
    total: Number(total.toFixed(2)),
    status: 'Paid',
    items: orderItems.map(item => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      price: item.price
    }))
  };

  savedOrders.unshift(order);
  localStorage.setItem('orders', JSON.stringify(savedOrders));
}

// ==========================================
// WISHLIST FUNCTIONS
// ==========================================

function addToWishlist(bookId) {
  const book = booksData.find(b => b.id === bookId);
  if (!book) return;

  if (!wishlist.find(item => item.id === bookId)) {
    wishlist.push(book);
    saveWishlistToStorage();
    showNotification(`"${book.title}" added to wishlist!`);
  } else {
    removeFromWishlist(bookId);
  }
}

function removeFromWishlist(bookId) {
  wishlist = wishlist.filter(item => item.id !== bookId);
  saveWishlistToStorage();
  const wishlistContainer = document.querySelector('.wishlist-grid');
  if (wishlistContainer) {
    displayWishlist();
  }
}

function displayWishlist() {
  const container = document.querySelector('.wishlist-grid');
  if (!container) return;

  if (wishlist.length === 0) {
    container.innerHTML = '<div class="empty-state" style="grid-column: 1/-1;"><div class="empty-state-icon">❤️</div><h2>Your wishlist is empty</h2><p>Save books you love for later!</p></div>';
    return;
  }

  container.innerHTML = wishlist.map(book => createBookCard(book)).join('');
}

function saveWishlistToStorage() {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function loadWishlistFromStorage() {
  const saved = localStorage.getItem('wishlist');
  if (saved) {
    wishlist = JSON.parse(saved);
  }
}

// ==========================================
// BOOK DISPLAY FUNCTIONS
// ==========================================

function createBookCard(book) {
  const inWishlist = wishlist.find(item => item.id === book.id);
  return `
    <div class="book-card">
      <div class="book-image"><img src="${book.image}" alt="${book.title} cover"></div>
      <div class="book-content">
        <div class="book-title">${book.title}</div>
        <div class="book-author">by ${book.author}</div>
        <div class="book-rating">⭐ ${book.rating} <span>(${Math.floor(Math.random() * 1000) + 50} reviews)</span></div>
        <div class="book-price">$${book.price.toFixed(2)}</div>
        <div class="book-actions">
          <button class="btn-small btn-add-cart" onclick="addToCart(${book.id})">Add to Cart</button>
          <button class="btn-small btn-wishlist" onclick="addToWishlist(${book.id})" style="background: ${inWishlist ? '#e94560' : '#f0f0f0'}; color: ${inWishlist ? 'white' : '#e94560'};">
            ❤️
          </button>
        </div>
      </div>
    </div>
  `;
}

function displayBooks(books) {
  const container = document.querySelector('.books-grid');
  if (!container) return;

  if (books.length === 0) {
    container.innerHTML = '<div class="empty-state" style="grid-column: 1/-1;"><div class="empty-state-icon">📚</div><h2>No books found</h2><p>Try adjusting your filters or search terms.</p></div>';
    return;
  }

  container.innerHTML = books.map(book => createBookCard(book)).join('');
}

function displayBookDetails(bookId) {
  const book = booksData.find(b => b.id === bookId);
  if (!book) return;

  const container = document.querySelector('.book-details');
  if (!container) return;

  container.innerHTML = `
    <div class="book-cover-large"><img src="${book.image}" alt="${book.title} cover"></div>
    <div class="book-info">
      <h1>${book.title}</h1>
      <div class="author-name">by ${book.author}</div>
      <div class="rating">⭐ ${book.rating} stars (${Math.floor(Math.random() * 1000) + 50} reviews)</div>
      <div class="price-large">$${book.price.toFixed(2)}</div>
      
      <div class="book-details-spec">
        <div class="spec-item">
          <h4>Language</h4>
          <p>${book.language}</p>
        </div>
        <div class="spec-item">
          <h4>Publisher</h4>
          <p>${book.publisher}</p>
        </div>
        <div class="spec-item">
          <h4>ISBN</h4>
          <p>${book.isbn}</p>
        </div>
        <div class="spec-item">
          <h4>Category</h4>
          <p>${book.category}</p>
        </div>
      </div>

      <div class="book-description">
        <h3>Description</h3>
        <p>${book.description}</p>
      </div>

      <div class="detail-actions">
        <button class="btn btn-primary" onclick="addToCart(${book.id})">Add to Cart</button>
        <button class="btn btn-primary" onclick="alert('Proceeding to checkout with ${book.title}')">Buy Now</button>
      </div>
    </div>
  `;

  // Display related books
  const relatedContainer = document.querySelector('.related-books-grid');
  if (relatedContainer) {
    const relatedBooks = booksData.filter(b => b.category === book.category && b.id !== book.id).slice(0, 4);
    relatedContainer.innerHTML = relatedBooks.map(b => createBookCard(b)).join('');
  }
}

// ==========================================
// SEARCH & FILTER FUNCTIONS
// ==========================================

function searchBooks(query) {
  if (!query.trim()) {
    displayBooks(booksData);
    return;
  }

  const results = booksData.filter(book =>
    book.title.toLowerCase().includes(query.toLowerCase()) ||
    book.author.toLowerCase().includes(query.toLowerCase()) ||
    book.category.toLowerCase().includes(query.toLowerCase())
  );

  displayBooks(results);
  window.location.href = '#books';
}

function applyFilters() {
  const categoryFilter = document.querySelector('#categoryFilter')?.value || '';
  const sortFilter = document.querySelector('#sortFilter')?.value || 'default';
  const searchFilter = document.querySelector('#searchFilter')?.value || '';

  let filtered = [...booksData];

  // Search filter
  if (searchFilter) {
    filtered = filtered.filter(book =>
      book.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      book.author.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }

  // Category filter
  if (categoryFilter && categoryFilter !== 'all') {
    filtered = filtered.filter(book => book.category === categoryFilter);
  }

  // Sort
  if (sortFilter === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortFilter === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortFilter === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortFilter === 'title') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  filteredBooks = filtered;
  displayBooks(filtered);
}

// ==========================================
// PROFILE FUNCTIONS
// ==========================================

function switchProfileSection(sectionName) {
  // Update nav buttons
  document.querySelectorAll('.profile-nav button').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeButton = document.querySelector(`.profile-nav button[data-section="${sectionName}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }

  // Update sections
  document.querySelectorAll('.profile-section').forEach(section => {
    section.classList.remove('active');
  });
  const activeSection = document.querySelector(`.profile-section[data-section="${sectionName}"]`);
  if (activeSection) {
    activeSection.classList.add('active');
  }

  // Load data for section
  if (sectionName === 'orders') {
    displayOrderHistory();
  } else if (sectionName === 'wishlist') {
    displayWishlistInProfile();
  }
}

function displayOrderHistory() {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const container = document.querySelector('.profile-section[data-section="orders"]');
  if (!container) return;

  if (orders.length === 0) {
    container.innerHTML = '<h2>Order History</h2><p>No paid orders yet.</p>';
    return;
  }

  container.innerHTML = '<h2>Order History</h2>' + orders.map(order => `
    <div style="background: var(--light-bg); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;">
      <h4>${order.id}</h4>
      <p>Date: ${order.date}</p>
      <p>Books: ${order.books} | Total: $${Number(order.total).toFixed(2)}</p>
      <p>${order.items.map(item => `${item.title} x ${item.quantity}`).join(', ')}</p>
    </div>
  `).join('');
}

function displayWishlistInProfile() {
  const container = document.querySelector('.profile-section[data-section="wishlist"]');
  if (!container) return;

  if (wishlist.length === 0) {
    container.innerHTML = '<h2>My Wishlist</h2><p>Your wishlist is empty</p>';
    return;
  }

  container.innerHTML = '<h2>My Wishlist</h2><div class="books-grid">' + wishlist.map(book => createBookCard(book)).join('') + '</div>';
}

// ==========================================
// CHATBOT FUNCTIONS
// ==========================================

const chatResponses = {
  'hello': 'Hello! Welcome to our bookstore. How can I help you find the perfect book?',
  'hi': 'Hi there! 👋 Looking for a book recommendation?',
  'recommend': 'I recommend "Sapiens" - it\'s a fascinating exploration of human history!',
  'fiction': 'Try "The Great Gatsby" - a classic masterpiece!',
  'tech': '"Clean Code" is perfect for programming enthusiasts!',
  'science': '"A Brief History of Time" by Stephen Hawking is excellent!',
  'price': 'Our books range from $8.99 to $32.99. Use the filter to find books in your budget!',
  'shipping': 'We offer free shipping on orders over $50!',
  'return': 'You can return books within 30 days of purchase for a full refund.',
  'contact': 'You can reach us via email, phone, or WhatsApp. Check our contact page!',
  'help': 'I can help you find books, answer questions about orders, provide recommendations, and much more!',
  'thanks': 'You\'re welcome! Happy reading! 📚',
  'bye': 'Goodbye! Thanks for visiting our bookstore!'
};

function sendChatMessage() {
  const input = document.querySelector('.chat-input input');
  if (!input) return;

  const message = input.value.trim();
  if (!message) return;

  // Add user message
  addChatMessage(message, 'user');
  input.value = '';

  // Add bot response after a short delay
  setTimeout(() => {
    const response = generateChatResponse(message);
    addChatMessage(response, 'bot');
  }, 500);
}

function addChatMessage(message, sender) {
  const chatMessages = document.querySelector('.chat-messages');
  if (!chatMessages) return;

  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateChatResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  for (const [key, response] of Object.entries(chatResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }

  return 'I\'m not sure about that. Try asking me about book recommendations, shipping, returns, or browse our catalog!';
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #e94560, #f39c12);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 2000;
    animation: slideInRight 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideInLeft 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function setupScrollToTop() {
  const scrollBtn = document.querySelector('#scrollToTopBtn');
  if (!scrollBtn) {
    // Create scroll to top button if it doesn't exist
    const btn = document.createElement('button');
    btn.id = 'scrollToTopBtn';
    btn.innerHTML = '⬆️';
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', () => {
    const btn = document.querySelector('#scrollToTopBtn');
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });
}

// ==========================================
// PAGE-SPECIFIC INITIALIZATION
// ==========================================

// For books page
if (document.querySelector('#categoryFilter')) {
  const categories = [...new Set(booksData.map(b => b.category))];
  const categorySelect = document.querySelector('#categoryFilter');
  
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// For categories page
window.goToBooks = (category) => {
  window.location.href = `books.html?category=${category}`;
};

// Export functions for HTML onclick handlers
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.addToWishlist = addToWishlist;
window.removeFromWishlist = removeFromWishlist;
window.toggleTheme = toggleTheme;
window.searchBooks = searchBooks;
window.goToBooks = goToBooks;
window.switchProfileSection = switchProfileSection;
