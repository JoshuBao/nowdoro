'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const handleClick = (e: React.MouseEvent, href: string) => {
  e.preventDefault();
  const section = document.querySelector(href);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const LandingPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="navbar bg-base-300 shadow-lg">
        <div className="navbar-start">
          <a href="./" className="ml-8 btn btn-ghost text-xl text-primary">Nowdoro</a>
        </div>
        <div className="navbar-center hidden lg:flex text-neutral">
          <ul className="menu menu-horizontal px-1 font-semibold">
            <li><button onClick={(e) => handleClick(e, '#why')}>Why</button></li>
            <li><button onClick={(e) => handleClick(e, '#solution')}>Solution</button></li>
            <li><button onClick={(e) => handleClick(e, '#pricing')}>Pricing</button></li>
            <li><button onClick={(e) => handleClick(e, '#faq')}>FAQ</button></li>
            <li><a href="mailto:mg@jazzbar.ai" className="">Support</a></li>
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn mr-8 rounded-xl" onClick={handleCheckout}>{loading ? 'Loading...' : 'Buy Now'}</button>
        </div>
      </div>

      <main>
        <section>
          <div className="hero min-h-screen bg-base-300">
            <div className="hero-overlay bg-opacity-40"></div>
            <div className="hero-content text-center text-neutral-content flex flex-col justify-center items-center w-full">
              <div className="max-w-md">
                <p className="py-6 text-sm font-semibold">A SIMPLE AND EFFECTIVE PRODUCTIVITY TOOL</p>
                <h1 className="text-8xl text-left font-bold">No More<br /> Messy <br /> Productivity Tables</h1>
                <p className="py-6 text-lg">Track your tasks and manage your time efficiently.</p>
                <Link href="/auth/signin" className="btn btn-primary">Sign In</Link>
              </div>
            </div>
          </div>
        </section>

        <section id="why">
          <div className="hero min-h-screen bg-base-100">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="mx-8">
                <h1 className="text-5xl font-bold text-error text-left">The Chaotic Clustermess: A Life in Disarray</h1>
                <p className="py-6 text-base-content text-left">
                  Juggling multiple interests without a clear plan is a recipe for overwhelming confusion, wasted time, and unfinished goals.
                </p>
                <button className="btn btn-primary" onClick={(e) => handleClick(e, '#solution')}>What's the solution?</button>
              </div>
              <img src="/avoid.png" className="max-w-4xl rounded-lg shadow-2xl" />
            </div>
          </div>
        </section>

        <section id="solution">
          <div className="hero min-h-screen bg-base-300">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <img src="/mockup.png" className="max-w-4xl rounded-lg shadow-2xl" />
              <div>
                <h1 className="text-5xl font-bold text-primary text-left">Streamlined Productivity: Unleash Your Potential</h1>
                <p className="py-6 text-left text-base-content">
                  Nowdoro's intuitive task management system effortlessly aligns your diverse passions, allowing you to thrive in a state of focused productivity.
                </p>
                <button className="btn btn-primary" onClick={(e) => handleClick(e, '#pricing')}>Get Started</button>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing">
          <div className="hero min-h-screen bg-base-100">
            <div className="hero-content text-center flex flex-col justify-center items-center w-full">
              <div className="max-w-md">
                <h2 className="text-4xl font-bold text-primary mb-4">Lifetime Access to Nowdoro for Only $10!</h2>
                <p className="text-lg text-secondary mb-4">Unlock the full potential of Nowdoro with a one-time payment of $10. Enjoy a lifetime of productivity enhancements and peace of mind.</p>
                <div className="card bg-base-100 shadow-xl max-w-lg mx-auto">
                  <div className="card-body rounded-lg bg-base-300 text-base-content">
                    <h3 className="text-2xl font-bold text-primary mb-4">Features:</h3>
                    <ul className="list-inside text-left text-base-content space-y-4">
                      <li className="flex items-center">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="green" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                        </svg>
                        Task tracking and management
                      </li>
                      <li className="flex items-center">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="green" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                        </svg>
                        Detailed time logging for each task
                      </li>
                      <li className="flex items-center">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="green" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                        </svg>
                        Weekly and monthly productivity reports
                      </li>
                      <li className="flex items-center">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="green" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                        </svg>
                        24/7 customer support
                      </li>
                    </ul>
                    <p className="text-base-content text-left text-lg mt-4">Don't miss out on this incredible offer. Improve your productivity and take control of your time today with Nowdoro!</p>
                    <button className="btn btn-primary mt-4" onClick={handleCheckout}>{loading ? 'Loading...' : 'Buy Now for $10'}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="faq">
          <div className="hero min-h-screen bg-base-200 py-4">
            <div className="hero-content flex flex-col lg:flex-row text-neutral ">
              <div className="w-full lg:w-1/2">
                <h3 className="text-left text-success font-bold">FAQ</h3>
                <h2 className="text-7xl font-bold text-primary text-center lg:text-left">Frequently Asked <br />Questions</h2>
              </div>
              <div className="w-full lg:w-1/2 text-left">
                <div className="collapse collapse-plus bg-base-200 w-full">
                  <input type="checkbox" name="my-accordion-3" />
                  <div className="collapse-title text-xl font-medium">
                    What is Nowdoro?
                  </div>
                  <div className="collapse-content">
                    <p>Nowdoro is a simple and effective productivity tool designed to help you track your tasks and manage your time efficiently.</p>
                  </div>
                </div>
                <div className="collapse collapse-plus bg-base-200 w-full">
                  <input type="checkbox" name="my-accordion-3" />
                  <div className="collapse-title text-xl font-medium">
                    How does Nowdoro help with anticipatory anxiety?
                  </div>
                  <div className="collapse-content">
                    <p>By providing a structured approach to task management, Nowdoro helps you organize your interests and goals, reducing the chaos and confusion that contribute to anticipatory anxiety.</p>
                  </div>
                </div>
                <div className="collapse collapse-plus bg-base-200 w-full">
                  <input type="checkbox" name="my-accordion-3" />
                  <div className="collapse-title text-xl font-medium">
                    What features does Nowdoro offer?
                  </div>
                  <div className="collapse-content">
                    <p>Nowdoro offers task tracking and management, detailed time logging for each task, weekly and monthly productivity reports, and 24/7 customer support.</p>
                  </div>
                </div>
                <div className="collapse collapse-plus bg-base-200 w-full">
                  <input type="checkbox" name="my-accordion-3" />
                  <div className="collapse-title text-xl font-medium">
                    How much does Nowdoro cost?
                  </div>
                  <div className="collapse-content">
                    <p>Nowdoro is available for a one-time payment of $10, providing lifetime access to all its features and updates.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer p-10 bg-base-300 text-base-content flex justify-between">
        <div className="">
        <p>Created by jazzbar.ai</p>
        </div>
        <nav className="flex">
          {/* <h6 className="footer-title">Links</h6> */}
          <a onClick={(e) => handleClick(e, '#why')} className="link link-hover">Why</a>
          <a onClick={(e) => handleClick(e, '#solution')} className="link link-hover">Solution</a>
          <a onClick={(e) => handleClick(e, '#pricing')} className="link link-hover">Pricing</a>
          <a onClick={(e) => handleClick(e, '#faq')} className="link link-hover">FAQ</a>
        </nav>
        {/* <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav> */}
        {/* <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav> */}
      </footer>
    </div>
  );
};

export default LandingPage;
