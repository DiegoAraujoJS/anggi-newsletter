import Head from "next/head";
import styles from './carousel.module.css'

export default function Carousel() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"/>
      </Head>
      <div id="myCarousel" className={`carousel slide ${styles['carousel']}`}data-bs-ride="carousel">
        <ol className="carousel-indicators">
          <li data-bs-target="#myCarousel" data-bs-slide-to="0" className="active"></li>
          <li data-bs-target="#myCarousel" data-bs-slide-to="1"></li>
          <li data-bs-target="#myCarousel" data-bs-slide-to="2"></li>
        </ol>

        <div className={`carousel-inner ${styles['carousel-inner']}`}>
          <div className={`carousel-item active ${styles['carousel-item']} anggiglen`}>
            <img src="/images/anggi1.jpeg" alt="Image 1"/>
            <div className="carousel-caption">Caption 1</div>
          </div>
          <div className={`carousel-item ${styles['carousel-item']} active`}>
            <img src="/images/anggi2.jpeg" alt="Image 2"/>
            <div className="carousel-caption">Caption 2</div>
          </div>
          <div className={`carousel-item ${styles['carousel-item']} active`}>
            <img src="/images/anggi3.jpeg" alt="Image 3"/>
            <div className="carousel-caption">Caption 3</div>
          </div>
        </div>

        <a className="carousel-control-prev" href="#myCarousel" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a className="carousel-control-next" href="#myCarousel" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>
    </>
  )
}
