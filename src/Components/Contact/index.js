import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const refForm = useRef();

  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_phbyyuk",
        "template_qrvz1rc",
        refForm.current,
        "CWBuRASwCa6QJFzY1"
      )
      .then(() => {
        alert("Message Sent Successfully! ");
        window.location.reload(false);
      })
      .catch(() => {
        alert("Message Failed! ");
      });
  };

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={["C", "o", "n", "t", "a", "c", "t", " ", "M", "e"]}
              idx={15}
            />
          </h1>
          <p>
            Thank you for taking the time to visit my portfolio website! If you
            have any questions or would like to discuss a potential project,
            please don't hesitate to get in touch.
            <br />
            If you prefer to use a contact form, you can fill out the form below
            and I will get back to you as soon as possible.
            <br />
            My availability varies depending on my current workload, but I will
            do my best to respond to all inquiries as soon as possible. If you
            have a specific deadline or timeline in mind, please let me know and
            I will do my best to accommodate your needs.
            <br /> Thank you again for your interest in my work. I look forward
            to hearing from you soon!
            <br />
            Best regards,
            <br />
            <code>Ved Prakash</code>
          </p>
          <div className="contact-form">
            <form ref={refForm} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input type="text" name="name" placeholder="Name" required />
                </li>
                <li className="half">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </li>
                <li>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Message"
                    required
                  />
                </li>
                <li>
                  <input type="submit" className="flat-btn" value="Send" />
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
      <Loader type="ball-rotate" />
    </>
  );
};

export default Contact;
