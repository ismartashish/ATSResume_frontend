export default function ModernTemplate({ resume }) {
  const { header, profile, experience, education, skills } = resume;

  return (
    <div className="resume modern">

      <header>
        <h1>{header.name}</h1>
        <p>{header.title}</p>
      </header>

      <section>
        <h2>Profile</h2>
        <p>{profile}</p>
      </section>

      <section>
        <h2>Work Experience</h2>
        {experience.map((job, i) => (
          <div key={i} className="job">
            <strong>{job.title}</strong> – {job.company}
            <span>{job.duration}</span>
            <ul>
              {job.bullets.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        {education.map((e, i) => (
          <p key={i}>
            <strong>{e.degree}</strong> – {e.institute} ({e.year})
          </p>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <p>{skills.join(", ")}</p>
      </section>

    </div>
  );
}
