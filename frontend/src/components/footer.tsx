import * as React from 'react';


const Footer = () => {
    return (
        <footer className=" bg-accent py-8">
  <div className="container mx-auto flex flex-wrap">
    <div className="w-full lg:w-1/4 px-4 mb-8">
      <h3 className="text-lg font-semibold text-background mb-4">Tentang Kami</h3>
      <p className="text-background">Kami adalah aplikasi booking film yang membantu Anda menemukan dan memesan tiket untuk film-film favorit Anda.</p>
    </div>
    <div className="w-full lg:w-1/4 px-4 mb-8">
      <h3 className="text-lg font-semibold text-background">Layanan</h3>
      <ul className="text-background">
        <li className="mb-2"><a href="#" className="hover:text-blue-500 transition-colors duration-300">Jadwal Film</a></li>
        <li className="mb-2"><a href="#" className="hover:text-blue-500 transition-colors duration-300">Pemesanan Tiket</a></li>
        <li className="mb-2"><a href="#" className="hover:text-blue-500 transition-colors duration-300">Pusat Bantuan</a></li>
      </ul>
    </div>
    <div className="w-full lg:w-1/4 px-4 mb-8">
      <h3 className="text-lg font-bold text-background mb-4">Kontak</h3>
      <p className="text-background">Jalan Raya No. 123, Kota Anda</p>
      <p className="text-background">Telp: 123-456-789</p>
      <p className="text-background">Email: info@bookingfilm.com</p>
    </div>
    <div className="w-full lg:w-1/4 px-4 mb-8">
      <h3 className="text-lg font-semibold text-background mb-4">Ikuti Kami</h3>
      <div className="flex items-center">
        <a href="#" className="text-background hover:text-blue-500 transition-colors duration-300 mr-4">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0a12 12 0 0 0-12 12 12 12 0 0 0 12 12 12 12 0 0 0 12-12 12 12 0 0 0-12-12zm4.59 10.49h-2.03a1.63 1.63 0 0 1-1.56-1.77V7.54h3.59v1.24h-2.3v1.01h2.23v1.22h-2.23v2.59a1.76 1.76 0 0 0 1.82 1.88h2.21z"/>
          </svg>
        </a>
        <a href="#" className="text-background hover:text-blue-500 transition-colors duration-300">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm4.2 8.34h-1.4V7.24c0-.76-.68-1.64-1.64-1.64h-2.56c-.96 0-1.64.8-1.64 1.64v1.1H7.8V8.34H6v6.6h1.8v-3.32h1.8l.3 3.32h1.5v-3.32h1.8l.3 3.32H16v-3.32h1.8z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
  <div className="text-center mt-8">
    <p className="text-background">&copy; 2023 BookingFilm. All rights reserved.</p>
  </div>
</footer>

    );

}

export default Footer;