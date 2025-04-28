import { Carousel } from "antd";

const carouselSlide = {
  /* Đặt tỷ lệ khung hình mong muốn, ví dụ: 16/9, 21/9, hoặc tỷ lệ của ảnh gốc */
  aspectRatio: '3/1',
  overflow: 'hidden', /* Ẩn phần ảnh bị thừa nếu tỷ lệ không khớp hoàn toàn */
  backgroundColor: '#f0f0f0', /* Màu nền chờ ảnh load */
}

const carouselSlideImg = {
  display: 'block', /* Loại bỏ khoảng trắng thừa dưới ảnh */
  width: '100%',
  height: '100%', /* Cho ảnh lấp đầy container có aspect-ratio */
  objectFit: 'cover' /* Đảm bảo ảnh che phủ hết không gian mà không bị méo */
}

const Banner = () => (
  <Carousel style={carouselSlide} arrows infinite={false} effect="fade">
    <div>
      <img style={carouselSlideImg} src="/img/1.png" alt="slide1" />
    </div>
    <div>
      <img style={carouselSlideImg} src="/img/2.png" alt="slide2" />
    </div>
  </Carousel>
)

export default Banner