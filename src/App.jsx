import React, { useState } from 'react';
import { Menu, Search, ShoppingCart, Star, Home, User, Package, Truck, ShoppingBag, X } from 'lucide-react';
import { StarRating } from './components/StarRating';
import { ProductPage } from './components/ProductPage';
import { ProfilePage } from './components/ProfilePage';
import { OrderTracking } from './components/OrderTracking';
import { products, mockOrders } from './data/products';

function SideMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold text-purple-900">Menu</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <button 
                onClick={() => {
                  alert('Home clicked');
                  onClose();
                }} 
                className="flex items-center gap-2 text-purple-900 hover:text-purple-600 w-full text-left"
              >
                <Home size={20} />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  alert('Products clicked');
                  onClose();
                }} 
                className="flex items-center gap-2 text-purple-900 hover:text-purple-600 w-full text-left"
              >
                <Package size={20} />
                <span>Products</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  alert('Profile clicked');
                  onClose();
                }} 
                className="flex items-center gap-2 text-purple-900 hover:text-purple-600 w-full text-left"
              >
                <User size={20} />
                <span>Profile</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  alert('Orders clicked');
                  onClose();
                }} 
                className="flex items-center gap-2 text-purple-900 hover:text-purple-600 w-full text-left"
              >
                <ShoppingBag size={20} />
                <span>Orders</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

