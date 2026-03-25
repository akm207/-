// قائمة المنتجات مع صور تمور حقيقية ذات طابع دافئ
const products = [
    { id: 1, name: "عجوة المدينة فاخرة VIP", price: 150, img: "https://images.unsplash.com/photo-1601002360877-5054817a78ce?auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "سكري مفتل درجة أولى", price: 90, img: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "مجدول ملكي حبة كبيرة", price: 110, img: "https://images.unsplash.com/photo-1596422846543-74c6e9491a1a?auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "صقعي فاخر باللوز", price: 135, img: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=600&q=80" },
    { id: 5, name: "خلاص القصيم مكنوز", price: 65, img: "https://images.unsplash.com/photo-1601002360877-5054817a78ce?auto=format&fit=crop&w=600&q=80" },
    { id: 6, name: "تمر صفري بيشة", price: 80, img: "https://images.unsplash.com/photo-1596422846543-74c6e9491a1a?auto=format&fit=crop&w=600&q=80" }
];

// استدعاء السلة من التخزين المحلي (LocalStorage) عشان ما تضيع بين الصفحات
let cart = JSON.parse(localStorage.getItem('luxuryCart')) || [];

// دالة عرض المنتجات (تشتغل فقط إذا كانت في صفحة المنتجات)
function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return; // عشان ما يطلع خطأ في الصفحة الرئيسية

    grid.innerHTML = products.map(product => `
        <div class="product-card glass-element">
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="product-price">${product.price} ريال</p>
            <button class="btn-primary" onclick="addToCart(${product.id})" style="width: 100%;">أضف للسلة</button>
        </div>
    `).join('');
}

// فتح وإغلاق السلة
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

// إضافة للسلة
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    
    saveCart();
    updateCartUI();
    document.getElementById('cart-sidebar').classList.add('active'); // يفتح السلة تلقائياً
}

// إزالة من السلة
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
}

// حفظ في التخزين المحلي
function saveCart() {
    localStorage.setItem('luxuryCart', JSON.stringify(cart));
}

// تحديث واجهة السلة (تعمل في كل الصفحات)
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    if(!cartItems || !cartCount || !cartTotal) return;

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4 style="color: var(--accent-date);">${item.name}</h4>
                <small>${item.price} ريال × ${item.qty}</small>
            </div>
            <button onclick="removeFromCart(${item.id})" style="background:none; border:none; color:#e63946; cursor:pointer; font-size:1.2rem;">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `).join('');
    
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    cartCount.innerText = totalItems;
    cartTotal.innerText = totalPrice;
}

// تشغيل الوظائف عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});