"use client";

import React, { useState } from "react";
import { Button } from "./button";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  return (
    <div id="subscribe" className="flex flex-col gap-10">
      <h2 className="text-2xl md:text-3xl text-center font-bold">
        Sign up for more like this.
      </h2>

      <div className="border mx-auto dark:border-[#353535] h-[56px] px-2 w-full md:max-w-[500px] flex items-center gap-3">
        <input
          type="text"
          className="outline-0 flex-1 h-[80%] ml-3"
          placeholder="ENTER YOUR EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button className="px-1.5 lg:px-2.5 hidden lg:flex text-xs cursor-pointer lg:text-base font-bold h-[40px] text-white border border-[#974BFA] bg-[#974BFA] hover:bg-[#974BFA]/80 hover:dark:bg-[#974BFA]/50">
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default Newsletter;
