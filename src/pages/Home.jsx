import { FiDownload } from "react-icons/fi";
import { About } from "./About";
import { Contact } from "./Contact";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Introduction } from "./Introduction";
import { Projects } from "./Projects";
import { Skills } from "./Skills";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-gray-900 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">My Portfolio</h1>
          <nav className="space-x-6 text-md font-medium text-white">
            <a
              href="#home"
              className=" hover:underline hover:decoration-gray-500  "
            >
              Home
            </a>
            <a
              href="#about"
              className="hover:underline hover:decoration-gray-500  "
            >
              About
            </a>
            <a
              href="#skills"
              className="hover:underline hover:decoration-gray-500 "
            >
              Skills
            </a>
            <a
              href="#experiences"
              className="hover:underline hover:decoration-gray-500   "
            >
              Experiences
            </a>
            <a
              href="#education"
              className="hover:underline hover:decoration-gray-500  "
            >
              Education
            </a>
            <a
              href="#projects"
              className="hover:underline hover:decoration-gray-500   "
            >
              Projects
            </a>
            <a
              href="#contact"
              className="hover:underline hover:decoration-gray-500   "
            >
              Contact
            </a>
            <a
              href="/Shahidha_Abdul_Kareem_CV.pdf"
              download
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              <FiDownload />
              Download CV
            </a>
          </nav>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <main className="flex-grow">
        <section
          id="home"
          className="bg-radial-[at_25%_25%] from-white to-zinc-900 to-75% py-10 animate-fade-in-up px-6"
        >
          <Introduction />
        </section>
        <section
          id="about"
          className="bg-gray-900 py-30 px-6 animate-fade-in-up"
        >
          <About />
        </section>
        <section
          id="education"
          className="bg-radial-[at_25%_25%] from-white to-zinc-900 to-75% py-30 px-6 animate-fade-in-up"
        >
          <Education />
        </section>
        <section
          id="experiences"
          className="bg-gray-900 text-white py-30 px-6 animate-fade-in-up"
        >
          <Experience />
        </section>
        <section
          id="skills"
          className="bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%  py-30 px-6 animate-fade-in-up"
        >
          <Skills />
        </section>

        {/* ================= PROJECTS ================= */}
        <section
          id="projects"
          className="bg-gray-900  py-30 animate-fade-in-up"
        >
          <Projects />
        </section>

        {/* ================= CONTACT ================= */}
        <section
          id="contact"
          className="bg-gray-100 py-10 px-6 animate-fade-in-up"
        >
          <Contact />
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} My Portfolio</p>
          <div className="space-x-4 mt-3 md:mt-0">
            <a href="https://github.com/" className="hover:text-white">
              GitHub
            </a>
            <a href="https://www.linkedin.com/" className="hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
