import "./templates.css";

export default function ClassicTemplate({ content, onChange }) {
  return (
    <div className="resume classic">

      <h1 contentEditable suppressContentEditableWarning>
        Your Name
      </h1>

      <p className="contact" contentEditable suppressContentEditableWarning>
        email | phone | linkedin | github
      </p>

      <hr />

      <h2>Professional Summary</h2>
      <p
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerText)}
      >
        {content}
      </p>

      <h2>Experience</h2>
      <ul contentEditable suppressContentEditableWarning>
        <li>Developed MERN stack applications</li>
        <li>Worked with REST APIs & MongoDB</li>
      </ul>

      <h2>Skills</h2>
      <p contentEditable suppressContentEditableWarning>
        JavaScript, React, Node.js, MongoDB
      </p>

      <h2>Education</h2>
      <p contentEditable suppressContentEditableWarning>
        B.Tech — Computer Science
      </p>

    </div>
  );
}
