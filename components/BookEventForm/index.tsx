"use client";
import React from "react";

const BookEventForm = () => {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <div className="p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-semibold mb-4">Book Your Spot</h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="px-4.5 py-3 rounded border border-[#243B47] bg-[#182830] focus:outline-none "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!submitted && (
          <button
            type="submit"
            className="bg-primary text-[#030708] py-2 px-4 rounded mt-4 font-semibold cursor-pointer"
          >
            Submit
          </button>
        )}
      </form>
      {submitted && <p className="mt-2">Thank you for booking your spot!</p>}
    </div>
  );
};
export default BookEventForm;
