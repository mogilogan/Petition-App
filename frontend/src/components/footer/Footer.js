import React from "react";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="relative overflow-hidden bottom-0 w-[100%] ">
      <section class="bg-white">
        <div class="max-w-screen-xl px-4 py-4 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
          <nav class="flex flex-wrap justify-center -mx-5 -my-2">
            <div class="px-5 py-2">
              <Link
                to="/teams"
                class="text-base leading-6 text-gray-500 hover:text-gray-900"
              >
                Team
              </Link>
            </div>

            <div class="px-5 py-2">
              <Link
                to="/contact"
                class="text-base leading-6 text-gray-500 hover:text-gray-900"
              >
                Contact
              </Link>
            </div>
          </nav>

          <p class="mt-8 text-base leading-6 text-center text-gray-400">
            © 2023 Puducherry Police All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Footer;
