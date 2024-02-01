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
    emailjs.init("ckb28Uf33mzPIbCmF"); // Nahraďte "user_your_user_id" skutečným uživatelským ID z vašeho EmailJS účtu
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
      <form className="flex flex-col gap-1">
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
        <input
          className="border border-gray-300 focus:border-blue-500 outline-none rounded w-full px-4 h-14 text-sm"
          type="tel"
          placeholder="Telefone cislo"
          value={phone}
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
            className="hover:bg-blue-500 text-black hover:text-white rounded p-4 text-sm w-full transition"
            type="button" // Přidán typ tlačítka
            onClick={() => {
              sendEmail();
            }}
          >
            Poslite spravu
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
