# Periods Page - Trang Giai Đoạn Lịch Sử

Trang HTML tĩnh độc lập, sẵn sàng deploy lên GitHub Pages.

## 📁 Cấu trúc thư mục

```
periods/
├── periods.html          # File HTML chính
└── assets/
    ├── css/
    │   └── periods.css   # File CSS riêng
    ├── js/
    │   └── periods.js    # File JavaScript riêng
    └── images/
        ├── logo.png      # Logo website
        ├── v99_*.png     # Ảnh course cards
        ├── v101_*.png    # Ảnh course cards
        └── courses/
            ├── circle-empty.svg        # Icon timeline
            ├── circle-empty_red.svg    # Icon timeline active
            ├── v525_609.png           # Background image
            ├── v531_703.png           # Ảnh lesson
            ├── v567_463.png           # Ảnh lesson
            └── v567_479.png           # Ảnh lesson
```

## 🚀 Deploy lên GitHub Pages

### Cách 1: Deploy toàn bộ folder periods

1. Tạo repository mới trên GitHub
2. Clone repository về máy
3. Copy toàn bộ folder `periods` vào repository
4. Commit và push:
   ```bash
   git add .
   git commit -m "Add periods page"
   git push origin main
   ```
5. Vào Settings > Pages > chọn branch `main` > folder `/periods`
6. Truy cập tại: `https://username.github.io/repo-name/periods.html`

### Cách 2: Deploy làm trang chính

1. Copy nội dung folder `periods` vào root của repository
2. Đổi tên `periods.html` thành `index.html`
3. Commit và push
4. Truy cập tại: `https://username.github.io/repo-name/`

## ✨ Tính năng

- ✅ Hoàn toàn độc lập, không phụ thuộc thư mục ngoài
- ✅ Slider với hiệu ứng smooth
- ✅ Hover effects trên course cards
- ✅ Timeline tương tác
- ✅ Mobile responsive
- ✅ Sử dụng Google Fonts (online)
- ✅ Tất cả ảnh và tài nguyên đã được copy local

## 🔧 Chỉnh sửa

- **Thay đổi nội dung**: Chỉnh sửa file `periods.html`
- **Thay đổi style**: Chỉnh sửa file `assets/css/periods.css`
- **Thay đổi chức năng**: Chỉnh sửa file `assets/js/periods.js`
- **Thay đổi ảnh**: Thay thế file trong folder `assets/images/`

## 📝 Ghi chú

- Trang này đã được tối ưu hóa để deploy trên GitHub Pages
- Tất cả đường dẫn đã được cập nhật để sử dụng tài nguyên local
- Không cần cài đặt thêm dependencies
- Chỉ cần upload và sử dụng ngay

---

Created: January 18, 2026
