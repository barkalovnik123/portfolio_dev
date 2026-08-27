const Hero = () => {
    return (
        <section 
            aria-label="Главный экран"
            className="snap-section relative h-screen bg-cover bg-bottom
            sm:flex flex-col-reverse 
            "
            style={{boxShadow: "black 0 0 120px",
                zIndex: "10"
            }}
        >
            <hgroup className="hero-intro text-gray-900 m-auto w-fit font-serif sm:text-gray-200 
            sm:m-0 sm:flex sm:flex-col-reverse">
                <h1 className="text-5xl pt-10 sm:p-3
                md:text-7xl lg:text-8xl">
                    Баркалов <br className="sm:hidden" /> Никита
                </h1>
                <p className="lg:text-4xl md:text-3xl sm:ps-3">
                    Преподаватель
                </p>
                <p className="lg:text-4xl md:text-3xl sm:ps-3">
                    Разработчик Full-stack
                </p>
            </hgroup>
            <div className="w-full h-full overflow-hidden">
                <video 
                    src="/hero-video.webm" 
                    className="absolute bottom-0 left-1/2 min-w-full min-h-full -translate-x-1/2 object-cover z-[-2]" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                ></video>
            </div>
        </section>
    )
}

export default Hero;