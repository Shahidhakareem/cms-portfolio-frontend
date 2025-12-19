import { useEffect, useState } from "react";
import api from "../api/axios";

export function Introduction() {
  const [intro, setIntro] = useState(null);

  useEffect(() => {
    api.get("/intro").then((res) => setIntro(res.data));
  }, []);

  return (
    <div className="flex items-center max-lg:flex-col-reverse sm:justify-between max-xl:gap-2 pt-10 max-xxl:px-4">
      <div className="w-full flex flex-col justify-between max-lg:text-center">
        <div className="max-w-2xl mx-auto text-center">
          {intro && (
            <>
              <p className="text-xl animate-fade-in-up  uppercase tracking-wide text-gray-700 mb-3 font-bold">
                {intro.welcomeText}
              </p>
              <h2 className="text-4xl md:text-5xl animate-fade-in-up font-bold mb-4">
                {intro.nameText}
              </h2>
              <p className="text-gray-600 animate-fade-in-up text-lg">{intro.description}</p>
            </>
          )}
        </div>
        <div className="max-w-3xl mt-20 animate-fade-in-up mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 font-serif italic">Get In Touch</h3>
          <p className="text-gray-900 mb-6 font-serif italic">
            Interested in working together or have a question?
          </p>
          <a
            href="mailto:shahidhakareem134@gmail.com"
            className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
          >
            Contact Me
          </a>
        </div>
      </div>

      <div
        className={`max-w-134 w-full animate-float h-full max-lg:mx-auto aspect-[536/636] relative`}
      >
        {intro && (
          <>
            <img
              className={`shadow-2xl shadow-gray-200 w-full h-full absolute bottom-0 object-cover bg-white rounded-3xl`}
              src={intro.image}
              alt="person"
            />
          </>
        )}
      </div>
    </div>
  );
}
