import { Button } from "flowbite-react";
import React from "react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 mb-5 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to watch all anime?</h2>
        <p className="text-gray-400 my-2">
          Checkout these resources with hianime!
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a href="#" target="_blank" rel="noopener noreferrer">
            Watch Now
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/10/hianime-that-time-i-got-reincarnated-as-a-slime-and-one-piece.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default CallToAction;
