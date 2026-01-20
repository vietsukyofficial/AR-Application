// Periods page functionality (copied from courses-slider.js)
document.addEventListener('DOMContentLoaded', function () {
    // Page transition effect (similar to index.html)
    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
        // Check if this is a direct page load or navigation
        const isDirectLoad = !document.referrer || !document.referrer.includes(window.location.hostname);

        if (isDirectLoad) {
            // Direct load - show immediately with class for styling
            pageContent.classList.add('direct-load');
        } else {
            // Navigation from another page - show with transition
            setTimeout(() => {
                pageContent.classList.add('show');
            }, 100);
        }
    }

    // Header visibility on page load (copied from main.js)
    const header = document.querySelector('.header');
    if (header) {
        setTimeout(() => {
            header.classList.add('header-visible');
        }, 100);
    }

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('mobile-active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('mobile-active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('mobile-active');
            }
        });
    }

    // Modern smooth slider functionality - Disabled for 3-card layout
    const coursesContainer = document.querySelector('.courses-container');
    const originalCards = document.querySelectorAll('.course-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Hide slider buttons since we only have 3 cards
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';

    // Setup hover effects for all cards (no slider needed)
    function setupHoverEffects() {
        if (!coursesContainer) return;
        const allCards = coursesContainer.querySelectorAll('.course-card');
        allCards.forEach(card => {
            // Remove existing event listeners to prevent duplicates
            card.removeEventListener('mouseenter', cardHoverIn);
            card.removeEventListener('mouseleave', cardHoverOut);

            // Add event listeners
            card.addEventListener('mouseenter', cardHoverIn);
            card.addEventListener('mouseleave', cardHoverOut);
        });
    }

    // Card hover in effect
    function cardHoverIn() {
        const content = this.querySelector('.card-content');
        const overlay = this.querySelector('.card-overlay');
        const img = this.querySelector('.card-image img');

        // Show content
        if (content) {
            content.style.transform = 'translateY(0)';
            content.style.opacity = '1';
        }

        // Change overlay to yellow
        if (overlay) {
            overlay.style.background = 'linear-gradient(to bottom, rgba(252, 194, 74, 0.2) 0%, rgba(252, 194, 74, 0.6) 50%, rgba(252, 194, 74, 0.9) 100%)';
        }

        // Remove grayscale and scale image
        if (img) {
            img.style.filter = 'grayscale(0%) brightness(1)';
            img.style.transform = 'scale(1.1)';
        }
    }

    // Card hover out effect - Reset to grayscale state
    function cardHoverOut() {
        const content = this.querySelector('.card-content');
        const overlay = this.querySelector('.card-overlay');
        const img = this.querySelector('.card-image img');

        // Reset content to hidden state
        if (content) {
            content.style.transform = 'translateY(30px)';
            content.style.opacity = '0';
        }

        // Reset overlay to dark state
        if (overlay) {
            overlay.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.8) 100%)';
        }

        // Reset image to grayscale
        if (img) {
            img.style.filter = 'grayscale(100%) brightness(0.7)';
            img.style.transform = 'scale(1)';
        }
    }

    // Function to reset all cards to grayscale state
    function resetAllCardsToGrayscale() {
        if (!coursesContainer) return;
        const allCards = coursesContainer.querySelectorAll('.course-card');
        allCards.forEach(card => {
            // Skip cards that are currently being hovered
            if (!card.matches(':hover')) {
                cardHoverOut.call(card);
            }
        });
    }

    // Initialize hover effects
    setupHoverEffects();

    // Reset all cards to grayscale state initially
    setTimeout(() => {
        resetAllCardsToGrayscale();
    }, 100);

    // Smooth hover effects
    if (coursesContainer) {
        coursesContainer.addEventListener('mouseleave', function () {
            setTimeout(() => {
                resetAllCardsToGrayscale();
            }, 100);
        });
    }

    // Course card click to show detail section
    function initCourseCardNavigation() {
        const courseCards = document.querySelectorAll('.course-card');
        const courseDetailSection = document.getElementById('courseDetailSection');
        
        console.log('Found course cards:', courseCards.length); // Debug log
        console.log('Found courseDetailSection:', courseDetailSection); // Debug log

        // Course data - you can expand this for different courses
        const courseData = {
            'Kháng chiến chống Pháp': {
                yearLarge: '19',
                yearTop: '45',
                yearBottom: '54',
                period: 'Kháng chiến chống Pháp',
                date: '7/5/1954',
                title: 'ĐIỆN BIÊN PHỦ LỪNG LẪY',
                description: 'Điện Biên Phủ 56 ngày đêm lừng lẫy<br>năm châu, chấn động địa cầu',
                image: 'assets/images/courses/v531_703.png',
                imageYear: '1954'
            },
            // Add more course data here as needed
            'default': {
                yearLarge: '19',
                yearTop: '45',
                yearBottom: '54',
                period: 'Kháng chiến chống Pháp',
                date: '7/5/1954',
                title: 'ĐIỆN BIÊN PHỦ LỪNG LẪY',
                description: 'Điện Biên Phủ 56 ngày đêm lừng lẫy<br>năm châu, chấn động địa cầu',
                image: 'assets/images/courses/v531_703.png',
                imageYear: '1954'
            }
        };

        courseCards.forEach(card => {
            card.addEventListener('click', function (e) {
                e.preventDefault();
                
                console.log('Card clicked!'); // Debug log

                // Get course title
                const courseTitle = this.querySelector('.title').textContent.trim();
                console.log('Course title:', courseTitle); // Debug log
                
                // Show detail section for card-1, card-2, and card-3
                if (courseTitle === 'Quyền lực thuộc về ai?' || courseTitle === 'Quyền lực được kiểm soát như thế nào?' || courseTitle === 'Nhà nước phục vụ hay cản trở?') {
                    const courseInfo = courseData[courseTitle] || courseData['default'];
                    console.log('Course info:', courseInfo); // Debug log

                    // Update course detail content based on card
                    updateCourseDetailByCard(courseTitle);

                    // Show course detail section with smooth scroll
                    showCourseDetail();
                } else {
                    console.log('Content for this card will be implemented later');
                    // You can show a message or do nothing for other cards
                }
            });
        });

        function updateCourseDetail(courseInfo) {
            // No elements to update anymore - timeline and image removed
            console.log('Course detail updated with:', courseInfo);
        }

        function updateCourseDetailByCard(cardTitle) {
            const videoTitle = document.querySelector('.video-title');
            const youtubeFrame = document.querySelector('.youtube-frame-container iframe');
            const quizContainer = document.getElementById('quiz-placeholder-content');
            let quoteBlock = document.querySelector('.quote-block') || document.querySelector('.final-quote-section-card2');
            
            if (cardTitle === 'Quyền lực thuộc về ai?') {
                // Card 1 content - Hồ Chí Minh quote with image
                if (videoTitle) videoTitle.textContent = 'Nhà nước của dân, do dân, vì dân';
                if (youtubeFrame) youtubeFrame.src = 'https://www.youtube.com/embed/Ni5ATRDusC4';
                
                if (quizContainer) {
                    quizContainer.innerHTML = `
                        <div class="vsk-interactive-quiz" id="vsk-quiz-state-concept">
                            <div class="vsk-quiz-header">
                                <h3 class="vsk-quiz-title">Quiz – Nhà nước của dân, do dân, vì dân</h3>
                            </div>
                            <div class="vsk-quiz-body">
                                <div class="vsk-quiz-question">
                                    <p>Trong tư tưởng Hồ Chí Minh, đặc điểm nào thể hiện rõ nhất bản chất "Nhà nước của nhân dân"?</p>
                                </div>
                                <div class="vsk-quiz-choices">
                                    <label class="vsk-quiz-choice">
                                        <input type="radio" name="quiz-card-1" value="a">
                                        <span class="vsk-choice-text">A. Nhà nước do nhân dân ủng hộ và đóng thuế để duy trì hoạt động.</span>
                                    </label>
                                    <label class="vsk-quiz-choice">
                                        <input type="radio" name="quiz-card-1" value="b">
                                        <span class="vsk-choice-text">B. Tất cả mọi quyền lực trong Nhà nước và trong xã hội đều thuộc về nhân dân.</span>
                                    </label>
                                    <label class="vsk-quiz-choice">
                                        <input type="radio" name="quiz-card-1" value="c">
                                        <span class="vsk-choice-text">C. Nhà nước chăm lo cho đời sống vật chất và tinh thần của nhân dân.</span>
                                    </label>
                                    <label class="vsk-quiz-choice">
                                        <input type="radio" name="quiz-card-1" value="d">
                                        <span class="vsk-choice-text">D. Nhà nước do nhân dân tự giác đứng lên thành lập sau cách mạng.</span>
                                    </label>
                                </div>
                                <button class="vsk-quiz-submit" onclick="checkQuizAnswer('quiz-card-1', 'b')">
                                    <span class="vsk-quiz-submit-text">Kiểm tra</span>
                                </button>
                                <div class="vsk-quiz-result" style="display: none;">
                                    <div class="result-icon"></div>
                                    <div class="result-message"></div>
                                    <div class="result-explanation">
                                        <strong>Giải thích:</strong> Đáp án B là cốt lõi. "Của dân" nghĩa là nhân dân là chủ thể tối cao của quyền lực, mọi cơ quan nhà nước chỉ là người nhận ủy quyền từ dân.
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                if (quoteBlock) {
                    // Reset to quote-block class for card-1 and show it
                    quoteBlock.className = 'quote-block';
                    quoteBlock.style.display = 'flex';
                    quoteBlock.innerHTML = `
                        <div class="quote-image-container">
                            <img src="assets/images/v0_5009.png" alt="Chủ tịch Hồ Chí Minh">
                        </div>
                        <div class="quote-content-container">
                            <div class="quote-text-box">
                                <p>Nước ta là nước dân chủ, bao nhiêu lợi ích đều vì dân, bao nhiêu quyền hạn đều của dân.</p>
                            </div>
                            <h3 class="quote-section-title">— Hồ Chí Minh, 1949</h3>
                        </div>
                    `;
                }
            } else if (cardTitle === 'Quyền lực được kiểm soát như thế nào?') {
                // Card 2 content - Báo chí Pháp quote without image
                if (videoTitle) videoTitle.textContent = 'Nhà nước pháp quyền';
                if (youtubeFrame) youtubeFrame.src = 'https://www.youtube.com/embed/RR-ZivsVTsg';
                
                if (quizContainer) {
                    quizContainer.innerHTML = `
                        <div class="vsk-interactive-quiz" id="vsk-quiz-yeu-sach">
                            <div class="vsk-quiz-header">
                                <h3 class="vsk-quiz-title">Quiz – Nhà nước pháp quyền</h3>
                            </div>
                            <div class="vsk-quiz-body">
                                <div class="vsk-quiz-question">
                                    <p>Trong bản Yêu sách của nhân dân An Nam, Hồ Chí Minh nhấn mạnh quốc gia cần phải có một chế độ như thế nào?</p>
                                </div>
                                <div class="vsk-quiz-choices">
                                    <label class="vsk-quiz-choice">
                                        <input type="radio" name="quiz-card-2" value="a">
                                        <span class="vsk-choice-text">A. Chế độ ra sắc lệnh</span>
                                    </label>
                                    <label class="vsk-quiz-choice">
                                        <input type="radio" name="quiz-card-2" value="b">
                                        <span class="vsk-choice-text">B. Chế độ ra các đạo luật</span>
                                    </label>
                                    <label class="vsk-quiz-choice">
                                        <input type="radio" name="quiz-card-2" value="c">
                                        <span class="vsk-choice-text">C. Chế độ dân chủ</span>
                                    </label>
                                    <label class="vsk-quiz-choice">
                                        <input type="radio" name="quiz-card-2" value="d">
                                        <span class="vsk-choice-text">D. Chế độ công bằng</span>
                                    </label>
                                </div>
                                <button class="vsk-quiz-submit" onclick="checkQuizAnswer('quiz-card-2', 'b')">
                                    <span class="vsk-quiz-submit-text">Kiểm tra</span>
                                </button>
                                <div class="vsk-quiz-result" style="display: none;">
                                    <div class="result-icon"></div>
                                    <div class="result-message"></div>
                                    <div class="result-explanation">
                                        <strong>Giải thích:</strong> Vì trong Yêu sách của nhân dân An Nam (1919), Hồ Chí Minh yêu cầu thay thế chế độ cai trị bằng sắc lệnh độc đoán bằng một chế độ quản lý bằng pháp luật, nhằm bảo đảm quyền và lợi ích của nhân dân.
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                if (quoteBlock) {
                    quoteBlock.className = 'final-quote-section-card2';
                    quoteBlock.style.display = 'block';
                    quoteBlock.innerHTML = `
                        <div class="final-quote-container">
                            <div class="final-quote-content">
                                <div class="final-quote-marks opening">❝</div>
                                <blockquote class="final-quote-text">
                                    Điện Biên Phủ là một Verdun của người da vàng đánh bại người da trắng
                                </blockquote>
                                <div class="final-quote-marks closing">❞</div>
                                <cite class="final-quote-author">BÁO CHÍ PHÁP</cite>
                            </div>
                        </div>
                    `;
                }
            } else if (cardTitle === 'Nhà nước phục vụ hay cản trở?') {
                // Card 3 content - Tinh gọn bộ máy
                if (videoTitle) videoTitle.textContent = 'Tinh gọn bộ máy nhà nước';
                if (youtubeFrame) youtubeFrame.src = 'https://www.youtube.com/embed/2kMLYsNsA_g';
                
                if (quizContainer) {
                    quizContainer.innerHTML = `
                        <div class="vsk-interactive-quiz" id="vsk-quiz-tinh-gon">
                            <div class="vsk-quiz-header">
                                <h3 class="vsk-quiz-title">Quiz – Tinh gọn bộ máy nhà nước</h3>
                            </div>
                            <div class="vsk-quiz-body">
                                <div class="vsk-quiz-question">
                                    <p>Theo bạn, tinh gọn bộ máy nhà nước giúp tăng cường phục vụ nhân dân ở khía cạnh nào rõ nhất?</p>
                                </div>
                                <div class="vsk-quiz-choices">
                                    <label class="vsk-quiz-choice">
                                        <input type="radio" name="quiz-card-3" value="a">
                                        <span class="vsk-choice-text">A. Giảm chi phí quản lý</span>
                                    </label>
                                    <label class="vsk-quiz-choice">
                                        <input type="radio" name="quiz-card-3" value="b">
                                        <span class="vsk-choice-text">B. Đơn giản hóa thủ tục hành chính</span>
                                    </label>
                                    <label class="vsk-quiz-choice">
                                        <input type="radio" name="quiz-card-3" value="c">
                                        <span class="vsk-choice-text">C. Tăng hiệu lực và hiệu quả hoạt động</span>
                                    </label>
                                    <label class="vsk-quiz-choice">
                                        <input type="radio" name="quiz-card-3" value="d">
                                        <span class="vsk-choice-text">D. Giảm số lượng công chức</span>
                                    </label>
                                </div>
                                <button class="vsk-quiz-submit" onclick="checkQuizAnswer('quiz-card-3', 'c')">
                                    <span class="vsk-quiz-submit-text">Kiểm tra</span>
                                </button>
                                <div class="vsk-quiz-result" style="display: none;">
                                    <div class="result-icon"></div>
                                    <div class="result-message"></div>
                                    <div class="result-explanation">
                                        <strong>Giải thích:</strong> Tinh gọn bộ máy không chỉ là giảm bớt đơn vị, mà trước hết là tăng hiệu lực – hiệu quả phục vụ nhân dân, phù hợp tư tưởng "nhà nước vì dân".
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                // Card 3 does not have quote section - hide it
                if (quoteBlock) {
                    quoteBlock.style.display = 'none';
                }
            }
        }

        function showCourseDetail() {
            console.log('showCourseDetail called'); // Debug log
            
            // Show the section first
            courseDetailSection.style.display = 'block';
            
            // Force a reflow to ensure display: block is applied
            courseDetailSection.offsetHeight;

            // Add show class for animation after a brief delay
            setTimeout(() => {
                courseDetailSection.classList.add('show');
                console.log('Added show class'); // Debug log
            }, 50);

            // Smooth scroll to the section with 80px offset from header
            setTimeout(() => {
                const sectionTop = courseDetailSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = sectionTop - 80; // 80px offset from header

                console.log('Scrolling to:', offsetPosition); // Debug log

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 300);
        }

        // Timeline item click functionality
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.addEventListener('click', function () {
                const clickedYear = this.getAttribute('data-year');
                let contentData = null;

                // Define content for each timeline item
                if (clickedYear === '1945') {
                    contentData = {
                        date: '1945',
                        title: 'CHƯA CÓ NỘI DUNG',
                        description: 'HELLO<br>WORLD',
                        image: 'assets/images/courses/v567_463.png',
                        imageYear: '1945'
                    };
                } else if (clickedYear === '1946') {
                    contentData = {
                        date: '1946',
                        title: 'CHƯA CÓ NỘI DUNG',
                        description: 'HELLO<br>WORLD',
                        image: 'assets/images/courses/v567_463.png',
                        imageYear: '1946'
                    };
                } else if (clickedYear === '1947') {
                    contentData = {
                        date: '1947',
                        title: 'CHƯA CÓ NỘI DUNG',
                        description: 'HELLO<br>WORLD',
                        image: 'assets/images/courses/v567_463.png',
                        imageYear: '1947'
                    };
                } else if (clickedYear === '1948 - 1949') {
                    contentData = {
                        date: '1948 - 1949',
                        title: 'CHƯA CÓ NỘI DUNG',
                        description: 'HELLO<br>WORLD',
                        image: 'assets/images/courses/v567_463.png',
                        imageYear: '1948<br>—<br>1949'
                    };
                } else if (clickedYear === '1950') {
                    contentData = {
                        date: '1950',
                        title: 'CHƯA CÓ NỘI DUNG',
                        description: 'HELLO<br>WORLD',
                        image: 'assets/images/courses/v567_463.png',
                        imageYear: '1950'
                    };
                } else if (clickedYear === '1951 - 1952') {
                    contentData = {
                        date: '1951 - 1952',
                        title: 'TỪ PHÒNG NGỰ SANG TẤN CÔNG',
                        description: 'Các chiến dịch lớn và xây dựng<br>chủ lực',
                        image: 'assets/images/courses/v567_463.png',
                        imageYear: '1951<br>—<br>1952'
                    };
                } else if (clickedYear === '07/05/1954') {
                    contentData = {
                        date: '7/5/1954',
                        title: 'ĐIỆN BIÊN PHỦ LỪNG LẪY',
                        description: 'Điện Biên Phủ 56 ngày đêm lừng lẫy<br>năm châu, chấn động địa cầu',
                        image: 'assets/images/courses/v531_703.png',
                        imageYear: '1954'
                    };
                } else if (clickedYear === '21/07/1954') {
                    contentData = {
                        date: '21/07/1954',
                        title: 'HIỆP ĐỊNH GENÈVE',
                        description: 'Kết thúc chiến tranh<br>& phân chia đất nước',
                        image: 'assets/images/courses/v567_479.png',
                        imageYear: '1954'
                    };
                }

                // If this is a valid timeline item, update the UI
                if (contentData) {
                    // Remove active class from all items and reset icons
                    timelineItems.forEach(tItem => {
                        tItem.classList.remove('active');
                        const img = tItem.querySelector('.timeline-icon');
                        if (img) {
                            img.src = 'assets/images/courses/circle-empty.svg';
                        }
                    });

                    // Add active class to clicked item and change icon
                    this.classList.add('active');
                    const clickedImg = this.querySelector('.timeline-icon');
                    if (clickedImg) {
                        clickedImg.src = 'assets/images/courses/circle-empty_red.svg';
                    }

                    // Update content
                    updateTimelineContent(contentData);
                } else {
                    // For other items, don't allow them to be active
                    console.log('Timeline item clicked:', clickedYear);
                }
            });
        });

        // Function to update timeline content with fixed slide animation (always down then up)
        function updateTimelineContent(contentData) {
            const lessonContent = document.querySelector('.lesson-content');
            const lessonImageContainer = document.querySelector('.lesson-image-container');

            if (!lessonContent || !lessonImageContainer) return;

            // Apply smooth transition
            lessonContent.style.transition = 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.4s ease';
            lessonImageContainer.style.transition = 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.4s ease';

            // Always slide down (chui xuống dưới)
            lessonContent.style.transform = 'translateY(100%)';
            lessonContent.style.opacity = '0';
            lessonImageContainer.style.transform = 'translateY(100%)';
            lessonImageContainer.style.opacity = '0';

            // Update content during animation
            setTimeout(() => {
                // Update image only (lesson content removed)
                document.getElementById('lessonImage').src = contentData.image;
                document.querySelector('.image-year-overlay').innerHTML = contentData.imageYear;

                // Position content from bottom for slide up (ngoi lên)
                lessonContent.style.transform = 'translateY(100%)';
                lessonImageContainer.style.transform = 'translateY(100%)';

                // Slide up new content (ngoi lên)
                setTimeout(() => {
                    lessonContent.style.transform = 'translateY(0)';
                    lessonContent.style.opacity = '1';
                    lessonImageContainer.style.transform = 'translateY(0)';
                    lessonImageContainer.style.opacity = '1';
                }, 100);
            }, 300);
        }

        // Function to reset timeline to default state (07/05/1954 active)
        function resetTimelineToDefault() {
            const timelineItems = document.querySelectorAll('.timeline-item');

            // Remove active class from all items and reset icons
            timelineItems.forEach(item => {
                item.classList.remove('active');
                const img = item.querySelector('.timeline-icon');
                if (img) {
                    img.src = 'assets/images/courses/circle-empty.svg';
                }
            });

            // Set the default active item (07/05/1954)
            const defaultActiveItem = document.querySelector('.timeline-item[data-year="07/05/1954"]');
            if (defaultActiveItem) {
                defaultActiveItem.classList.add('active');
                const img = defaultActiveItem.querySelector('.timeline-icon');
                if (img) {
                    img.src = 'assets/images/courses/circle-empty_red.svg';
                }
            }
        }
    }

    // Initialize course card navigation
    initCourseCardNavigation();
});
