import React, { useState } from "react";
import Footer from "../components/Footer";

const PRODUCTS_LIST = [
  "3 Feet 16 Blade Single Speed Rotavator",
  "RD Exle 23 Weeder Rotavator",
  "RD Exle 21 Banana Rotavator",
  "3 Feet 22 Blade Reverse Forward Rotavator",
  "RD Exle 52 Multi Speed Rotavator",
  "36 Blade Multi Speed Rotavator",
  "Hydraulic Reversible M B Plough",
  "42H MS 2024 RD Agricultural Ridger",
  "250 RPM Gear Box",
  "Single Speed Rotary Tiller",
  "Rotavator Side Disk",
  "Rotavator PTO Shaft",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    product: "",
    loc: "",
    msg: "",
  });

  const [toast, setToast] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone) {
      alert("Please enter your name and mobile number");
      return;
    }

    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 3000);

    setForm({
      name: "",
      phone: "",
      product: "",
      loc: "",
      msg: "",
    });
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-700";

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Enquiry submitted successfully!
        </div>
      )}

      {/* HERO */}
      <section className="bg-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-5">

          <p className="text-yellow-400 font-semibold mb-3">
            CONTACT US
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get In Touch
          </h1>

          <p className="text-gray-200 max-w-2xl leading-7">
            We respond within 24 hours. Contact us for rotavators,
            ridgers, ploughs, and all agricultural equipment enquiries.
          </p>

        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="max-w-7xl mx-auto px-5 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {[
            {
              icon: "📍",
              title: "Address",
              text: "B S Agro Equipments\nSitheri, Attur\nSalem - 636101",
            },
            {
              icon: "👤",
              title: "CEO",
              text: "M. Sundaram\nMon - Sat : 9AM - 6PM",
            },
            {
              icon: "📞",
              title: "Call Us",
              text: "07942819807\nQuick Response Support",
            },
            {
              icon: "🏅",
              title: "GST",
              text: "33FJKPS8217P1ZC\nISO Certified",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-green-800 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 whitespace-pre-line leading-7">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* MAP */}
{/* MAP */}
<div className="mt-10 rounded-2xl overflow-hidden shadow-lg border">

  <iframe
    title="BS Agro Rotavators Location"
    src="https://www.google.com/maps?q=BS+AGRO+ROTAVATORS&output=embed"
    className="w-full h-[350px]"
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>

</div>

      </section>

      {/* FORM */}
      <section className="bg-white py-14">

        <div className="max-w-4xl mx-auto px-5">

          <div className="text-center mb-10">

            <h2 className="text-3xl font-bold text-green-900 mb-3">
              Send an Enquiry
            </h2>

            <p className="text-gray-600">
              Fill the form below and our team will contact you soon.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* NAME */}
            <div>
              <label className="block mb-2 font-medium">
                Full Name *
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter your name"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block mb-2 font-medium">
                Mobile Number *
              </label>

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            {/* PRODUCT */}
            <div>
              <label className="block mb-2 font-medium">
                Product
              </label>

              <select
                name="product"
                value={form.product}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Product</option>

                {PRODUCTS_LIST.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* LOCATION */}
            <div>
              <label className="block mb-2 font-medium">
                District / State
              </label>

              <input
                type="text"
                name="loc"
                value={form.loc}
                onChange={handleChange}
                className={inputClass}
                placeholder="Salem, Tamil Nadu"
              />
            </div>

            {/* MESSAGE */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Message
              </label>

              <textarea
                rows="5"
                name="msg"
                value={form.msg}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
                placeholder="Enter your enquiry..."
              ></textarea>
            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 rounded-xl transition"
          >
            Submit Enquiry
          </button>

        </div>

      </section>

      <Footer />

    </div>
  );
}