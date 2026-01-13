import "./templates.css";

export default function MinimalTemplate({ content, onChange }) {
  return (
    <div className="resume minimal">

      <h1 contentEditable suppressContentEditableWarning>
        Your Name
      </h1>

      <p contentEditable suppressContentEditableWarning>
        email | phone | linkedin
      </p>

      <h3>Summary</h3>
      <p
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerText)}
      >
        {content}
      </p>

      <h3>Experience</h3>
      <p contentEditable suppressContentEditableWarning>
        Software Developer — Company (2022–Present)
      </p>

      <h3>Skills</h3>
      <p contentEditable suppressContentEditableWarning>
        React, Node, MongoDB, SQL
      </p>

      <h3>Education</h3>
      <p contentEditable suppressContentEditableWarning>
        B.Tech CSE
      </p>

    </div>
  );
}
