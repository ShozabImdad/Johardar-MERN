import React from "react";
// import video from '../../assets/Home-main.mov'
import { Link } from "react-router-dom";

const Hero = ({ myVideo }) => {
  return (
    <section className="relative h-screen">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src= { myVideo } type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-start h-full bg-gradient-to-r from-black/40 to-transparent px-8 lg:px-24">
        <div className="text-white max-w-lg">
          <p className="uppercase text-sm mb-2 tracking-wider">New collection</p>
          <h1 className="text-5xl font-serif mb-4 leading-tight">
            The new ring <br /> sensation
          </h1>
          <p className="text-gray-200 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <Link to={"/all-products"} className="px-6 py-3 border border-white text-white uppercase hover:bg-white hover:text-black transition">
            Explore
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
