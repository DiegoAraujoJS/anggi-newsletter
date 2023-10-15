import Carousel from 'react-bootstrap/Carousel';
import styles from './carousel.module.css'

export default function Component() {
  return (
    <>
      <Carousel className={styles['carousel']} fade>
        <Carousel.Item className={styles['carousel-item']}>
          <img src="/images/anggi1.jpeg" alt="Image 1"/>
        </Carousel.Item>
        <Carousel.Item className={styles['carousel-item']}>
          <img src="/images/anggi2.jpeg" alt="Image 2"/>
        </Carousel.Item>
        <Carousel.Item className={styles['carousel-item']}>
          <img src="/images/anggi3.jpeg" alt="Image 3"/>
        </Carousel.Item>
        <Carousel.Item className={styles['carousel-item']}>
          <img src="/images/anggi4.jpeg" alt="Image 3"/>
        </Carousel.Item>
      </Carousel>
    </>
  )
}
