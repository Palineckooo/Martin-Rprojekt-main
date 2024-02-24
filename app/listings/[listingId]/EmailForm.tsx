"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com"; // Přidána deklarace emailjs
import toast from "react-hot-toast";

const EmailForm = ({ currentUser, listing }) => {
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = () => {
    emailjs.init("ckb28Uf33mzPIbCmF");
    const senderN = name;
    const sendername = currentUser?.email;
    const to = listing.email;
    const subject = "Dotaz na nehnutelnost";
    const message = document.getElementById("message").value;
    const data = {
      senderN: senderN,
      sendername: sendername,
      to: to,
      subject: subject,
      message: message,
    };
    const serviceID = "service_othaa6c";
    const templateID = "template_fa4ch0u";
    emailjs
      .send(serviceID, templateID, data)
      .then((res) => {
        toast.success("Email bo odoslaný úspešne");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <form className="flex flex-col gap-1 ">
        <input
          className="border border-gray-300 focus:border-blue-500 outline-none rounded w-full px-4 h-14 text-sm"
          type="text"
          name="name"
          placeholder="Meno"
          value={name}
        />
        <input
          className="border border-gray-300 focus:border-blue-500 outline-none rounded w-full px-4 h-14 text-sm"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
        />

        <textarea
          className="border pl-3 pt-3 border-gray-300 h-52 focus:border-blue-500 outline-none resize-none rounded w-full p-4 text-sm text-gray-400"
          placeholder="Vasa sprava"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="message"
        ></textarea>
        <div className="flex items-center justify-center h-full">
          <button
            className="before:ease relative h-12  overflow-hidden border border-blue-500 text-blue-500 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 w-full hover:text-white hover:shadow-blue-500 hover:before:h-64 hover:before:-translate-y-32"
            type="button" // Přidán typ tlačítka
            onClick={() => {
              sendEmail();
            }}
          >
            <span className="relative z-10">Poslanie emailu</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailForm; // Přidána exportní deklarace pro komponentu

/**/

/*    emailjs.init("ckb28Uf33mzPIbCmF");
    const sendername = document.getElementById("sendername").value;
    const to = document.getElementById("to").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    const data = {
      sendername: sendername,
      to: to,
      subject: subject,
      message: message,
    };
    const serviceID = "service_dkkv0jd";
    const templateID = "template_fa4ch0u";
    emailjs
      .send(serviceID, templateID, data)
      .then((res) => {
        alert("Email bol odoslany");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <form>
        <h1>Send email</h1>
        <input type="text" id="sendername" placeholder="senername"></input>
        <input type="text" id="to" placeholder="to"></input>
        <input type="text" id="subject" placeholder="subject"></input>
        <textarea id="message">Message</textarea>
        <button
          onClick={() => {
            sendEmail();
          }}
        >
          Send
        </button>
      </form>
    </div>*/