function SearchOverlay({ isOpen, onClose, onSearch }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute inset-x-0 top-0 bg-white shadow-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Search className="text-purple-900" />
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-purple-500"
            autoFocus
            onChange={(e) => onSearch(e.target.value)}
          />
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Recent Searches</p>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">
              Purple Hoodie
            </button>
            <button className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">
              Sweater
            </button>
            <button className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">
              T-Shirt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ title, price, rating, image, onAddToCart, onClick }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);
    setTimeout(() => {
      onAddToCart();
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm" onClick={onClick}>
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg mb-3" />
      <h3 className="font-medium text-sm mb-1">{title}</h3>
      <div className="flex justify-between items-center">
        <StarRating rating={rating} />
        <span className="text-sm font-semibold">${price.toFixed(2)}</span>
      </div>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart();
        }}
        disabled={isLoading}
        className={`w-full mt-3 bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors ${
          isLoading ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}

function CartItem({ title, price, image, quantity, onRemove, onUpdateQuantity }) {
  return (
    <div className="flex items-center gap-3 p-3 border-b">
      <img src={image} alt={title} className="w-16 h-16 object-cover rounded" />
      <div className="flex-1">
        <h4 className="font-medium text-sm">{title}</h4>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onUpdateQuantity(quantity - 1)}
              className="text-purple-600 px-2 py-1 rounded hover:bg-purple-50"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="text-sm">{quantity}</span>
            <button 
              onClick={() => onUpdateQuantity(quantity + 1)}
              className="text-purple-600 px-2 py-1 rounded hover:bg-purple-50"
            >
              +
            </button>
          </div>
          <span className="font-semibold">${(price * quantity).toFixed(2)}</span>
        </div>
      </div>
      <button 
        onClick={onRemove}
        className="text-red-500 text-sm hover:text-red-600 px-2 py-1 rounded"
      >
        Remove
      </button>
    </div>
  );
}

function Cart({ isOpen, onClose, cartItems, onRemoveFromCart, onUpdateQuantity }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold">Shopping Cart</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-auto">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <CartItem
                key={index}
                {...item}
                onRemove={() => onRemoveFromCart(index)}
                onUpdateQuantity={(newQuantity) => onUpdateQuantity(index, newQuantity)}
              />
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between mb-4">
              <span className="font-bold">Total:</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => {
                alert('Thank you for your order! This is where the checkout process would begin.');
                onClose();
              }}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, text, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="bg-purple-500 p-4 rounded-xl flex items-center gap-3 w-full hover:bg-purple-400 transition-colors active:bg-purple-600"
    >
      <Icon className="text-white" />
      <span className="text-sm font-medium text-white">{text}</span>
    </button>
  );
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      if (existingItemIndex >= 0) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index].quantity = newQuantity;
      return newItems;
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearchOpen(false);
    setCurrentPage('search');
  };

  const handleUpdateProfile = (profileData) => {
    console.log('Profile updated:', profileData);
    alert('Profile updated successfully!');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'product':
        return <ProductPage product={selectedProduct} onAddToCart={addToCart} />;
      case 'profile':
        return <ProfilePage user={{}} onUpdateProfile={handleUpdateProfile} />;
      case 'orders':
        return <OrderTracking orders={mockOrders} />;
      case 'search':
        return (
          <div className="container mx-auto px-4 py-6">
            <h2 className="text-xl font-bold text-purple-900 mb-4">
              Search Results for "{searchQuery}"
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={() => addToCart(product)}
                  onClick={() => {
                    setSelectedProduct(product);
                    setCurrentPage('product');
                  }}
                />
              ))}
            </div>
          </div>
        );
      default:
        return (
          <main className="container mx-auto px-4 py-6 mb-16">
            {/* Hero Section */}
            <div className="bg-purple-600 text-white rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&auto=format&fit=crop&q=80"
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold">Home Fidelity</h2>
                  <StarRating rating={4} />
                </div>
              </div>
              <div className="flex gap-3 mb-6">
                <button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isFollowing 
                      ? 'bg-purple-500 text-white hover:bg-purple-400' 
                      : 'bg-white text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button 
                  onClick={() => alert('Opening profile settings...')}
                  className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-400 transition-colors"
                >
                  Profile
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <QuickAction 
                  icon={Home} 
                  text="Home Process" 
                  onClick={() => handleQuickAction('home')}
                />
                <QuickAction 
                  icon={Package} 
                  text="Products" 
                  onClick={() => handleQuickAction('products')}
                />
                <QuickAction 
                  icon={ShoppingBag} 
                  text="Product Process" 
                  onClick={() => handleQuickAction('process')}
                />
                <QuickAction 
                  icon={Truck} 
                  text="Trending Products" 
                  onClick={() => handleQuickAction('trending')}
                />
              </div>
            </div>

            {/* Featured Products */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-purple-900 mb-4">Featured Products</h2>
              <div className="grid grid-cols-2 gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onAddToCart={() => addToCart(product)}
                    onClick={() => {
                      setSelectedProduct(product);
                      setCurrentPage('product');
                    }}
                  />
                ))}
              </div>
            </section>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="text-purple-900 hover:text-purple-600 transition-colors p-2 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-purple-900">Home Fidelity</h1>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-purple-900 hover:text-purple-600 transition-colors p-2 rounded-lg"
            >
              <Search size={24} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-purple-900 hover:text-purple-600 transition-colors p-2 rounded-lg relative"
            >
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {renderContent()}

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 py-3 z-40">
        <div className="container mx-auto flex justify-around">
          <button 
            onClick={() => {
              setCurrentPage('home');
              setActiveTab('home');
            }}
            className={`p-2 rounded-lg transition-colors ${
              activeTab === 'home' ? 'text-purple-600' : 'text-purple-400 hover:text-purple-600'
            }`}
          >
            <Home size={24} />
          </button>
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-lg text-purple-400 hover:text-purple-600 transition-colors"
          >
            <Search size={24} />
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-2 rounded-lg text-purple-400 hover:text-purple-600 transition-colors"
          >
            <ShoppingCart size={24} />
          </button>
          <button 
            onClick={() => {
              setCurrentPage('profile');
              setActiveTab('profile');
            }}
            className={`p-2 rounded-lg transition-colors ${
              activeTab === 'profile' ? 'text-purple-600' : 'text-purple-400 hover:text-purple-600'
            }`}
          >
            <User size={24} />
          </button>
        </div>
      </nav>

      {/* Overlays */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}

export default App;