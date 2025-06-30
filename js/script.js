window.addEventListener('load', function () {
    var $button = this.document.querySelector('.toggle-menu-button');
    var $menu = this.document.querySelector('.header-site-menu');

    $button.addEventListener('click', function () {
        if ($menu.classList.contains('is-show')) {
            $menu.classList.remove('is-show');
        }
        else {
            $menu.classList.add('is-show');
        }
    });
});


$(function () {
    $(window).scroll(function () {
        $("nav.floating").stop().animate(
            {"top": $(window).scrollTop() + 100},
        500);
    });
});

// グッズページ用の機能
let cart = [];
let cartTotal = 0;

// カート機能
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showCartAnimation();
}

function updateCartDisplay() {
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElement = document.getElementById('cartItemCount');
    
    if (cartCountElement) cartCountElement.textContent = cartItemCount;
}

function showCartAnimation() {
    // アニメーション削除
}

// カテゴリー絞り込み機能
function filterByCategory(category) {
    const items = document.querySelectorAll('.goods-item');
    
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// モーダル機能
function showModal(productId) {
    const products = {
        'tshirt': {
            name: '情報工学部オリジナルTシャツ',
            price: 2500,
            description: '快適なコットン素材で作られた、情報工学部のロゴ入りTシャツです。',
            details: [
                '素材: 100% コットン',
                'サイズ: S、M、L、XL',
                'カラー: ネイビー、ホワイト',
                '洗濯: 洗濯機可（30度以下）'
            ]
        },
        'hoodie': {
            name: '情報工学部オリジナルパーカー',
            price: 4200,
            description: '暖かく快適な裏起毛パーカー。秋冬にぴったりのアイテムです。',
            details: [
                '素材: コットン80%、ポリエステル20%',
                'サイズ: S、M、L、XL',
                'カラー: グレー、ネイビー',
                '機能: 裏起毛、フード付き'
            ]
        },
        'pen': {
            name: '情報工学部オリジナルボールペン',
            price: 800,
            description: '滑らかな書き心地の高級ボールペン。',
            details: [
                '材質: 金属製',
                'インク: 黒',
                '刻印: 情報工学部ロゴ',
                'ギフトボックス付き'
            ]
        },
        'notebook': {
            name: '情報工学部オリジナルノート',
            price: 600,
            description: 'A4サイズの高品質ノート。講義やプログラミングのメモに最適。',
            details: [
                'サイズ: A4',
                'ページ数: 100ページ',
                '罫線: 方眼',
                '表紙: ハードカバー'
            ]
        },
        'mug': {
            name: '情報工学部オリジナルマグカップ',
            price: 1200,
            description: '毎日のコーヒータイムをより特別に。',
            details: [
                '容量: 350ml',
                '材質: セラミック',
                '対応: 食洗機、電子レンジ可',
                'デザイン: 情報工学部ロゴ入り'
            ]
        },
        'usb': {
            name: '情報工学部オリジナルUSBメモリ',
            price: 1800,
            description: '32GB容量のUSBメモリ。情報工学部生必携のアイテム。',
            details: [
                '容量: 32GB',
                '規格: USB 3.0',
                '対応OS: Windows、Mac、Linux',
                'デザイン: 情報工学部ロゴ入り'
            ]
        }
    };
    
    const product = products[productId];
    if (!product) return;
    
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <h2>${product.name}</h2>
        <div class="modal-image" style="background: linear-gradient(45deg, #f0f0f0, #e0e0e0); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: #666;">
            ${product.name}の画像
        </div>
        <p style="margin-bottom: 20px; line-height: 1.6;">${product.description}</p>
        <div style="margin-bottom: 20px;">
            <h3 style="margin-bottom: 10px;">商品詳細</h3>
            <ul style="list-style: disc; margin-left: 20px;">
                ${product.details.map(detail => `<li style="margin-bottom: 5px;">${detail}</li>`).join('')}
            </ul>
        </div>
        <div style="font-size: 1.5rem; font-weight: bold; color: #e74c3c; margin-bottom: 20px;">
            ¥${product.price.toLocaleString()}
        </div>
        <div class="quantity-selector">
            <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
            <input type="number" class="quantity-input" id="modalQuantity" value="1" min="1" max="10">
            <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
        </div>
        <button class="btn btn-primary" style="width: 100%; margin-top: 20px;" 
                onclick="addToCartFromModal('${productId}', '${product.name}', ${product.price})">
            カートに追加
        </button>
    `;
    
    document.getElementById('productModal').style.display = 'block';
}

function changeQuantity(change) {
    const quantityInput = document.getElementById('modalQuantity');
    let newValue = parseInt(quantityInput.value) + change;
    if (newValue < 1) newValue = 1;
    if (newValue > 10) newValue = 10;
    quantityInput.value = newValue;
}

function addToCartFromModal(id, name, price) {
    const quantity = parseInt(document.getElementById('modalQuantity').value);
    
    for (let i = 0; i < quantity; i++) {
        addToCart(id, name, price);
    }
    
    document.getElementById('productModal').style.display = 'none';
}

// ページロード時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // カテゴリーボタンのイベントリスナー
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // アクティブクラスを切り替え
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // カテゴリー絞り込み
            filterByCategory(this.dataset.category);
        });
    });
    
    // モーダルを閉じる機能
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});