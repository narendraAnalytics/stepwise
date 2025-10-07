const carouselImages = [
    { src: "/images/BannerImage.png", alt: "SnapCook App Interface" },
    { src: "/images/BannerImage2.jpg", alt: "Woman using cooking app with vegetables" },
    { src: "/images/BannerImage3.jpg", alt: "Happy woman cooking with phone" },
    { src: "/images/BannerImage4.jpg", alt: "Family cooking together with phones" }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes chef-loading {
          0% {
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
          25% {
            transform: rotate(90deg) scale(1.1);
            opacity: 0.9;
          }
          50% {
            transform: rotate(180deg) scale(1.2);
            opacity: 0.8;
          }
          75% {
            transform: rotate(270deg) scale(1.1);
            opacity: 0.9;
          }
          100% {
            transform: rotate(360deg) scale(1);
            opacity: 1;
          }
        }
        
        .animate-chef-loading {
          animation: chef-loading 0.8s ease-in-out infinite;
        }
      `}</style>
      <section id="home" className="relative overflow-hidden min-h-[500px]">
      {/* Background Image Carousel */}
      <div className="absolute -top-20 left-0 right-0 z-0" style={{height: 'calc(100% + 80px)'}}>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full h-full"
        >
          <CarouselContent className="h-[720px] gap-0 -ml-0">
            {carouselImages.map((image, index) => (
              <CarouselItem key={index} className="h-[720px] basis-full pl-0 shrink-0">
                <div className="relative w-full h-full min-h-[720px] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    objectFit="cover"
                    objectPosition="center 15%"
                    priority={true}
                    quality={95}
                    sizes="100vw"
                  />
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/70 to-slate-800/80"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Background Elements - moved to overlay on carousel */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>